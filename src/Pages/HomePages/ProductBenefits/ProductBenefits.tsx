import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductBenefits = () => {
  return (
    <div className="w-full lg:px-48 mt-10 mb-20">
      <div className="flex items-center flex-col lg:flex-row gap-8 semi-sm:gap-10 md:gap-20">
        <div className="flex items-center gap-3">
          <div>
            <img
              className="h-[230px] sm:h-[270px] semi-sm:h-[300px] md:h-[500px] lg:h-[700px]"
              src="https://i.postimg.cc/QdLQR7kj/img-9-copyright.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-[230px] sm:h-[270px] semi-sm:h-[300px] md:h-[500px] lg:h-[700px]"
              src="https://i.postimg.cc/bvg1DBXv/img-8-copyright.jpg"
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="semi-sm:mx-6 sm:mx-5 xs:mx-4">
            <h3 className="font-poppins font-medium text-base text-black mb-5 uppercase text-start">
              food & drink
            </h3>
            <h1
              className="font-oswald font-bold text-xl sm:text-2xl semi-sm:text-[26px] md:text-5xl text-black uppercase md:w-[550px] mb-7"
              style={{ lineHeight: "1.1", letterSpacing: "0.025em" }}
            >
              Improve your health with the right sports nutrition
            </h1>
            <p className="font-poppins font-medium md:w-[520px] text-[#808080] mb-7">
              Boost your health with the right sports nutrition. Fuel your body
              with the essential nutrients it needs to enhance performance,
              support recovery, and maintain overall wellness
            </p>
            <div className="space-y-5 mb-7">
              <span className="flex items-center gap-5">
                <FaCheck className="text-[#EC3D08] text-xl" />
                <p className="font-poppins font-medium text-base">
                  Enhanced Performance
                </p>
              </span>
              <span className="flex items-center gap-5">
                <FaCheck className="text-[#EC3D08] text-xl" />
                <p className="font-poppins font-medium text-base">
                  Durability and Quality
                </p>
              </span>
              <span className="flex items-center gap-5">
                <FaCheck className="text-[#EC3D08] text-xl" />
                <p className="font-poppins font-medium text-base">
                  Versatile and User-Friendly
                </p>
              </span>
            </div>
            <Link to="/about-us">
              <button
                className="mt-5 bg-[#EC3D08] hover:bg-[#E21010] text-white py-3 px-8 text-base font-poppins uppercase"
                style={{ letterSpacing: "3px" }}
              >
                About Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBenefits;
