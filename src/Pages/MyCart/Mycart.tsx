import CartPageBanner from "@/components/CartPageBanner/CartPageBanner";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useDecreaseQuantityMutation,
  useGetAllCartByUserQuery,
  useIncreaseQuantityMutation,
  useRemoveProductFromCartMutation,
} from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MyCartTable from "./MyCartTable";
import { Link } from "react-router-dom";
import { TCartItem, TMyCartProduct, TQuantityItem } from "@/types";
import { Helmet } from "react-helmet-async";
import Spinner from "@/components/Spinner/Spinner";

const Mycart = () => {
  const [isInStock, setIsInStock] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingRates, setShippingRates] = useState("");
  const {
    data: cartData,
    refetch,
    isLoading,
  } = useGetAllCartByUserQuery(undefined);
  const token = useAppSelector(useCurrentToken); // Get current user's token

  // Ensure that cartData is valid and items is an array
  const cartItems = Array.isArray(cartData?.data?.items)
    ? cartData.data.items
    : [];

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Check if cart is not empty
      if (cartItems.length > 0) {
        event.preventDefault();
        event.returnValue = ""; // Modern browsers require this line
      }
    };

    // Attach event listener to the 'beforeunload' event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);

  // Calculate total quantity of all products in the cart
  // const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [quantities, setQuantities] = useState(
    cartItems?.map((item: TCartItem) => ({
      id: item.productId,
      quantity: item.quantity,
    })) || []
  );

  useEffect(() => {
    // Update quantities only if cartItems have changed
    const updatedQuantities = cartItems.map((item: TCartItem) => ({
      id: item.productId,
      quantity: item.quantity,
    }));

    if (JSON.stringify(updatedQuantities) !== JSON.stringify(quantities)) {
      setQuantities(updatedQuantities);
    }

    // Check if all products are in stock
    const allInStock = cartItems.every(
      (item: TCartItem) => item.productId.stockQuantity > 0
    );
    setIsInStock(allInStock);
  }, [cartItems]); // Only re-run this effect when cartItems changes

  const [increaseQuantity] = useIncreaseQuantityMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const [removeProductFromCart] = useRemoveProductFromCartMutation();

  // console.log(increaseQuantity);

  const increment = async (productId: TMyCartProduct) => {
    try {
      console.log("increment", productId._id);
      await increaseQuantity({
        token,
        productId: productId._id,
      }).unwrap();
      refetch();
      setQuantities((prevQuantities: TQuantityItem[]) =>
        prevQuantities.map((item: TQuantityItem) =>
          item.id === productId._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const decrement = async (productId: TMyCartProduct) => {
    try {
      console.log("increment", productId._id);
      await decreaseQuantity({
        token,
        productId: productId._id,
      }).unwrap();
      refetch();
      setQuantities((prevQuantities: TQuantityItem[]) =>
        prevQuantities.map((item: TQuantityItem) =>
          item.id === productId._id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const removeProduct = async (productId: TMyCartProduct) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeProductFromCart({
            token,
            productId: productId._id,
          }).unwrap();
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "The product has been removed from your cart.",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove product:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove product from the cart.",
            icon: "error",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        }
      }
    });
  };

  const setQuantity = (productId: string | number, newQuantity: number) => {
    setQuantities((prevQuantities: TQuantityItem[]) =>
      prevQuantities.map((item: TQuantityItem) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  // List of Bangladesh divisions
  const bangladeshDivisions = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Barishal",
    "Rajshahi",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ];

  // List of Indian states
  const indiaStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const bangladeshShippingRates = {
    dhaka: { standard: 100, express: 200 },
    other: { standard: 150, express: 300 },
  };

  const indiaShippingRates = { standard: 300, express: 450 };

  const handleCalculateShipping = () => {
    let rates = "";
    if (selectedCountry === "Bangladesh") {
      if (selectedDivision.toLowerCase() === "dhaka") {
        rates = `There are 2 shipping rates available for ${postalCode}, ${selectedDivision} ${selectedCountry}, starting at ${bangladeshShippingRates.dhaka.standard} Taka.
          Standard at ${bangladeshShippingRates.dhaka.standard} Taka,
          Express at ${bangladeshShippingRates.dhaka.express} Taka`;
      } else {
        rates = `There are 2 shipping rates available for ${postalCode}, ${selectedDivision} ${selectedCountry}, starting at ${bangladeshShippingRates.other.standard} Taka.
          Standard at ${bangladeshShippingRates.other.standard} Taka
          Express at ${bangladeshShippingRates.other.express} Taka`;
      }
    } else if (selectedCountry === "India") {
      rates = `There are 2 shipping rates available for ${postalCode}, ${selectedDivision} ${selectedCountry}, starting at ${indiaShippingRates.standard} INR.
        Standard at ${indiaShippingRates.standard} INR
        Express at ${indiaShippingRates.express} INR`;
    }
    setShippingRates(rates);
  };

  return (
    <div>
      <Helmet>
        <title>PowerPulse Fitness | My-Cart</title>
      </Helmet>
      <CartPageBanner />
      <div className="container mx-auto mb-20">
        {isLoading ? (
          <div className="text-lg flex items-center justify-center mt-4">
            <Spinner />
          </div>
        ) : cartItems.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
            <table className="w-full text-sm border border-gray-400 border-collapse  rtl:text-right text-blue-100 dark:text-blue-100">
              {/* Table Heading Start Here */}
              <thead className="text-xs text-white uppercase bg-[#F9F2F3] border-b border-[#E0D9DA] dark:text-white">
                <tr className="font-cinzel">
                  <th
                    scope="col"
                    className="px-2 py-3 border border-[#E0D9DA] border-collapse font-bold text-black  font-poppins text-sm"
                  >
                    #
                  </th>

                  <th
                    scope="col"
                    className="px-2 py-3 border border-[#E0D9DA] border-collapse text-black font-poppins text-sm"
                    colSpan={3}
                  >
                    Product item
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 border border-[#E0D9DA] border-collapse text-black font-poppins text-sm"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 border border-[#E0D9DA] border-collapse text-black font-poppins text-sm"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 border border-[#E0D9DA] border-collapse text-black font-poppins text-sm "
                  >
                    Total price
                  </th>
                </tr>
              </thead>
              {/* Table Heading End Here */}
              {/* Table Data Fetching */}
              <tbody className="font-poppins">
                {cartItems.length > 0 ? (
                  cartItems.map((item: TCartItem, index: number) => (
                    <MyCartTable
                      key={item._id}
                      item={item}
                      quantities={quantities}
                      index={index}
                      increment={increment}
                      decrement={decrement}
                      setQuantity={setQuantity}
                      removeProduct={removeProduct}
                    />
                  ))
                ) : (
                  <p className="text-center">No items in cart</p>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 font-poppins font-bold text-3xl">
            No items in cart
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="rounded-lg border border-[#E0D9DA] p-4 semi-sm:p-8 bg-[#F9F2F3]  w-full">
              <h3 className="text-base font-poppins font-medium text-[#333333] mb-7">
                Special instructions for seller
              </h3>
              <textarea
                id="message"
                rows={8}
                className="w-full lg:w-96 rounded-md px-3 py-3 font-oswald border-b-[#C6C6C6] bg-[#FFFFFF] outline-none"
              ></textarea>
            </div>
            <div className="rounded-lg border border-[#E0D9DA] p-4 semi-sm:p-8 bg-[#F9F2F3]  w-full">
              <h3 className="text-base font-poppins font-medium text-[#333333] mb-6">
                Shipping information
              </h3>
              <div className="mb-5">
                <h4 className="font-poppins font-normal text-base text-[#333333] mb-3">
                  Country
                </h4>
                <select
                  className="w-full lg:w-96 rounded-lg px-3 py-3 font-poppins border border-[#E0D9DA] bg-[#F9F2F3] outline-none"
                  value={selectedCountry}
                  id="country"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">---</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                </select>
              </div>
              {selectedCountry === "Bangladesh" && (
                <div className="mb-5">
                  <h4 className="font-poppins font-normal text-base text-[#333333] mb-3">
                    State/Territory
                  </h4>
                  <select
                    className="w-full lg:w-96 rounded-lg px-3 py-3 font-poppins border border-[#E0D9DA] bg-[#F9F2F3] outline-none"
                    value={selectedDivision}
                    onChange={(e) => setSelectedDivision(e.target.value)}
                  >
                    <option value="">---</option>
                    {bangladeshDivisions.map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedCountry === "India" && (
                <div className="mb-5">
                  <h4 className="font-poppins font-normal text-base text-[#333333] mb-3">
                    State/Territory
                  </h4>
                  <select
                    className="w-full lg:w-96 rounded-lg px-3 py-3 font-poppins border border-[#E0D9DA] bg-[#F9F2F3] outline-none"
                    value={selectedDivision}
                    onChange={(e) => setSelectedDivision(e.target.value)}
                  >
                    <option value="">---</option>
                    {indiaStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <h4 className="font-poppins font-normal text-base text-[#333333] mb-3">
                  Zip/Postal code
                </h4>
                <input
                  className="w-full lg:w-96 rounded-lg px-3 py-3 font-oswald border border-[#E0D9DA] bg-[#F9F2F3] outline-none"
                  type="text"
                  name=""
                  id=""
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              {/* Display shipping rates */}
              {shippingRates && (
                <div className="mt-4 text-[#198754] font-poppins font-medium">
                  {shippingRates}
                </div>
              )}
              <h4
                onClick={handleCalculateShipping}
                className="font-poppins font-normal text-base text-[#f87f96]  underline mt-3"
              >
                Calculate shipping
              </h4>
            </div>
            <div className="rounded-lg border border-[#E0D9DA] p-4 semi-sm:p-8 bg-[#F9F2F3] h-[340px] w-full">
              <h3 className="text-base font-poppins font-medium text-[#333333] mb-6 pb-8 border-b-[1px] border-[#E0D9DA] lg:w-[330px]">
                Total amount
              </h3>

              <div className="flex w-full items-center justify-between mt-8">
                <h4 className="font-poppins font-normal text-base text-[#333333]  ">
                  Total amount
                </h4>
                <h4 className="font-poppins font-bold text-base text-[#f87f96]  ">
                  $
                  {cartItems
                    .reduce(
                      (acc: number, item: TCartItem) =>
                        acc + item.quantity * item.productId.price,
                      0
                    )
                    .toFixed(2)}
                </h4>
              </div>
              <p className="text-[15px] font-poppins font-normal text-[#808080] mt-8">
                Taxes and shipping calculated at checkout.
              </p>
              <Link to="/checkout">
                <button
                  className={`w-full rounded-md text-white font-poppins font-medium text-base py-3 mt-9 uppercase ${
                    isInStock
                      ? "bg-[#FA7F96] hover:bg-black"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isInStock} // Disable the button if not all items are in stock
                >
                  {isInStock ? "Checkout" : "Out of stock"}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mycart;
