import { Link } from "react-router-dom";
import NewsLetter from "../NewsLetter/NewsLetter";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="bg-[#f9f2f3]">
      <NewsLetter />
      <div>
        <div className="container mx-auto mt-10">
          <div className="flex flex-col lg:flex-row lg:gap-28">
            <div className="mb-5  lg:ml-0">
              <div className="flex items-center gap-3  md:ml-10 lg:ml-0">
                <img
                  className="w-10 semi-sm:w-12 md:w-16 lg:w-20"
                  src="https://i.ibb.co/QpYwXM3/Black-and-White-Modern-Fitness-Logo-New.png"
                  alt=""
                />
                <a
                  className=" md:w-64 text-xl lg:text-2xl font-garamond font-bold"
                  style={{ lineHeight: "1.3", letterSpacing: "1px" }}
                >
                  PowerPulse <br /> Fitness
                </a>
              </div>
              <p className="text-base text-[#808080] font-semibold   md:w-[395px] mx-auto text-start md:text-start lg:mx-0 md:ml-5 font-lora mt-5">
                Welcome to PowerPulse Fitness, your trusted source for all
                things fitness. We combine top-quality equipment and accessories
                with expert advice to support your health and wellness goals.
                Elevate your fitness journey with us.
              </p>
              <div className="flex items-center justify-start gap-2 mt-4 ml-0 md:ml-5 lg:ml-0">
                <div className="border max-w-full px-3 py-3 rounded-full hover:bg-[#f87f96] text-[#808080] hover:text-white  cursor-pointer">
                  <FaFacebookF className=" text-xl" />
                </div>
                <div className="border max-w-full px-3 py-3 rounded-full hover:bg-[#f87f96] text-[#808080] hover:text-white cursor-pointer">
                  <FaInstagram className=" text-xl" />
                </div>
                <div className="border max-w-full px-3 py-3 rounded-full hover:bg-[#f87f96] text-[#808080] hover:text-white cursor-pointer">
                  <FaPinterestP className=" text-xl" />
                </div>
                <div className="border max-w-full px-3 py-3 rounded-full hover:bg-[#f87f96] text-[#808080] hover:text-white cursor-pointer">
                  <CiTwitter className=" text-xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 lg:gap-24 mt-5 mb-5">
              <div className="mb-5 overflow-hidden ">
                <h2 className="text-2xl text-[#f87f96] font-bold mb-5 font-cinzel">
                  Information
                </h2>
                <div className="flex items-center gap-3 text-[#808080] hover:text-[#ffbe0b] mb-1 mt-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    Career
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#808080] mb-1 hover:text-[#ffbe0b] hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    Terms of Service
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#808080] hover:text-[#ffbe0b] mb-1 mt-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    Privacy Policy
                  </span>
                </div>
                {/* <div className="flex items-center gap-3 text-white hover:text-[#ffbe0b] mb-1 mt-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                <IoIosArrowForward />
               <Link to={`/PrivacyPolicy`}> <span className="text-lg font-medium hover:translate-x-4 hover:ease-out hover:duration-1000 font-poppins">
                  Privacy Policy
                </span></Link>
              </div> */}
                <div className="flex items-center gap-3 text-[#808080] hover:text-[#ffbe0b] mb-1 mt-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    Return Policy
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#808080] hover:text-[#ffbe0b] mb-1 mt-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    User Terms
                  </span>
                </div>
              </div>
              <div className="mb-5 overflow-hidden ">
                <h2 className="text-2xl text-[#f87f96] font-bold mb-5 font-cinzel">
                  Quick Links
                </h2>
                <div className="flex items-center gap-3 text-[#808080] hover:text-[#ffbe0b] mb-1 hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    Blog And Article
                  </span>
                </div>
                <div className="flex items-center gap-3 hover:text-[#ffbe0b] text-[#808080] mb-1 mt-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    Notes and Guides
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#808080] hover:text-[#ffbe0b] mb-1 mt-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    About Us
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#808080] hover:text-[#ffbe0b] mb-1 mt-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    Contact Us
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#808080] hover:text-[#ffbe0b] mb-1 mt-2 hover:translate-x-4 hover:ease-out hover:duration-1000">
                  <IoIosArrowForward />
                  <span className="text-lg font-medium font-poppins">
                    Free download
                  </span>
                </div>
              </div>
              <div className="mb-5 ">
                <h2 className="text-2xl text-[#f87f96] font-bold mb-5 font-cinzel">
                  Our Instagram
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {/* Array of image objects to map over */}
                  {[
                    "https://i.ibb.co/tCjN8rQ/insta-1.png",
                    "https://i.ibb.co/frQg98Q/insta-2.png",
                    "https://i.ibb.co/m0KnmJ6/insta-3.jpg",
                    "https://i.ibb.co/N15XNDS/insta-4.png",
                    "https://i.ibb.co/DrQC6xy/insta-5.png",
                    "https://i.ibb.co/f1CCx2D/insta-6.png",
                  ].map((src, index) => (
                    <div key={index} className="relative group w-20 h-20">
                      <img
                        className="w-full h-full rounded-md transition-opacity duration-300 group-hover:opacity-50"
                        src={src}
                        alt={`Instagram image ${index + 1}`}
                      />
                      {/* Instagram Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <img
                          className="w-8 h-8"
                          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" // replace with the URL of your Instagram icon
                          alt="Instagram icon"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="pb-5" />
        <div className=" container mx-auto pb-5 flex items-center justify-between flex-col lg:flex-row">
          <small className="text-[#808080] xs:text-sm sm:text-base font-semibold pb-5 pt-3">
            {" "}
            PowerPulse Fitness © 2024. All rights reserved.
          </small>
          <div className="flex items-center gap-5">
            <Link to={`/PrivacyPolicy`}>
              {" "}
              <p className="text-[#808080] text-base font-semibold ">
                Privacy Policy
              </p>
            </Link>
            <p className="text-[#808080] text-base font-semibold ">
              Terms and Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
