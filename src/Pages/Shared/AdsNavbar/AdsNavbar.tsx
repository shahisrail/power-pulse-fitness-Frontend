// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// Import required modules
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper"; // Import Swiper type

const AdsNavbar = () => {
  // Create a ref to hold the Swiper instance with the correct type
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#D11F2E] flex items-center justify-between z-40 lg:px-[750px] py-1">
      {/* Left Navigation Button */}
      <button
        className="text-white p-2"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <HiArrowSmLeft className="text-2xl" />
      </button>

      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={30}
        direction="vertical"
        slidesPerView="auto"
        className="w-full h-[20px] md:h-[26px]"
        speed={2000}
        loop={true}
        autoplay={{
          delay: 3000, // Set delay to 3 seconds
          disableOnInteraction: false, // Keep autoplay running on user interaction
        }}
        onSwiper={(swiper) => {
          // Assign the swiper instance to the ref
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <p className="text-center text-white font-lora text-sm md:text-base font-medium">
            ☆ FREE SHIPPING ON ALL OUTLET ☆
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <p className="text-center text-white font-lora text-sm md:text-base font-medium">
            OUTLET DEALS UP TO 50% OFF
          </p>
        </SwiperSlide>
      </Swiper>

      {/* Right Navigation Button */}
      <button
        className="text-white p-2"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <HiArrowSmRight className="text-2xl" />
      </button>
    </div>
  );
};

export default AdsNavbar;
