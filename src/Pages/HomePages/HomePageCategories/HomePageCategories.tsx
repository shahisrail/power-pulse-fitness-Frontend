import { useNavigate } from "react-router-dom";

const HomePageCategories = () => {
  const navigate = useNavigate();

  const handleShopNowClick = (category: string) => {
    navigate("/products", { state: { selectedCategory: category } });
  };
  return (
    <div className="mx-5 mt-10 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div className="relative h-[300px] lg:h-[350px]">
          <img
            src="https://i.postimg.cc/R0vQLfH3/3d-gym-equipment-2.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white">
            <h1
              className="text-2xl font-semibold font-oswald uppercase"
              style={{ lineHeight: "1.6", letterSpacing: "0.1em" }}
            >
              Weightlifting Bars & Weights
            </h1>
            <button
              onClick={() => handleShopNowClick("Weightlifting Bars & Weights")}
              className="mt-4 px-5 py-2 bg-white text-black uppercase font-semibold font-oswald"
              style={{ lineHeight: "1.6", letterSpacing: "0.2em" }}
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="relative h-[250px] md:h-[300px] lg:h-[350px]">
          <img
            src="https://i.postimg.cc/Gt4jsCsq/3d-gym-equipment.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white">
            <h1
              className="text-2xl font-semibold font-oswald uppercase"
              style={{ lineHeight: "1.6", letterSpacing: "0.1em" }}
            >
              RACKS & CAGES
            </h1>
            <button
              onClick={() => handleShopNowClick("RACKS & CAGES")}
              className="mt-4 px-5 py-2 bg-white text-black uppercase font-semibold font-oswald"
              style={{ lineHeight: "1.6", letterSpacing: "0.2em" }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-[300px] lg:h-[350px] mt-5">
        <img
          src="https://i.postimg.cc/nrQMqd18/PXL-20220422-205816073-MP.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white">
          <h1
            className="text-2xl font-semibold font-oswald uppercase"
            style={{ lineHeight: "1.6", letterSpacing: "0.1em" }}
          >
            BARBELLS
          </h1>
          <button
            onClick={() => handleShopNowClick("BARBELLS")}
            className="mt-4 px-5 py-2 bg-white text-black uppercase font-semibold font-oswald"
            style={{ lineHeight: "1.6", letterSpacing: "0.2em" }}
          >
            Shop Now
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        <div className="relative h-[300px] lg:h-[350px]">
          <img
            src="https://i.postimg.cc/Nf3T5tbs/handsome-black-man-is-engaged-gym.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white">
            <h1
              className="text-2xl font-semibold font-oswald uppercase"
              style={{ lineHeight: "1.6", letterSpacing: "0.1em" }}
            >
              BENCHES
            </h1>
            <button
              onClick={() => handleShopNowClick("BENCHES")}
              className="mt-4 px-5 py-2 bg-white text-black uppercase font-semibold font-oswald"
              style={{ lineHeight: "1.6", letterSpacing: "0.2em" }}
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="relative h-[250px] md:h-[300px] lg:h-[350px]">
          <img
            src="https://i.postimg.cc/CK08jzRP/woman-practicing-yoga-pilates.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white">
            <h1
              className="text-2xl font-semibold font-oswald uppercase"
              style={{ lineHeight: "1.6", letterSpacing: "0.1em" }}
            >
              Yoga & Pilates
            </h1>
            <button
              onClick={() => handleShopNowClick("Yoga & Pilates")}
              className="mt-4 px-5 py-2 bg-white text-black uppercase font-semibold font-oswald"
              style={{ lineHeight: "1.6", letterSpacing: "0.2em" }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageCategories;
