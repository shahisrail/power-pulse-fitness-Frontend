import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useRemoveOrderMutation,
  useUpdateOrderStatusMutation,
} from "@/redux/features/checkout/checkoutApi";
import { useAppSelector } from "@/redux/hooks";
import { TDashboardOrderSummeryCardProps } from "@/types";
import React from "react";
import { IoMdEye } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";
import Swal from "sweetalert2";
const DashboardOrderSummeryCard: React.FC<TDashboardOrderSummeryCardProps> = ({
  product,
  index,
  refetch,
}) => {
  const [position, setPosition] = React.useState(product.status);
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const [removeOrder] = useRemoveOrderMutation();
  const token = useAppSelector(useCurrentToken);
  const {
    _id,
    addToCartProduct,
    firstName,
    lastName,
    email,
    phone,
    orderNumber,
    deliveryProcess,
    status,
    subTotal,
    tax,
    shipping,
    total,
  } = product;

  // Function to return the color for the status indicator
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

  const handleOrderStatusUpdate = async (newStatus: string) => {
    // Narrowing down to the valid union type
    if (
      newStatus === "Pending" ||
      newStatus === "Shipped" ||
      newStatus === "Delivered"
    ) {
      const toastId = toast.loading("Status Updating...");
      setPosition(newStatus);

      try {
        const res = await updateOrderStatus({ id: _id, status: newStatus });

        if (res.data?.success) {
          toast.success(res.data.message || "Status updated successfully!", {
            id: toastId,
            duration: 3000,
          });
          refetch();
        } else {
          throw res.error;
        }
      } catch (error: any) {
        const errorMessage =
          error?.data?.errorMessages?.[0]?.message ||
          error?.data?.message ||
          error?.message ||
          "Something went wrong!";
        toast.error(errorMessage, {
          id: toastId,
          duration: 3000,
        });
      }
    } else {
      console.error("Invalid order status:", newStatus);
    }
  };

  const handleRemoveOrder = async (_id: string) => {
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
          await removeOrder({
            token,
            id: _id,
          }).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The Order has been removed from your Table.",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
          refetch();
        } catch (error) {
          console.error("Failed to remove Order:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove Order from the Table.",
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

  return (
    <tr className="bg-white font-poppins border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {index + 1}
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {firstName} {lastName}
      </th>

      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{phone}</td>
      <td className="px-6 py-4">{orderNumber}</td>
      <td className="px-6 py-4">{deliveryProcess}</td>
      <td className="px-6 py-4 flex items-center gap-5 lg:gap-0 lg:justify-evenly">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${getStatusIndicatorColor(
              status
            )}`}
          ></div>
          <span>{status}</span>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={isLoading}>
                <MdOutlineKeyboardArrowDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Order Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={handleOrderStatusUpdate}
              >
                <DropdownMenuRadioItem
                  value="Pending"
                  disabled={position === "Shipped" || position === "Delivered"}
                >
                  Pending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="Shipped"
                  disabled={position === "Delivered"}
                >
                  Shipped
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Delivered">
                  Delivered
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-5 cursor-pointer">
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <IoMdEye className="text-2xl" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Order Summery Details</DialogTitle>
                  <div>
                    <div className=" bg-[#FFFFFF] rounded-xl">
                      <div>
                        {addToCartProduct?.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400"
                          >
                            <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                              {item?.productId?.name} × {item?.quantity}
                            </h1>
                            <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                              ${item?.productId?.price}
                            </h1>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                        <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                          SubTotal
                        </h1>
                        <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                          {subTotal}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                        <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                          Tax
                        </h1>
                        <h1 className="font-poppins font-medium text-base">
                          {tax}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between border-b-[1px] pb-5 pt-5 border-b-gray-400">
                        <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                          Shipping
                        </h1>
                        <h1 className="font-poppins font-semibold text-base text-[#2C2C2C]">
                          ${shipping}
                        </h1>
                      </div>

                      <div className="flex items-center justify-between  pb-5 pt-5 ">
                        <h1 className="font-poppins font-semibold text-base ">
                          Total
                        </h1>
                        <h1 className="font-poppins font-semibold text-base ">
                          {total.toFixed(2)}
                        </h1>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <div className="grid gap-4 py-4"></div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div onClick={() => handleRemoveOrder(_id)}>
            <RiDeleteBin5Line className="text-2xl" />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DashboardOrderSummeryCard;
