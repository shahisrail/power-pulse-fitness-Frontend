import { useGetSingleOrderQuery } from "@/redux/features/checkout/checkoutApi";
import { useParams } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import AdsNavbar from "../Shared/AdsNavbar/AdsNavbar";
import Footer from "../Shared/FooterPage/Footer/Footer";
import OrderSummeryBanner from "@/components/OrderSummeryBanner/OrderSummeryBanner";
import { BsArrowRight } from "react-icons/bs";
import { TCartProduct } from "@/types";
import { Helmet } from "react-helmet-async";

const OrderSummery = () => {
  const { id } = useParams();

  const { data: singleOrder } = useGetSingleOrderQuery(id!);
  console.log(singleOrder);

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // This will give "Sep"
      day: "numeric",
    });
  };

  return (
    <div>
      <Helmet>
        <title>PowerPulse Fitness | Order-Summery</title>
      </Helmet>
      <AdsNavbar />
      <Navbar />
      <OrderSummeryBanner />
      <div className="mt-10 mb-10 lg:max-w-7xl mx-auto">
        <div className=" flex items-start md:items-center flex-col md:flex-row justify-center gap-5 lg:gap-20 mt-8 pb-24 mx-5 md:mx-0">
          <div className="flex items-center gap-5 lg:gap-14">
            <div className="flex items-center gap-2 lg:gap-5">
              <div className="text-xl font-poppins font-semibold border px-4 py-1 bg-[#EC3D08] text-white">
                <span>1</span>
              </div>
              <h1
                className="font-oswald uppercase text-base font-medium"
                style={{ lineHeight: "1", letterSpacing: "0.025em" }}
              >
                Shopping Cart
              </h1>
            </div>
            <span>
              <BsArrowRight className="text-2xl font-poppins font-semibold hidden md:block" />
            </span>
          </div>
          <div className="flex items-center gap-5 lg:gap-14">
            <div className="flex items-center gap-2 lg:gap-5">
              <div className="text-xl font-poppins font-semibold border px-4 py-1 bg-[#EC3D08] text-white">
                <span>2</span>
              </div>
              <h1
                className="font-oswald uppercase text-base font-medium"
                style={{ lineHeight: "1", letterSpacing: "0.025em" }}
              >
                Payment & Delivery Options
              </h1>
            </div>
            <span>
              <BsArrowRight className="text-2xl font-poppins font-semibold hidden md:block" />
            </span>
          </div>
          <div className="flex items-center gap-2 lg:gap-5">
            <div className="text-xl font-poppins font-semibold border px-4 py-1 bg-[#EC3D08] text-white">
              <span>3</span>
            </div>
            <h1
              className="font-oswald uppercase text-base font-medium"
              style={{ lineHeight: "1", letterSpacing: "0.025em" }}
            >
              Order Received
            </h1>
          </div>
        </div>
        <div className="mx-5 lg:mx-0">
          <h3 className="text-[#7C7C7C] font-poppins font-medium text-lg ">
            Thank you. Your order has been received.
          </h3>
          <div className="flex items-start md:items-center flex-col md:flex-row gap-5 rounded-xl p-5  mt-8 bg-[#FFFFFF]">
            <div className="md:border-r-[1px] md:border-dashed md:border-[#cfc8d8] md:pr-10 md:pl-5">
              <p
                className="text-[#7C7C7C] uppercase font-oswald text-base font-medium mb-2"
                style={{ lineHeight: "1", letterSpacing: "0.025em" }}
              >
                Order number :
              </p>
              <p
                className="text-[#2C2C2C] font-poppins text-sm font-normal"
                style={{ lineHeight: "1.5" }}
              >
                {singleOrder?.data.orderNumber}
              </p>
            </div>
            <div className="md:border-r-[1px] md:border-dashed md:border-[#cfc8d8] md:pr-10 md:pl-5">
              <p
                className="text-[#7C7C7C] uppercase font-oswald text-base font-medium mb-2"
                style={{ lineHeight: "1", letterSpacing: "0.025em" }}
              >
                Date:
              </p>
              <p
                className="text-[#2C2C2C] font-poppins text-sm font-normal"
                style={{ lineHeight: "1.5" }}
              >
                {singleOrder?.data.createdAt
                  ? formatDate(singleOrder.data.createdAt)
                  : "N/A"}
              </p>
            </div>
            <div className="md:border-r-[1px] md:border-dashed md:border-[#cfc8d8] md:pr-10 md:pl-5">
              <p
                className="text-[#7C7C7C] uppercase font-oswald text-base font-medium mb-2"
                style={{ lineHeight: "1", letterSpacing: "0.025em" }}
              >
                Total:
              </p>
              <p
                className="text-[#2C2C2C] font-poppins text-sm font-normal"
                style={{ lineHeight: "1.5" }}
              >
                {singleOrder?.data.total}
              </p>
            </div>
            <div className="md:pr-10 md:pl-5">
              <p
                className="text-[#7C7C7C] uppercase font-oswald text-base font-medium mb-2"
                style={{ lineHeight: "1", letterSpacing: "0.025em" }}
              >
                Payment Method:
              </p>
              <p
                className="text-[#2C2C2C] font-poppins text-sm font-normal"
                style={{ lineHeight: "1.5" }}
              >
                {singleOrder?.data?.deliveryProcess}
              </p>
            </div>
          </div>
          <h3 className="text-[#7C7C7C] font-poppins font-medium text-lg mt-14">
            {singleOrder?.data?.deliveryProcess === "Cash On Delivery" ? (
              `Pay with ${singleOrder?.data?.deliveryProcess}.`
            ) : singleOrder?.data?.deliveryProcess === "Stripe" ? (
              <>
                Pay with {singleOrder?.data?.deliveryProcess} with with
                transaction ID{" "}
                <span className="font-bold text-black">
                  {singleOrder?.data?.transactionId}
                </span>
                .
              </>
            ) : null}
          </h3>
          <div>
            <div className="mt-10 mb-10 ">
              <h1 className="font-oswald text-3xl text-black font-medium mb-3 uppercase pb-5 pt-5">
                Order details
              </h1>
              <div className=" bg-[#FFFFFF] p-5 semi-sm:p-10  rounded-xl">
                <div>
                  {singleOrder?.data?.addToCartProduct?.map(
                    (item: TCartProduct) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400"
                      >
                        <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                          {item?.productId.name} × {item?.quantity}
                        </h1>
                        <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                          ${item?.productId.price}
                        </h1>
                      </div>
                    )
                  )}
                </div>
                <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    SubTotal
                  </h1>
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    {singleOrder?.data?.subTotal}
                  </h1>
                </div>
                <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    Tax
                  </h1>
                  <h1 className="font-poppins font-medium text-base">
                    {singleOrder?.data?.tax}
                  </h1>
                </div>
                <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    Shipping
                  </h1>
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    ${singleOrder?.data?.shipping}
                  </h1>
                </div>
                <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    Payment method:
                  </h1>
                  <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                    {singleOrder?.data?.deliveryProcess}
                  </h1>
                </div>
                <div className="flex items-center justify-between  pb-5 pt-5 ">
                  <h1 className="font-poppins font-semibold text-base ">
                    Total
                  </h1>
                  <h1 className="font-poppins font-semibold text-base ">
                    {singleOrder?.data?.total}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSummery;
