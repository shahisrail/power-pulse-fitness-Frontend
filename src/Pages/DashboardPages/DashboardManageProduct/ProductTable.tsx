import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useRemoveProductMutation } from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Define the type for the product
type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
};

type ProductTableProps = {
  product: Product;
  index: number;
};

const ProductTable: React.FC<ProductTableProps> = ({ product, index }) => {
  const { _id, name, category, price } = product;

  const [removeProduct] = useRemoveProductMutation();
  const token = useAppSelector(useCurrentToken);

  const handleRemoveProduct = async (_id: string) => {
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
          await removeProduct({
            token,
            id: _id,
          }).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The product has been removed from your Table.",
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
            text: "Failed to remove product from the Table.",
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
      <td className="px-6 py-4">{category}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-5 cursor-pointer">
          <Link to={`/admin/dashboard/manageProduct/updateProduct/${_id}`}>
            <span>
              <FaRegEdit className="text-2xl text-black" />
            </span>
          </Link>
          <span onClick={() => handleRemoveProduct(_id)}>
            <RiDeleteBinLine className="text-2xl text-black" />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default ProductTable;
