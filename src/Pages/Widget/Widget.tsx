import "./widget.css";
const Widget = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-40 mb-20">
      <div className=" card hover:shadow-gray-300 hover:shadow-xl">
        <img
          className="w-24 h-24 mx-auto mt-7 mb-7"
          src="https://i.postimg.cc/kXmz0kRD/heart-beat.png"
          alt=""
        />
        <h1 className="font-poppins font-semibold uppercase text-xl text-center text-[#2C2C2C] mb-1">
          Essential vitamins{" "}
        </h1>
        <p className="text-center font-poppins text-[#808080] text-base mb-7">
          Sed do eiusm od tempor{" "}
        </p>
        <div className="loader mb-7">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className=" card hover:shadow-gray-300 hover:shadow-xl">
        <img
          className="w-24 h-24 mx-auto mt-7 mb-7"
          src="https://i.postimg.cc/y6vpGkKp/supplement.png"
          alt=""
        />
        <h1 className="font-poppins font-semibold uppercase text-xl text-center text-[#2C2C2C] mb-1">
          Nutrient support{" "}
        </h1>
        <p className="text-center font-poppins text-[#808080] text-base mb-7">
          Sed do eiusm od tempor{" "}
        </p>
        <div className="loader mb-7">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className=" card hover:shadow-gray-300 hover:shadow-xl">
        <img
          className="w-24 h-24 mx-auto mt-7 mb-7"
          src="https://i.postimg.cc/pV4zyHJX/protein.png"
          alt=""
        />
        <h1 className="font-poppins font-semibold uppercase text-xl text-center text-[#2C2C2C] mb-1">
          Energy Boosting{" "}
        </h1>
        <p className="text-center font-poppins text-[#808080] text-base mb-7">
          Sed do eiusm od tempor{" "}
        </p>
        <div className="loader mb-7">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className=" card hover:shadow-gray-300 hover:shadow-xl">
        <img
          className="w-24 h-24 mx-auto mt-7 mb-7"
          src="https://i.postimg.cc/50jnvWK9/muscle.png"
          alt=""
        />
        <h1 className="font-poppins font-semibold uppercase text-xl text-center text-[#2C2C2C] mb-1">
          Muscle recovery{" "}
        </h1>
        <p className="text-center font-poppins text-[#808080] text-base mb-7">
          Sed do eiusm od tempor{" "}
        </p>
        <div className="loader mb-7">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Widget;
