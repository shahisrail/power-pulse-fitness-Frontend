import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import {
  useCreateCartMutation,
  useGetAllCartByUserQuery,
} from "@/redux/features/cart/cartApi";
import { useToggleWishlistMutation } from "@/redux/features/wishlist/wishlistApi";
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TEyeModalProps, TUserPayload } from "@/types";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const EyeModal: React.FC<TEyeModalProps> = ({
  images,
  name,
  price,
  sku,
  modalId,
  id,
  stockQuantity,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [createCart] = useCreateCartMutation();
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken); // Get current user's token
  const wishlist = useSelector((state: RootState) =>
    selectWishlist(state, userId)
  ); // Get user's specific wishlist
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [toggleWishlist] = useToggleWishlistMutation(); // Use only one mutation for add/toggle

  // Fetch user's cart to check existing quantity
  const { data: cartData } = useGetAllCartByUserQuery(userId); // Fetch based on userId, not productId
  // console.log("cartdata", cartData);
  const cartItems = cartData?.data?.items || [];
  const cartProduct = cartItems.find((item: any) => item.productId._id === id);
  const cartQuantity = cartProduct ? cartProduct.quantity : 0;

  // Increment quantity only if total cart + new quantity is within stock
  const increment = () => {
    if (quantity + cartQuantity < stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    // Check if the product is already in the user's wishlist
    setIsInWishlist(wishlist.includes(id));
  }, [wishlist, id]);

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
      await toggleWishlist({ token, productId: id }).unwrap(); // Use only one mutation for toggling
      if (isInWishlist) {
        // If already in wishlist, we remove it locally
        dispatch(removeFromWishlist({ userId, productId: id }));
        toast.success("Product removed from wishlist successfully!", {
          id: toastId,
          duration: 3000,
        });
      } else {
        // If not in wishlist, we add it locally
        dispatch(addToWishlist({ userId, productId: id }));
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

  // Add to Cart Handler
  const handleAddToCart = async () => {
    const toastId = toast.loading("Logging In...");
    if (!token) {
      toast.error("User must be logged in to add items to the cart", {
        id: toastId,
        duration: 3000,
      });
      return;
    }
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (!modal) {
      console.error(`Modal with id ${modalId} not found`);
      return;
    }
    try {
      const cartData = {
        productId: id,
        userId,
        quantity: quantity,
      };

      await createCart({ token, data: cartData });
      toast.success("Product added to cart successfully!", {
        id: toastId,
        duration: 3000,
      });
      modal.close();
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  useEffect(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;

    if (!modal) {
      console.error(`Modal with id ${modalId} not found`);
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      // If the click target is the modal itself (backdrop), close the modal
      if (event.target instanceof HTMLDialogElement) {
        modal.close();
      }
    };

    // Add the event listener
    modal.addEventListener("click", handleClickOutside);

    return () => {
      // Cleanup the event listener when the component unmounts
      modal.removeEventListener("click", handleClickOutside);
    };
  }, [modalId]);

  // Determine if the Add to Cart button should be disabled
  const isAddToCartDisabled = cartQuantity + quantity > stockQuantity;

  return (
    <div className="">
      <dialog id={modalId} className="modal">
        <div className="modal-box  max-w-[750px] ">
          <form
            className="flex items-center justify-between border-b-[1px] pb-1"
            method="dialog"
          >
            {/* if there is a button in form, it will close the modal */}
            <h1 className="text-[#808080] font-poppins font-medium text-[15px]">
              Quickview
            </h1>
            <button className="btn btn-sm btn-circle btn-ghost ">✕</button>
          </form>
          <div className="flex flex-col md:flex-row md:gap-8 mt-5">
            <div>
              <img className="w-96 border" src={images[0]} alt="" />
            </div>
            <div className="pt-7 text-center md:text-start">
              <h1 className="font-poppins text-[15px] font-medium text-[#333333]  hover:text-[#F991A5] cursor-pointer">
                {name}
              </h1>

              <p className=" font-poppins text-[15px] font-medium text-[#333333] cursor-pointer pt-5">
                <span className="font-poppins font-semibold">Sku :</span> {sku}
              </p>
              <p className=" text-[15px] font-poppins font-semibold text-[#f87f96] pt-5 border-b-[1px] pb-5">
                ${price}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 pt-7">
                <span className="font-poppins font-semibold text-[17px] text-[#333333] ">
                  Quantity :{" "}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    className="border px-3 py-[2px] text-xl font-poppins font-medium rounded-md"
                    onClick={decrement}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value)))
                    }
                    className="text-center w-12 border border-gray-300 rounded-md p-1 text-[#808080]"
                    min="1"
                  />
                  <button
                    className="border px-3 py-[2px] text-xl font-poppins font-medium rounded-md"
                    onClick={increment}
                    disabled={quantity + cartQuantity >= stockQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="pt-7 flex items-center justify-center md:justify-start gap-5">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddToCartDisabled}
                  className={`bg-[#f87f96] px-5 py-3 font-poppins font-semibold text-white rounded-md ${
                    isAddToCartDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isAddToCartDisabled ? "Out of Stock" : "Buy Now"}
                </button>
                <div onClick={toggleWishlistByUserIdAndToken}>
                  {isInWishlist ? (
                    <AiFillHeart className="text-2xl text-[#f87f96] font-bold" /> // Filled heart icon
                  ) : (
                    <CiHeart className="text-2xl text-[#f87f96] font-bold" /> // Empty heart icon
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EyeModal;
