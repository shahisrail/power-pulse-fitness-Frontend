import { Swiper, SwiperSlide } from "swiper/react";
import "./TestimonialSlider.css";
import { FaQuoteLeft } from "react-icons/fa";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    image: "https://i.postimg.cc/3JfcqPKM/testi-1.webp",
    review:
      "This is the best jump rope I’ve used! The handles are comfortable, and the rope turns smoothly for fast-paced workouts. I appreciate the adjustable length and the quality of the materials.",
    name: "David Williams",
    role: "Medical Officer",
    rating: 5,
    reviewsCount: 5,
  },
  {
    image: "https://i.postimg.cc/MG7tz48p/testi-2.webp",
    review:
      "This is the best jump rope I’ve used! The handles are comfortable, and the rope turns smoothly for fast-paced workouts. I appreciate the adjustable length and the quality of the materials.",
    name: "Natasha Edwards",
    role: "Customer",
    rating: 4,
    reviewsCount: 4,
  },
  {
    image: "https://i.postimg.cc/XJnLq8Vc/testi-3.webp",
    review:
      "This is the best jump rope I’ve used! The handles are comfortable, and the rope turns smoothly for fast-paced workouts. I appreciate the adjustable length and the quality of the materials.",
    name: "Wesley bates",
    role: "Customer",
    rating: 4,
    reviewsCount: 4,
  },
  {
    image: "https://i.postimg.cc/JnmgQp0F/testi-4.webp",
    review:
      "This is the best jump rope I’ve used! The handles are comfortable, and the rope turns smoothly for fast-paced workouts. I appreciate the adjustable length and the quality of the materials.",
    name: "Emma Megan",
    role: "Customer",
    rating: 4,
    reviewsCount: 4,
  },
];

const TestimonialSlider = () => {
  return (
    <div className="container mx-auto">
      <h1 className="font-poppins text-center text-4xl font-bold mb-16">
        Customer Love
      </h1>
      <Swiper
        spaceBetween={15}
        slidesPerView={2}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
        loop={true}
        grabCursor={true}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col  gap-5  bg-[#F9F2F3] border border-gray-200 rounded-lg shadow md:flex-row  ">
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={testimonial?.image}
                alt=""
              />
              <div className="p-5">
                <div className="mt-4 pb-5">
                  <FaQuoteLeft className="text-3xl text-[#f87f96]" />
                </div>
                <p
                  className="mb-3 font-normal text-[#808080] font-poppins border-b-[1px] border-b-gray-400 pb-5"
                  style={{ lineHeight: "27px" }}
                >
                  {testimonial?.review}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-base font-poppins font-semibold text-[#f87f96] pb-1">
                      {testimonial?.name}
                    </h1>
                    <p className=" font-normal text-[#808080] text-sm font-poppins">
                      {testimonial?.role}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-start mb-2">
                      {/* Dynamic star rating */}
                      {[...Array(5)].map((_, starIndex) => (
                        <svg
                          key={starIndex}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={
                            starIndex < testimonial.rating
                              ? "#EFA505"
                              : "#d3d3d3"
                          }
                          className="w-4 h-4"
                        >
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      ))}
                    </div>
                    <p className=" font-normal text-[#808080] text-sm font-poppins">
                      ({testimonial.reviewsCount} Review
                      {testimonial.reviewsCount > 1 ? "s" : ""})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
