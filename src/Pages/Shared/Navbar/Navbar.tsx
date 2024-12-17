import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

import { FaCartPlus, FaRegHeart, FaRegUser } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import NavbarSidebar from "./NavbarSidebar";
import { TUserPayload } from "@/types";
import { useGetAllCartByUserQuery } from "@/redux/features/cart/cartApi";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlistApi";

const Navbar = () => {
  const [stickyClass, setStickyClass] = useState("");
  const [shop, setShop] = useState(false);
  const [prevCartItems, setPrevCartItems] = useState(0);
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const [showSidebar, setShowSidebar] = useState(false);
  // console.log(user);
  const token = useAppSelector(useCurrentToken); // Get current user's token

  const { data: cartData, refetch: refetchCartData } = useGetAllCartByUserQuery(
    token,
    {
      skip: !token, // Only run the query if the user is logged in and has a token
    }
  );

  const { data: wishlistData } = useGetWishlistQuery(token, {
    skip: !token, // Only run the query if the user is logged in and has a token
  });

  // console.log(wishlistData);

  const totalCartItems =
    cartData?.data?.items?.reduce(
      (total: number, item: { quantity: number }) => total + item.quantity,
      0
    ) || 0;
  // console.log(totalCartItems);

  const totalWishlistItems = wishlistData?.data?.length || 0;

  // Compare cart items and refetch if there's a mismatch
  useEffect(() => {
    if (totalCartItems !== prevCartItems) {
      refetchCartData(); // Refetch cart data when item count changes
      setPrevCartItems(totalCartItems); // Update previous cart count after refetch
    }
  }, [totalCartItems, prevCartItems, refetchCartData]);

  // Navbar Fixed When scroll all website
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 50
        ? setStickyClass(`fixed top-0 bg-[#F2F6F6] border-b z-30`)
        : setStickyClass("");
    }
  };

  // Disable scrolling when sidebar is open
  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Clean up by removing the class when the component unmounts or state changes
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showSidebar]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <div
        className={`navbar z-50 top-0 pt-3 pb-3 pr-3 mt-12 lg:px-56  ${stickyClass}`}
      >
        <div className="navbar-start sm:ml-2 md:ml-0">
          <div className="dropdown font-poppins top-0 z-50">
            <div className="drawer lg:hidden">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-2"
                  className="drawer-button lg:hidden"
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost lg:hidden"
                  >
                    <AiOutlineMenu className="text-2xl font-bold"></AiOutlineMenu>
                  </div>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="p-4 w-72 min-h-full bg-base-200 text-base-content">
                  {/* Sidebar content here */}

                  {/* Dropdown Nav */}
                  <li
                    onClick={() => {
                      setShop(!shop);
                    }}
                    className="hover:text-[#0E82FD] font-medium text-[#1F2937] border-b-2 pb-2 pt-2 relative "
                  >
                    <a>
                      {" "}
                      <span className="flex items-center justify-between">
                        <NavLink to="/products">
                          <span>Shop</span>{" "}
                        </NavLink>
                        <span>
                          <MdKeyboardArrowDown className="text-xl" />
                        </span>
                      </span>{" "}
                      <ul
                        className={`relative border-b-2 left-0 top-[100%] ${
                          !shop ? "hidden" : "block"
                        }`}
                      >
                        <NavLink to="/products/category/Cardio">
                          <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Cardio</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Weightlifting Bars & Weights">
                          <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Weightlifting Bars & Weights</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Strength Equipments">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Strength Equipments</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Conditioning">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Conditioning</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Body Weight & Gymnastics">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Body Weight & Gymnastics</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Straps, Wraps & Support">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Straps, Wraps & Support</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Fitness Accessories">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Fitness Accessories</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Yoga & Pilates">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Yoga & Pilates</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Mats & Flooring">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Mats & Flooring</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Cross Training">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Cross Training</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Equipment Packages">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Equipment Packages</a>
                          </li>
                        </NavLink>
                        <NavLink to="/products/category/Clearance">
                          <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                            <a>Clearance</a>
                          </li>
                        </NavLink>
                      </ul>
                    </a>
                  </li>
                  <NavLink to="/products/category/weights">
                    <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                      <a>WEIGHTS</a>
                    </li>
                  </NavLink>
                  <NavLink to="/products/category/Barbells">
                    <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                      <a>BARBELLS</a>
                    </li>
                  </NavLink>
                  <NavLink to="/products/category/Racks & Cages">
                    <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                      <a>RACKS & CAGES</a>
                    </li>
                  </NavLink>
                  <NavLink to="/products/category/Benches">
                    <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                      <a>BENCHES</a>
                    </li>
                  </NavLink>
                  <NavLink to="/products/category/Flooring">
                    <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                      <a>FLOORING</a>
                    </li>
                  </NavLink>
                  <NavLink to="/products/category/New Arrival">
                    <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                      <a>New Arrival</a>
                    </li>
                  </NavLink>

                  <NavLink to="/about-us">
                    <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                      <a>About</a>
                    </li>
                  </NavLink>
                  {user?.user?.role === "admin" && (
                    <NavLink to="/admin/dashboard">
                      <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                        <a>Dashboard</a>
                      </li>
                    </NavLink>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <NavLink to="/">
            <div className="flex items-center xs:gap-2 sm:gap-2 semi-sm:gap-3 xs:ml-2 sm:ml-4 semi-sm:ml-7 md:ml-10 lg:ml-0">
              <img
                className="xs:w-6 sm:w-7 md:w-10 lg:w-20"
                src="https://i.ibb.co/QpYwXM3/Black-and-White-Modern-Fitness-Logo-New.png"
                alt=""
              />
              <a
                className=" md:w-64 xs:text-sm sm:text-base semi-sm:text-lg md:text-xl lg:text-2xl font-garamond font-bold"
                style={{ lineHeight: "1.3", letterSpacing: "1px" }}
              >
                PowerPulse <br /> Fitness
              </a>
            </div>
          </NavLink>
        </div>
        <div className="navbar-center font-poppins hidden lg:flex">
          <ul className=" flex items-center gap-7">
            {/* <NavLink to="/">
              <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                <a>Home</a>
              </li>
            </NavLink> */}

            <div className="dropdown dropdown-hover">
              <NavLink to="/products">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 font-medium text-[#1F2937] hover:text-[#0E82FD]"
                >
                  <span>Shop</span>{" "}
                  <span>
                    <IoIosArrowDown className="text-lg" />
                  </span>
                </div>
              </NavLink>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] border mt-1  p-2 shadow bg-base-100 rounded-box w-72"
              >
                <NavLink to="/products/category/Cardio">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Cardio</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Weightlifting Bars & Weights">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Weightlifting Bars & Weights</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Strength Equipments">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Strength Equipments</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Conditioning">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Conditioning</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Body Weight & Gymnastics">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Body Weight & Gymnastics</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Straps, Wraps & Support">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Straps, Wraps & Support</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Fitness Accessories">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Fitness Accessories</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Yoga & Pilates">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Yoga & Pilates</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Mats & Flooring">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Mats & Flooring</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Cross Training">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Cross Training</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Equipment Packages">
                  <li className="hover:text-[#0E82FD] border-b font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Equipment Packages</a>
                  </li>
                </NavLink>
                <NavLink to="/products/category/Clearance">
                  <li className="hover:text-[#0E82FD] font-medium text-[#1F2937] pt-2 pb-2 pl-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                    <a>Clearance</a>
                  </li>
                </NavLink>
              </ul>
            </div>

            <NavLink to="/products/category/weights">
              <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                <a>WEIGHTS</a>
              </li>
            </NavLink>
            <NavLink to="/products/category/Barbells">
              <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                <a>BARBELLS</a>
              </li>
            </NavLink>
            <NavLink to="/products/category/Racks & Cages">
              <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                <a>RACKS & CAGES</a>
              </li>
            </NavLink>
            <NavLink to="/products/category/Benches">
              <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                <a>BENCHES</a>
              </li>
            </NavLink>
            <NavLink to="/products/category/Flooring">
              <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                <a>FLOORING</a>
              </li>
            </NavLink>
            <NavLink to="/products/category/New Arrival">
              <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                <a>New Arrival</a>
              </li>
            </NavLink>

            <NavLink to="/about-us">
              <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                <a>About</a>
              </li>
            </NavLink>
            {user?.user?.role === "admin" && (
              <NavLink to="/admin/dashboard">
                <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                  <a>Dashboard</a>
                </li>
              </NavLink>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-5 cursor-pointer">
            {user ? (
              <Link to="/account">
                <FaRegUser className="text-2xl " />
              </Link>
            ) : (
              <Link to="/login">
                <FaRegUser className="text-2xl " />
              </Link>
            )}
            <div className="relative">
              <Link to="/my-wishlist">
                <FaRegHeart className="text-2xl " />
              </Link>
              {totalWishlistItems > 0 && (
                <span className="absolute top-[-8px] right-[-10px] bg-[#f87f96] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </div>
            <div className="relative" onClick={toggleSidebar}>
              <FaCartPlus className="text-2xl " />
              {totalCartItems > 0 && (
                <span className="absolute top-[-8px] right-[-10px] bg-[#f87f96] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <NavbarSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
