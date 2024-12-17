import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import CheckoutNavbar from "@/Pages/Checkout/CheckoutNavbar/CheckoutNavbar";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(
  "pk_test_51OEBoSCj4lN4EMrEVhIRMQuU8XhFt6NHEwM44fNDVXhOIQoV1iE06Cty0HKLbfXam9j6DqHOIHQahz15bMMluCVm009U34dYUW"
);

const Payment = () => {
  const location = useLocation();
  const { checkoutData } = location.state || {};
  // console.log(checkoutData);

  if (!checkoutData) {
    // Handle missing data (e.g., redirect to checkout)
    return <div>No checkout data available!</div>;
  }

  return (
    <div>
      <Helmet>
        <title>PowerPulse Fitness | Payment</title>
      </Helmet>
      <div className="mx-4">
        <CheckoutNavbar />
      </div>
      <div className="max-w-7xl mx-auto mt-20 lg:pb-56">
        <div className="flex flex-col lg:flex-row items-center w-full">
          <div className="w-full lg:flex-1">
            <div className="mb-10">
              <h1 className="font-oswald text-3xl text-black font-medium mb-3 uppercase pb-5 pt-5 text-center">
                Your order
              </h1>
              <div className=" bg-[#FFFFFF] p-5 semi-sm:p-10 rounded-xl">
                <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    SubTotal
                  </h1>
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    ${(checkoutData?.subTotal ?? 0).toFixed(2)}
                  </h1>
                </div>
                <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    Tax
                  </h1>
                  <h1 className="font-poppins font-medium text-base">
                    ${(checkoutData?.tax ?? 0).toFixed(2)}
                  </h1>
                </div>
                <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    Shipping
                  </h1>
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    ${(checkoutData?.shipping ?? 0).toFixed(2)}
                  </h1>
                </div>
                <div className="flex items-center justify-between  pb-5 pt-5 ">
                  <h1 className="font-poppins font-semibold text-base text-[#EC3D08]">
                    Total
                  </h1>
                  <h1 className="font-poppins font-semibold text-base text-[#EC3D08]">
                    ${(checkoutData?.total ?? 0).toFixed(2)}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:flex-1 ">
            <h1 className="font-oswald text-3xl text-black font-medium mb-3 uppercase pb-5 pt-5 text-center">
              Payment
            </h1>
            <Elements stripe={stripePromise}>
              <CheckoutForm checkoutDataItem={checkoutData} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
