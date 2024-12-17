import {
  useClearWishlistMutation,
  useGetWishlistQuery,
} from "@/redux/features/wishlist/wishlistApi";
import WishlistCard from "./WishlistCard";
import WishlistPageBanner from "@/components/WishlistPageBanner/WishlistPageBanner";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { clearAllWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { TUserPayload, TWishlistItem } from "@/types";
import { Helmet } from "react-helmet-async";
import Spinner from "@/components/Spinner/Spinner";

const MyWishlist = () => {
  const { data: wishlist, isLoading } = useGetWishlistQuery(undefined); // Added refetch function and error handling
  const [clearWishlist, { isLoading: isClearing }] = useClearWishlistMutation();
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userId = user?.id as string;
  const itemCount = wishlist?.data?.length || 0;

  const handleClearWishlist = async () => {
    try {
      // Call the API to clear the wishlist for the user
      await clearWishlist({ userId }).unwrap();
      // Clear wishlist in Redux for the current user
      dispatch(clearAllWishlist({ userId }));
    } catch (error) {
      console.error("Error clearing wishlist", error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>PowerPulse Fitness | My-Wishlist</title>
      </Helmet>
      <WishlistPageBanner />
      <div className="container mx-auto pt-7 pb-20">
        <div className="flex items-center justify-between border-t-[1px] border-b-[1px] pt-2 pb-2">
          <h1 className="text-[#333333] text-lg font-semibold font-poppins">
            My Wishlist
          </h1>
          <h1 className="text-[#f87f96] font-semibold text-lg font-poppins border-b border-[#f87f96]">
            {itemCount} Item{itemCount !== 1 && "s"}
          </h1>
        </div>

        {isLoading ? (
          <div className="text-lg flex items-center justify-center mt-4">
            <Spinner />
          </div>
        ) : itemCount === 0 ? (
          <div className="text-center mt-10 text-lg font-poppins">
            No product added to the wishlist
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 mt-5">
            {wishlist?.data?.map((singleWishlist: TWishlistItem) => (
              <WishlistCard
                key={singleWishlist?._id}
                singleWishlist={singleWishlist}
              />
            ))}
          </div>
        )}

        {/* Conditionally render buttons when itemCount is greater than 0 */}
        {itemCount > 0 && (
          <div className="flex flex-col semi-sm:flex-row items-center semi-sm:justify-between mt-4 border-b-[1px] pb-4 gap-3 semi-sm:gap-0">
            <NavLink to="/products">
              <button className="font-poppins font-semibold text-base text-[#fff] bg-[#f87f96] px-5 py-3 rounded-lg uppercase">
                Continue Shopping
              </button>
            </NavLink>
            <button
              className="font-poppins font-semibold text-base text-[#fff] bg-[#f87f96] px-5 py-3 rounded-lg uppercase"
              onClick={handleClearWishlist}
              disabled={isClearing}
            >
              {isClearing ? "Clearing..." : "Clear Wishlist"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
