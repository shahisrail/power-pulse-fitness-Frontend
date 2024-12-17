import { useDispatch } from "react-redux";
import { AiFillHeart } from "react-icons/ai";

import { removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice"; // Single action to update the store
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import Spinner from "@/components/Spinner/Spinner";
import { useToggleWishlistMutation } from "@/redux/features/wishlist/wishlistApi";
import { toast } from "sonner";
import { TUserPayload, TWishlistCardProps } from "@/types";
import { useCreateCartMutation } from "@/redux/features/cart/cartApi";
import { useNavigate } from "react-router-dom";

const WishlistCard = ({ singleWishlist }: TWishlistCardProps) => {
  const dispatch = useDispatch();
  const [toggleWishlist, { isLoading }] = useToggleWishlistMutation(); // Single mutation for add/remove
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken); // Get current user's token
  const [createCart] = useCreateCartMutation();
  const navigate = useNavigate();

  const handleWishlistClick = async () => {
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
      // Toggle the wishlist (either add or remove)
      const response = await toggleWishlist({
        token,
        productId: singleWishlist.productId._id,
      }).unwrap(); // Handle both add and remove

      if (response) {
        // Update the store with the new wishlist state
        dispatch(
          removeFromWishlist({
            userId,
            productId: singleWishlist.productId._id,
          })
        );
        toast.success("Product removed from wishlist successfully!", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
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
        data: { userId, productId: singleWishlist.productId._id, quantity: 1 },
      }).unwrap(); // Pass product data to the cart mutation
      toast.success("Product added to cart successfully!", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleAddToCartByNow = async () => {
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
        data: { userId, productId: singleWishlist.productId._id, quantity: 1 },
      }).unwrap(); // Pass product data to the cart mutation
      toast.success("Product added to cart successfully!", {
        id: toastId,
        duration: 3000,
      });
      navigate("/checkout");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const isOutOfStock = singleWishlist.productId.stockQuantity === 0;

  return (
    <div>
      <div className="flex items-start md:items-center flex-col md:flex-row justify-between border-b-[1px] pb-4">
        <div className="flex items-center gap-4">
          <img
            className="w-36 h-40 rounded cursor-pointer"
            src={singleWishlist.productId.images[0]}
            alt={singleWishlist.productId.name}
          />
          <h1 className="font-poppins text-base font-medium text-[#333333] hover:text-[#f87f96] cursor-pointer">
            {singleWishlist?.productId?.name}
          </h1>
        </div>
        <div className="lg:flex flex-col gap-3 hidden">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`font-poppins font-medium text-base underline ${
              isOutOfStock
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#f87f96]"
            }`}
          >
            Add To Cart
          </button>
          <button
            onClick={handleAddToCartByNow}
            disabled={isOutOfStock}
            className={`font-poppins font-medium text-base underline ${
              isOutOfStock
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#f87f96]"
            }`}
          >
            Buy Now
          </button>
        </div>
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-start w-full md:w-auto">
          <p className="font-poppins font-medium text-base text-[#f87f96] underline">
            ${singleWishlist?.productId?.price}
          </p>
          {/* Wishlist Button with Spinner */}
          <button onClick={handleWishlistClick} className="text-2xl">
            {isLoading ? (
              <div className="text-lg">
                <Spinner />
              </div>
            ) : (
              <AiFillHeart className="text-lg" />
            )}
          </button>
        </div>
      </div>
      <div className="lg:hidden gap-3 flex justify-between mt-5 mb-3">
        <button className="font-poppins font-medium text-base text-[#f87f96] underline">
          Add To Cart
        </button>
        <button className="font-poppins font-medium text-base text-[#f87f96] underline">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
