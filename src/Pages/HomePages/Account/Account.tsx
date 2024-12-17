import OrderTable from "@/components/OrderTable/OrderTable";
import { useGetUserAddressQuery } from "@/redux/features/address/addressApi";
import {
  logOut,
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useGetUserOrderItemsQuery } from "@/redux/features/checkout/checkoutApi";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TUserPayload } from "@/types";
import { TCheckoutData } from "@/types/checkoutData.types";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken);
  const userFullname = user?.user?.fullName;
  const userEmail = user?.user?.email;
  const { data: addressData } = useGetUserAddressQuery(userId);
  const { data: orderData } = useGetUserOrderItemsQuery(undefined);
  console.log(orderData);
  const { data: wishlistData } = useGetWishlistQuery(token, {
    skip: !token, // Only run the query if the user is logged in and has a token
  });

  const totalWishlistItems = wishlistData?.data?.length || 0;
  const totalAddress = addressData?.data?.length || 0;

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="container mx-auto pt-20 pb-20">
      <Helmet>
        <title>PowerPulse Fitness | Account</title>
      </Helmet>
      <h3 className="font-poppins text-lg font-medium text-[#f87f96] text-center mb-4">
        Welcome
      </h3>
      <h1
        className="text-4xl font-poppins font-medium mb-5 text-center"
        style={{ lineHeight: "1", letterSpacing: "0.025em" }}
      >
        {userFullname}
      </h1>
      <div className="flex items-center justify-center pb-12">
        <button
          onClick={handleLogout}
          className="text-[#1d1d1f] border border-[#e8e8e1] text-sm uppercase font-oswald py-3 px-4 bg-transparent hover:border-[#1d1d1f]"
          style={{ lineHeight: "1", letterSpacing: "0.3em" }}
        >
          Log out
        </button>
      </div>
      <div className="border-[1px] border-dashed border-[#C6C6C6] p-6">
        <div className="flex items-start flex-col lg:flex-row gap-10 lg:gap-[500px]">
          <div>
            <h3 className="font-poppins text-lg font-medium">My account</h3>
            <p className="font-poppins text-base mt-2 underline hover:text-[#f87f96] cursor-pointer ">
              Wishlist{" "}
              {totalWishlistItems > 0 && <span> ({totalWishlistItems})</span>}
            </p>
            <Link to="/account/addresses">
              <p className="font-poppins text-base mt-2 underline hover:text-[#f87f96] cursor-pointer">
                View addresses{" "}
                {totalAddress > 0 && <span> ({totalAddress})</span>}
              </p>
            </Link>
            <Link to="/account/change-password">
              <p className="font-poppins text-base mt-2 underline hover:text-[#f87f96] cursor-pointer">
                Change Password{" "}
              </p>
            </Link>
          </div>
          <div>
            <h3 className="font-poppins text-lg font-medium ">
              Account details
            </h3>
            <p className="font-poppins text-base mt-2">{userFullname}</p>
            <p className="font-poppins text-base mt-2">{userEmail}</p>
            {addressData?.data?.length > 0 && (
              <div className="mb-5 ">
                {addressData?.data?.map((address: any) => (
                  <div>
                    <p className="font-poppins text-base mt-2">
                      {address?.companyName}
                    </p>
                    <p className="font-poppins text-base mt-2">
                      {address?.countryName}
                    </p>
                    <p className="font-poppins text-base mt-2">
                      {address?.streetAddress}
                    </p>
                    <p className="font-poppins text-base mt-2">
                      {address?.apartment}
                    </p>
                    <p className="font-poppins text-base mt-2">
                      {address?.town}
                    </p>
                    <p className="font-poppins text-base mt-2">
                      {address?.postCode}
                    </p>
                    <p className="font-poppins text-base mt-2">
                      {address?.phone}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <h3 className="font-poppins text-lg font-semibold mt-5 mb-5">
        Order history
      </h3>
      <div className="border-[1px] border-dashed border-[#C6C6C6] p-6 w-full">
        {orderData?.data?.map((order: TCheckoutData) => (
          <OrderTable key={order?._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Account;
