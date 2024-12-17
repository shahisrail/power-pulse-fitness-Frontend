import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="min-h-screen relative">
      {/* Image Container with Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/MfgpwL3/young-fitness-man-studio.jpg)",
          backgroundSize: "cover", // Ensures the background image covers the entire area
          backgroundPosition: "center", // Centers the image within the container
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto">
        <div
          className="pt-20"
          style={{ lineHeight: "1.5", letterSpacing: "1px" }}
        >
          <h5 className="text-sm lg:text-base font-lora text-white font-semibold pb-5">
            PowerPulse Fitness / Hammer Strength
          </h5>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-garamond text-white uppercase pb-1">
            LABOR DAY SALE
          </h1>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-garamond text-white uppercase pb-1">
            Up to 50% off top
          </h1>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-garamond text-white uppercase pb-8">
            equipment
          </h1>
        </div>
        <NavLink to="/products">
          <button className="px-5 py-3 bg-red-600 font-poppins text-white text-xl">
            Shop Now
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Banner;
