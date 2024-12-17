import { NavLink } from "react-router-dom";

const WishlistPageBanner = () => {
  return (
    <div className="w-full pb-20">
      <div className="border relative">
        <img
          className="w-full h-[40vh] lg:h-[30vh]  object-cover"
          src="https://i.ibb.co.com/2Zn4Khw/Black-Minimalist-Motivation-Quote-Linked-In-Banner-1.png"
          alt=""
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="text-white absolute top-14 md:top-16 lg:top-28 lg:left-60 w-full max-w-[1440px] mx-auto ">
          <div className="flex flex-col lg:flex-row gap-1 lg:gap-0 lg:justify-between items-center container mx-auto">
            <h1 className="text-2xl lg:text-[34px] font-semibold font-lora">
              Wishlist
            </h1>
            <div
              className="flex items-center text-base lg:text-lg font-semibold font-lora text-[#ffffff]"
              style={{ lineHeight: "1.6", letterSpacing: "0.025em" }}
            >
              <NavLink to="/" className="navlink-hover-effect">
                <p className="border-r-4  border-[#ffffff] pr-2">Home</p>
              </NavLink>
              <p className="navlink-hover-effect pl-2">My Wishlist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPageBanner;
