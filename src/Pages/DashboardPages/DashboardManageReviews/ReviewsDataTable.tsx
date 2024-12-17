import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useRemoveProductReviewMutation,
  useUpdateReviewStatusMutation,
} from "@/redux/features/productReview/productReviewApi";
import { useAppSelector } from "@/redux/hooks";
import { TReviewsDataTableProps } from "@/types";
import { MdOutlineCancel, MdVerified } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

const ReviewsDataTable: React.FC<TReviewsDataTableProps> = ({
  item,
  index,
  refetch,
}) => {
  const { _id, name, email, rating, review, productId, status } = item;
  const productName = productId.name;
  //   console.log(productName);
  const token = useAppSelector(useCurrentToken);

  const [updateReviewStatus] = useUpdateReviewStatusMutation();
  const [removeProductReview] = useRemoveProductReviewMutation();

  const handleUpdateReviewStatus = async (
    newStatus: "Accepted" | "Rejected"
  ) => {
    const actionMessage =
      newStatus === "Accepted" ? "accept this review" : "reject this review";

    const confirmButtonText =
      newStatus === "Accepted" ? "Yes, Accept it!" : "Yes, Reject it!";

    const successMessage =
      newStatus === "Accepted"
        ? "The review has been accepted."
        : "The review has been rejected.";

    const errorMessage =
      newStatus === "Accepted"
        ? "Failed to accept the review."
        : "Failed to reject the review.";

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${actionMessage}. You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateReviewStatus({
            reviewId: _id,
            status: newStatus,
            token,
          }).unwrap();
          refetch();
          Swal.fire({
            title: "Success!",
            text: successMessage,
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to update review:", error);
          Swal.fire({
            title: "Error!",
            text: errorMessage,
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

  const handleRemoveProductReview = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Review!",
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeProductReview({
            id: _id,
            token,
          }).unwrap();
          refetch();
          Swal.fire({
            title: "Removed!",
            text: "The product Review has been removed .",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove product review:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove product review.",
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

      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{productName}</td>
      <td className="px-6 py-4">{rating}</td>
      <td className="px-6 py-4">{review}</td>
      <td className="px-6 py-4 flex items-center justify-center">
        {status === "Accepted" || status === "Rejected" ? (
          <td className=" text-gray-900 font-poppins font-semibold">
            <div className="flex items-center gap-5">
              <span className=" text-gray-900 font-poppins font-semibold">
                {status}
              </span>
              <button onClick={handleRemoveProductReview}>
                <RiDeleteBinLine className="text-2xl text-black" />
              </button>
            </div>
          </td>
        ) : (
          <>
            <div className="flex items-center gap-5 cursor-pointer">
              <button onClick={() => handleUpdateReviewStatus("Accepted")}>
                <MdVerified className="text-2xl text-green-600"></MdVerified>
              </button>
              <button onClick={() => handleUpdateReviewStatus("Rejected")}>
                <MdOutlineCancel className="text-2xl text-red-600 font-bold "></MdOutlineCancel>
              </button>
            </div>
          </>
        )}
      </td>

      {/* <td className="px-6 py-4">
        <button onClick={handleRemoveDiscount}>
          <RiDeleteBinLine className="text-2xl text-black" />
        </button>
      </td> */}
    </tr>
  );
};

export default ReviewsDataTable;
