import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useAddAdvertiseDiscountProductMutation,
  useRemoveAdvertiseDiscountProductMutation,
  useRemoveDiscountMutation,
} from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "sonner";
import Swal from "sweetalert2";

type Product = {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  discountStartTime?: Date;
  discountEndTime?: Date;
  discountDuration?: number;
  discountDurationUnit?: string;
  advertise: boolean;
};

type DiscountDataTableProps = {
  product: Product;
  index: number;
  refetch: () => void;
  advertisedCount: number;
};

const DiscountDataTable: React.FC<DiscountDataTableProps> = ({
  product,
  index,
  refetch,
  advertisedCount,
}) => {
  const [addAdvertiseDiscountProduct] =
    useAddAdvertiseDiscountProductMutation();
  const [removeAdvertiseDiscountProduct] =
    useRemoveAdvertiseDiscountProductMutation();
  const [removeDiscount] = useRemoveDiscountMutation();
  const token = useAppSelector(useCurrentToken);
  const {
    _id,
    name,
    price,
    discountPrice,
    discountPercentage,
    discountStartTime,
    discountEndTime,
    discountDuration,
    discountDurationUnit,
    advertise,
  } = product;

  const handleAddAdvertiseDiscountProduct = async () => {
    if (advertisedCount >= 4) {
      toast.error("You cannot add more than 4 advertisements.");
      return;
    }

    const toastId = toast.loading("Adding...");
    try {
      const res = await addAdvertiseDiscountProduct({
        token,
        id: _id,
      }).unwrap();
      toast.success(res.message || "Advertise Added successfully!", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {}
  };

  const handleRemoveAdvertiseDiscountProduct = async () => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeAdvertiseDiscountProduct({
        token,
        id: _id,
      }).unwrap();
      toast.success(res.message || "Advertise Removed successfully!", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {}
  };

  const handleRemoveDiscount = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Discount!",
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeDiscount({
            token,
            id: _id,
          }).unwrap();
          refetch();
          Swal.fire({
            title: "Removed!",
            text: "The product discount has been removed .",
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
            text: "Failed to remove product discount.",
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
        {name}
      </th>

      <td className="px-6 py-4">${price}</td>
      <td className="px-6 py-4">{discountPrice}</td>
      <td className="px-6 py-4">{discountPercentage}</td>
      <td className="px-6 py-4">
        {discountDuration} {discountDurationUnit}
      </td>
      <td className="px-6 py-4">
        {discountStartTime
          ? new Date(discountStartTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : "N/A"}{" "}
        -{" "}
        {discountEndTime
          ? new Date(discountEndTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : "N/A"}
      </td>

      <td className="px-6 py-4 flex items-center gap-1">
        <div className="flex-1">
          <button
            onClick={handleAddAdvertiseDiscountProduct}
            disabled={advertise == true && true}
            className="btn btn-outline text-black"
          >
            Advertise
          </button>
        </div>
        <div className="flex-1">
          <button
            onClick={handleRemoveAdvertiseDiscountProduct}
            disabled={advertise == true ? false : true}
            className="btn btn-outline text-black"
          >
            Remove
          </button>
        </div>
      </td>
      <td className="px-6 py-4">
        <button onClick={handleRemoveDiscount}>
          <RiDeleteBinLine className="text-2xl text-black" />
        </button>
      </td>
    </tr>
  );
};

export default DiscountDataTable;
