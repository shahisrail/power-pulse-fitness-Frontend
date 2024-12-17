import { FiShoppingBag } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

const CheckoutNavbar = () => {
  return (
    <div className="border-b-[1px] pt-5 pb-5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <NavLink to="/">
          <div className="flex items-center xs:gap-2 sm:gap-2 semi-sm:gap-3 ">
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
        <Link to="/cart">
          <FiShoppingBag className="text-3xl" />
        </Link>
      </div>
    </div>
  );
};

export default CheckoutNavbar;
