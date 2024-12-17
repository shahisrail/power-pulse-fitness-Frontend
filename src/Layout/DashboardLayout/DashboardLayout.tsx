import { useState } from "react";
import { TbRosetteDiscount, TbRosetteDiscountCheck } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgShoppingBag } from "react-icons/cg";
import {
  MdOutlineDashboardCustomize,
  MdOutlineManageAccounts,
  MdOutlineReviews,
} from "react-icons/md";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      {/* Drawer */}
      <div className="flex">
        {/* Drawer toggle button */}
        <button
          onClick={handleToggle}
          className={`absolute top-0 left-0 inline-block p-4 transition-all duration-500  ${
            isOpen ? "rotate-180 left-60 sm:left-64 lg:left-80" : ""
          }`}
        >
          <RiMenuUnfold3Line className="text-2xl" />
        </button>

        {/* Sidebar Drawer */}
        <div
          className={`fixed top-0 left-0 z-20 w-60 sm:w-64 lg:w-80 h-full transition-transform duration-500 bg-white shadow-lg ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-6 py-4 border-b-[1px] mb-3">
            <NavLink to="/">
              <div className="flex items-center xs:gap-2 sm:gap-2 semi-sm:gap-3 xs:ml-2 sm:ml-4 semi-sm:ml-7 md:ml-10 lg:ml-0">
                <img
                  className="xs:w-6 sm:w-7 md:w-10 lg:w-16"
                  src="https://i.ibb.co/QpYwXM3/Black-and-White-Modern-Fitness-Logo-New.png"
                  alt="PowerPulse Logo"
                />
                <a
                  className=" md:w-48 xs:text-sm sm:text-base semi-sm:text-lg md:text-xl lg:text-2xl font-garamond font-bold"
                  style={{ lineHeight: "1.3", letterSpacing: "1px" }}
                >
                  PowerPulse <br /> Admin
                </a>
              </div>
            </NavLink>
          </div>
          <div>
            <h3 className="font-poppins text-base lg:text-lg font-medium text-slate-700 px-10">
              Menu
            </h3>
            <ul className="menu mb-8 text-sm">
              <li>
                <NavLink
                  to="/admin/dashboard/adminProfile"
                  className="flex items-center gap-[14px] px-8 py-4 group dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-100"
                >
                  <MdOutlineDashboardCustomize className="text-lg lg:text-xl" />
                  <span className="text-base lg:text-lg font-semibold">
                    {" "}
                    Dashboard{" "}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/addProduct"
                  className="flex items-center gap-[14px] px-8 py-4 group dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-100"
                >
                  <IoMdAddCircleOutline className="text-lg lg:text-xl" />
                  <span className="text-lg lg:text-xl font-semibold">
                    {" "}
                    Add Product{" "}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/manageProduct"
                  className="flex items-center gap-[14px] px-8 py-4 group dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-100"
                >
                  <MdOutlineManageAccounts className="text-lg lg:text-xl" />
                  <span className="text-base lg:text-lg font-semibold">
                    {" "}
                    Manage Product{" "}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/addDiscount"
                  className="flex items-center gap-[14px] px-8 py-4 group dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-100"
                >
                  <TbRosetteDiscountCheck className="text-lg lg:text-xl" />
                  <span className="text-base lg:text-lg font-semibold">
                    {" "}
                    Add Discount{" "}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/manageDiscount"
                  className="flex items-center gap-[14px] px-8 py-4 group dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-100"
                >
                  <TbRosetteDiscount className="text-lg lg:text-xl" />
                  <span className="text-base lg:text-lg font-semibold">
                    {" "}
                    Manage Discount{" "}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/manageReviews"
                  className="flex items-center gap-[14px] px-8 py-4 group dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-100"
                >
                  <MdOutlineReviews className="text-lg lg:text-xl" />
                  <span className="text-base lg:text-lg font-semibold">
                    {" "}
                    Manage Reviews{" "}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/orderSummery"
                  className="flex items-center gap-[14px] px-8 py-4 group dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-100"
                >
                  <CgShoppingBag className="text-lg lg:text-xl" />
                  <span className="text-base lg:text-lg font-semibold">
                    {" "}
                    Order-Summery{" "}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content: Outlet */}
      <div
        className={`flex-1 transition-all duration-500 p-8 bg-[#F3F4F6] ${
          isOpen ? "lg:ml-80" : "ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
