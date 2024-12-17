import { LuPhoneCall } from "react-icons/lu";

const NewsLetter = () => {
  return (
    <div className=" pt-14 sm:pt-16 semi-sm::pt-20 pb-16 container mx-auto border-b border-[#80808033]">
      <div className="flex items-center flex-col lg:flex-row justify-between">
        <div style={{ lineHeight: "1.2", letterSpacing: "1px" }}>
          <h1 className="sm:text-2xl semi-sm:text-[26px] md:text-4xl font-semibold text-[#333333] font-poppins pb-7 lg:pb-0">
            Keep up with the <br className="hidden lg:block" /> latest
          </h1>
        </div>
        <form className="pb-8 lg:pb-0">
          <header className="footer-title sm:text-xs semi-sm:text-sm text-[#808080] mb-5 text-center lg:text-start">
            Sign up our newsletter to receive special offers.
          </header>
          <fieldset className="form-control w-[300px] sm:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Your Email Here"
                className="w-[250px] sm:w-[350px] semi-sm:w-[380px] md:w-[450px] px-2 sm:px-5 py-3 text-[#6F6F6F] bg-[#ffffff] sm:text-base font-poppins outline-none border rounded-md"
              />
              <button className="py-3 px-3 sm:px-7 bg-[#f87f96] text-white absolute top-0 right-0 rounded-l-none font-poppins uppercase rounded-r-md">
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
        <div className="flex items-center gap-5">
          <div className="border px-6 py-6 bg-[#f87f96]  rounded-full max-w-20">
            <LuPhoneCall className="text-2xl text-white" />
          </div>
          <div>
            <p className="text-base font-poppins font-medium text-[#808080] pb-2">
              Customer service
            </p>
            <h5 className="xs:text-xl sm:text-2xl semi-sm:text-3xl font-poppins font-semibold text-[#f87f96] hover:text-[#7227B4] cursor-pointer">
              (021) 235 8749
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
