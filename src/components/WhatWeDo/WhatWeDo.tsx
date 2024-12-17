const WhatWeDo = () => {
  return (
    <div className="bg-[#F8F8F8] mt-20 mb-20">
      <div className="container mx-auto pt-10">
        <h3
          className="font-poppins text-[#2C2C2C] text-center font-semibold text-base uppercase mb-5"
          style={{ letterSpacing: "0.050em" }}
        >
          What we do
        </h3>
        <h1
          className="font-lora text-xl semi-sm:text-2xl md:text-4xl lg:text-5xl text-center  md:w-[700px]  lg:w-[1200px] mx-auto uppercase text-[#2C2C2C] font-bold mb-5"
          style={{ lineHeight: "1.2", letterSpacing: "0.025em" }}
        >
          Our Fitness store is fostering an active lifestyle and offering
          innovative, functional gear
        </h1>
        <h3
          className="font-poppins text-[#2C2C2C] text-center font-semibold text-base sm:text-lg uppercase mb-1"
          style={{ letterSpacing: "0.050em" }}
        >
          Peter Bowman
        </h3>
        <p className="font-poppins font-medium text-[#808080] text-center mb-10 pb-10">
          Senior manager
        </p>
      </div>
      {/* <Payment /> */}
    </div>
  );
};

export default WhatWeDo;
