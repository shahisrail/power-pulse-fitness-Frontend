import { useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import {
  useCreateCheckoutMutation,
  useCreatePaymentIntentMutation,
} from "@/redux/features/checkout/checkoutApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CheckoutFormProps } from "@/types/checkoutData.types";
import { useGetAllCartByUserQuery } from "@/redux/features/cart/cartApi";

const CheckoutForm: React.FC<CheckoutFormProps> = ({ checkoutDataItem }) => {
  // console.log(checkoutDataItem);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const { refetch } = useGetAllCartByUserQuery(undefined);
  const [createCheckout] = useCreateCheckoutMutation();
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setIsProcessing(true);
    if (!stripe || !elements) {
      setError("Stripe has not loaded.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      setError("Card element is not loaded or is null.");
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create a Payment Method using Stripe Elements
      const { error: methodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: {
            name: data.cardName,
          },
        });

      if (methodError) {
        setError(methodError.message ?? "An unexpected error occurred.");
        setIsProcessing(false);
        return;
      }

      console.log("[PaymentMethod]", paymentMethod);

      const amountInCents = Math.round(checkoutDataItem.total * 100);

      // 2. Call your backend to create a Payment Intent with checkoutData.total
      const { data: paymentIntentData } = await createPaymentIntent({
        total: amountInCents,
      }).unwrap();

      const clientSecret = paymentIntentData; // Received client_secret from the backend

      // 3. Confirm the Payment Intent using the client secret
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        setError(confirmError.message ?? "Payment failed.");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        setError(null);
        console.log("Payment successful!");
        const toastId = toast.loading("Processing your order...");
        const checkoutData = {
          addToCartProduct: checkoutDataItem?.addToCartProduct,
          userId: checkoutDataItem.userId,
          firstName: checkoutDataItem.firstName,
          lastName: checkoutDataItem.lastName,
          companyName: checkoutDataItem.companyName,
          countryName: checkoutDataItem?.countryName,
          streetAddress: checkoutDataItem.streetAddress,
          apartment: checkoutDataItem.apartment || "",
          town: checkoutDataItem?.town,
          postCode: checkoutDataItem?.postCode,
          phone: checkoutDataItem?.phone,
          email: checkoutDataItem.email,
          orderNote: checkoutDataItem.orderNote || "",
          subTotal: checkoutDataItem?.subTotal,
          tax: checkoutDataItem?.tax,
          shipping: checkoutDataItem?.shipping,
          total: checkoutDataItem?.total,
          cardName: data.cardName,
          transactionId: paymentIntent.id,
          deliveryProcess: checkoutDataItem?.deliveryProcess,
        };
        // console.log("CheckoutData is", checkoutData);

        const res = await createCheckout(checkoutData).unwrap();
        // console.log(res);
        refetch();
        toast.success(res.message || "Order created successfully!", {
          id: toastId,
          duration: 3000,
        });
        reset();
        navigate(`/checkout/order-received/${res?.data?._id}`);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error("Error during payment process:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
      <div className="input-wrapper">
        <label>Card Name</label>
        <Controller
          name="cardName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              className="p-[10px] text-[16px] text-[#333] placeholder:text-[#aab7c4] bg-[#f5f5f5] w-full rounded border border-gray-300 outline-none font-poppins"
              placeholder="Card Holder Name"
              required
            />
          )}
        />
      </div>

      <div className="input-wrapper">
        <label>Card Number</label>
        <Controller
          name="cardNumber"
          control={control}
          render={() => (
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#333",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                  },
                  invalid: {
                    color: "#e5424d",
                  },
                },
              }}
            />
          )}
        />
      </div>

      <div className="input-wrapper flex-container">
        <div className="flex-item">
          <label>MM/YY</label>
          <Controller
            name="cardExpiry"
            control={control}
            render={() => (
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#333",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                      padding: "10px",
                      backgroundColor: "#f5f5f5",
                    },
                    invalid: {
                      color: "#e5424d",
                    },
                  },
                }}
              />
            )}
          />
        </div>

        <div className="flex-item">
          <label>CVC</label>
          <Controller
            name="cardCvc"
            control={control}
            render={() => (
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#333",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                      padding: "10px",
                      backgroundColor: "#f5f5f5",
                    },
                    invalid: {
                      color: "#e5424d",
                    },
                  },
                }}
              />
            )}
          />
        </div>
      </div>

      {error && <div className="error-message font-poppins mb-1">{error}</div>}

      <button
        type="submit"
        className="submit-button"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? "Processing..." : `Pay $${checkoutDataItem.total}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
