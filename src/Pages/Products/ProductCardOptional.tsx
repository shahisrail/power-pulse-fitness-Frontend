import EyeModal from "@/components/Modal/EyeModal";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useCreateCartMutation } from "@/redux/features/cart/cartApi";
import { useToggleWishlistMutation } from "@/redux/features/wishlist/wishlistApi";
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TProductCardProps, TUserPayload } from "@/types";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProductCardOptional: React.FC<TProductCardProps> = ({ product }) => {
  const {
    _id,
    name,
    price,
    sku,
    images,
    shortDescription,
    stockQuantity,
    discountPrice,
    discountPercentage,
  } = product;
  const discountPercentageTotal = product.discountPercentage ?? 0;
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken); // Get current user's token
  const wishlist = useSelector((state: RootState) =>
    selectWishlist(state, userId)
  ); // Get user's specific wishlist
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [toggleWishlist] = useToggleWishlistMutation(); // Use only one mutation for add/toggle
  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    // Check if the product is already in the user's wishlist
    setIsInWishlist(wishlist.includes(_id));
  }, [wishlist, _id]);

  const toggleWishlistByUserIdAndToken = async () => {
    const toastId = toast.loading("Loading...");
    if (!userId || !token) {
      toast.error(
        "User must be logged in and have a token to manage wishlist",
        {
          id: toastId,
          duration: 3000,
        }
      );
      return;
    }

    try {
      await toggleWishlist({ token, productId: _id }).unwrap(); // Use only one mutation for toggling
      if (isInWishlist) {
        // If already in wishlist, we remove it locally
        dispatch(removeFromWishlist({ userId, productId: _id }));
        toast.success("Product removed from wishlist successfully!", {
          id: toastId,
          duration: 3000,
        });
      } else {
        // If not in wishlist, we add it locally
        dispatch(addToWishlist({ userId, productId: _id }));
        toast.success("Product added to wishlist successfully!", {
          id: toastId,
          duration: 3000,
        });
      }
      setIsInWishlist(!isInWishlist); // Toggle the state
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const handleAddToCart = async () => {
    const toastId = toast.loading("Loading...");
    if (!token) {
      toast.error("User must be logged in to add items to the cart", {
        id: toastId,
        duration: 3000,
      });
      return;
    }

    try {
      await createCart({
        userId,
        data: { userId, productId: _id, quantity: 1 },
      }).unwrap(); // Pass product data to the cart mutation
      toast.success("Product added to cart successfully!", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const modalId = `modal_${sku}`;

  const openModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal(); // Use showModal() to open the modal
    }
  };

  const soldOutImage =
    "https://i.postimg.cc/LXPztZ37/Red-Simple-Sold-Out-Circle-Sticker.png";

  return (
    <div className="w-full cursor-pointer">
      <div className="flex flex-col gap-8 items-center bg-white hover:border hover:shadow-xl hover:border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full p-3">
        <div className="relative">
          <img
            className=" object-cover w-full rounded-lg h-80  md:w-80  md:rounded-lg border"
            src={images[0]}
            alt={name}
          />
          {stockQuantity === 0 && (
            <div className="absolute inset-0   flex justify-center items-center flicker bg-opacity-70">
              <img
                className="w-20 h-20" // Adjust size of sold out image
                src={soldOutImage}
                alt="Sold Out"
              />
            </div>
          )}
          {discountPercentageTotal > 0 && (
            <div className="absolute top-5 right-5">
              <div className="border border-[#e8e8e1] px-3 py-1 font-poppins bg-black rounded">
                <h4 className="text-white">Save {discountPercentage}%</h4>
              </div>
            </div>
          )}
        </div>
        <div className="pt-6 pb-5">
          <h1 className="font-poppins text-[15px] font-medium text-[#333333] text-center md:text-start hover:text-[#F991A5] cursor-pointer">
            {name}
          </h1>
          <p className="text-center md:text-start text-[15px] font-poppins font-semibold text-[#f87f96] pt-2">
            {discountPrice ? (
              <>
                <span className="line-through text-gray-500 mr-2">
                  ${price}
                </span>{" "}
                <span className="text-[#f87f96]">${discountPrice}</span>
              </>
            ) : (
              <span>${price}</span>
            )}
          </p>
          <div className="flex justify-center md:justify-start mt-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#EFA505" // Static color for all stars
                className="w-5 h-5"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ))}
          </div>
          <p className="font-poppins text-[15px] font-medium text-[#6F6F6F] text-center md:text-start  cursor-pointer pt-3">
            {shortDescription}
          </p>
          <div className="flex items-center gap-1 justify-center md:justify-start mt-6">
            <div>
              <button
                onClick={openModal}
                className="max-w-20 max-h-20 px-4 py-4 bg-[#fff] text-[#808080] border border-[#808080] hover:border-[#F87F96] hover:bg-[#F87F96] hover:text-white rounded-full cursor-pointer"
              >
                <IoEyeOutline className="text-lg" />
              </button>
              <EyeModal
                images={images}
                name={name}
                price={price}
                sku={sku}
                modalId={modalId}
                id={_id}
                stockQuantity={stockQuantity}
              />
            </div>
            <button
              onClick={handleAddToCart}
              disabled={stockQuantity === 0} // Disable the button when out of stock
              className={`px-4 py-4 max-w-20 max-h-20 semi-sm:max-w-12 semi-sm:max-h-12 md:max-w-20 md:max-h-20 semi-sm:px-3 semi-sm:py-3 md:px-4 md:py-4 border text-[#808080] rounded-full cursor-pointer ${
                stockQuantity > 0
                  ? "bg-[#fff] border-[#808080] hover:border-[#F87F96] hover:bg-[#F87F96] hover:text-white"
                  : "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
              aria-disabled={stockQuantity === 0} // ARIA attribute for accessibility
            >
              <FiShoppingBag className="text-lg" />
            </button>
            <div
              onClick={toggleWishlistByUserIdAndToken}
              className="max-w-20 max-h-20 px-4 py-4 border bg-[#fff] text-[#808080] border-[#808080] hover:border-[#F87F96] hover:bg-[#F87F96] hover:text-white rounded-full cursor-pointer"
            >
              {isInWishlist ? (
                <AiFillHeart className="text-lg" /> // Filled heart icon
              ) : (
                <CiHeart className="text-lg" /> // Empty heart icon
              )}
            </div>
          </div>
          <Link to={`/products/${_id}`}>
            <div className="flex items-center justify-start mt-5 font-poppins font-medium">
              <button className="border px-3 py-2 rounded-md">
                View Details
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOptional;
