import { TCartItem } from "@/types";

const OrderTable = ({ order }: any) => {
  //   console.log(order);

  const calculateTotalQuantity = () => {
    return order?.addToCartProduct?.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    );
  };

  const getStatusIndicatorColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500"; // yellow for pending
      case "Shipped":
        return "bg-blue-500"; // blue for shipped
      case "Delivered":
        return "bg-green-500"; // green for delivered
      default:
        return "bg-gray-500"; // default gray
    }
  };

  return (
    <div className="border-b-[1px] border-b-indigo-700 flex items-center flex-col lg:flex-row gap-10 pt-5 pb-5">
      <div className="lg:w-[50%]">
        {order?.addToCartProduct?.map((item: TCartItem) => (
          <div
            key={item._id}
            className="flex items-center flex-col lg:flex-row gap-5 lg:gap-20 mb-2 mt-2 w-full border-b-[1px] lg:border-none border-b-black pt-3 pb-5 lg:pt-0 lg:pb-0"
          >
            <div className="lg:w-[30%]">
              <img
                className="w-32 h-32 rounded-md"
                src={item?.productId?.images[0]}
                alt=""
              />
            </div>
            <div className="space-y-2 lg:w-[50%] text-center lg:text-start">
              <h1 className="font-poppins text-xl font-medium">
                {item?.productId?.name}
              </h1>
              <h3 className="font-poppins font-medium text-base ">
                Sku : {item?.productId?.sku}
              </h3>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${getStatusIndicatorColor(
                    order?.status
                  )}`}
                ></div>
                <h3 className="font-poppins font-medium text-base">
                  {order?.status}
                </h3>
              </div>
              <h3 className="font-poppins font-medium text-base">
                $ {item?.productId?.price}
              </h3>
            </div>
            <div className="lg:w-[20%]">
              <h1 className="font-poppins text-base font-medium">
                Qty: {item?.quantity}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:w-[10%]">
        <h3 className="font-poppins font-medium text-base bg-gray-200 rounded-md px-2 py-1">
          {order?.orderNumber}
        </h3>
      </div>
      <div className="w-full lg:w-[30%]">
        <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
          <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
            SubTotal
          </h1>
          <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
            {order?.subTotal}
          </h1>
        </div>
        <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
          <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
            Tax
          </h1>
          <h1 className="font-poppins font-medium text-base">{order?.tax}</h1>
        </div>
        <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
          <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
            Shipping
          </h1>
          <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
            ${order?.shipping}
          </h1>
        </div>
        <div className="flex items-center justify-between  pb-5 pt-5 ">
          <h1 className="font-poppins font-semibold text-base text-[#EC3D08]">
            {/* Total Quantity */}
            Total ({calculateTotalQuantity()} items)
          </h1>
          <h1 className="font-poppins font-semibold text-base text-[#EC3D08]">
            {order?.total}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
