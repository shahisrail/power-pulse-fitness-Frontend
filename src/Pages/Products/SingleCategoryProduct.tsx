import { useGetProductByIdInCategoryQuery } from "@/redux/features/product/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  useCreateCartMutation,
  useGetAllCartByUserQuery,
} from "@/redux/features/cart/cartApi";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import Breadcrumb6 from "@/components/Breadcrumb6/Breadcrumb6";
import { TUserPayload } from "@/types";
import AccordionDemo from "@/components/Accordion/Accordion";

type Params = {
  category: string;
  id: string;
};

type Product = {
  name: string;
  price: number;
  stockQuantity: number;
  shortDescription: string;
  longDescription: string;
  images: string[];
  category: string;
  sku: string;
  id: string;
};

type CartItem = {
  productId: { _id: string };
  quantity: number;
};

type CartData = {
  items: CartItem[];
};

const SingleCategoryProduct = () => {
  const { category, id } = useParams<Params>();
  const [counter, setCounter] = useState(60);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState<string | null>(null); // State to hold the main image
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken); // Get current user's token
  const navigate = useNavigate();

  // If category or id are undefined, handle the error case
  if (!category || !id) {
    return <div>Error: Invalid product or category.</div>;
  }

  // Fetch product data by category and id
  const { data: singleProductData } = useGetProductByIdInCategoryQuery({
    category,
    id,
  });
  const product = singleProductData?.data as Product | undefined;
  const stockQuantity = product?.stockQuantity || 0;

  // Fetch user's cart to check existing quantity
  const { data: cartData } = useGetAllCartByUserQuery(userId); // Fetch based on userId, not productId
  // console.log("cartdata", cartData);
  const cartItems = (cartData?.data as CartData)?.items || [];
  const cartProduct = cartItems.find((item: any) => item.productId._id === id);
  const cartQuantity = cartProduct ? cartProduct.quantity : 0;

  const [createCart] = useCreateCartMutation();

  const increment = () => {
    if (quantity + cartQuantity < stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 60));
    }, 1000);
    return () => clearInterval(timer); // Clean up the timer when the component unmounts
  }, []);

  // Set the first image as the default current image
  useEffect(() => {
    if (product?.images?.length) {
      setCurrentImage(product.images[0]);
    }
  }, [product]);

  // Add to Cart Handler
  const handleAddToCart = async () => {
    const toastId = toast.loading("Logging In...");
    try {
      const cartData = {
        productId: id,
        userId,
        quantity: quantity,
      };

      await createCart({ token, data: cartData });
      toast.success("Product added to cart successfully!", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleAddToCartByNow = async () => {
    const toastId = toast.loading("Loading...");
    if (!token) {
      toast.error("User must be logged in to add items to the cart", {
        id: toastId,
        duration: 3000,
      });
      return;
    }

    try {
      await createCart({
        userId,
        data: { userId, productId: id, quantity: 1 },
      }).unwrap(); // Pass product data to the cart mutation
      toast.success("Product added to cart successfully!", {
        id: toastId,
        duration: 3000,
      });
      navigate("/checkout");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Determine if the Add to Cart button should be disabled
  const isAddToCartDisabled = cartQuantity + quantity > stockQuantity;

  return (
    <div className="mt-20 mb-20">
      <Breadcrumb6 category={product?.category || "Uncategorized"} />

      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-20">
          {/* Main Image */}
          <div className="flex-1">
            {/* Main Image with Dynamic Zoom on Hover */}
            <div className="relative overflow-hidden group">
              <img
                src={currentImage as string}
                alt="Product"
                className="w-full rounded-md transform transition-transform duration-300 group-hover:scale-125 group-hover:cursor-zoom-in"
                style={{
                  transformOrigin: "center center",
                }}
                onMouseMove={(e) => {
                  const img = e.currentTarget;
                  const { left, top, width, height } =
                    img.getBoundingClientRect();
                  const x = ((e.clientX - left) / width) * 100;
                  const y = ((e.clientY - top) / height) * 100;
                  img.style.transformOrigin = `${x}% ${y}%`;
                }}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 mt-5">
              {product?.images?.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setCurrentImage(image)}
                  className={`w-32 h-32 rounded-md object-cover cursor-pointer ${
                    currentImage === image ? "border-2 border-[#f87f96]" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="font-poppins text-center sm:text-start font-medium text-2xl sm:text-[34px] text-[#333333]">
              {product?.name}
            </h1>
            <div className="flex flex-col md:flex-row items-center sm:items-start md:items-center gap-3 mt-5 md:mt-10 border-b-[1px] border-b-[#808080] pb-7">
              <div className="flex justify-start">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#EFA505"
                    className="w-5 h-5"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>
              <span
                className="text-[#808080]  font-poppins font-normal "
                style={{ lineHeight: "1.4" }}
              >
                No reviews /
              </span>
              <span
                className="text-[#f80013]  font-poppins font-medium "
                style={{ lineHeight: "1" }}
              >
                15 sold in last 2 hours
              </span>
            </div>

            {/* Price and Timer */}
            <div className="flex flex-col md:flex-row items-center sm:items-start md:items-center gap-10 lg:gap-20 pt-7 border-b-[1px] border-b-[#808080] pb-5 md:pb-10">
              <div>
                <p className=" text-center sm:text-start text-[17px] font-poppins font-semibold text-[#f87f96] ">
                  ${product?.price}
                </p>
                {/* Countdown */}
                <div className="grid grid-flow-col gap-3 text-center auto-cols-max mt-5 md:mt-7">
                  <div className="flex flex-col items-center border p-0.5 h-16 w-[70px] bg-[#F9F2F2] rounded-box text-neutral-content">
                    <span className="countdown font-poppins text-base text-[#333333] pt-3 font-bold">
                      <span
                        style={{ "--value": 15 } as React.CSSProperties}
                      ></span>
                    </span>
                    <span className="text-[#F87FA5] font-poppins text-[15px] uppercase font-bold">
                      day
                    </span>
                  </div>
                  <div className="flex flex-col items-center border p-0.5 h-16 w-[70px] bg-[#F9F2F2] rounded-box text-neutral-content">
                    <span className="countdown font-poppins text-base text-[#333333] pt-3 font-bold">
                      <span
                        style={{ "--value": 10 } as React.CSSProperties}
                      ></span>
                    </span>
                    <span className="text-[#F87FA5] font-poppins text-[15px] uppercase font-bold">
                      hours
                    </span>
                  </div>
                  <div className="flex flex-col items-center border p-0.5 h-16 w-[70px] bg-[#F9F2F2] rounded-box text-neutral-content">
                    <span className="countdown font-poppins text-base text-[#333333] pt-3 font-bold">
                      <span
                        style={{ "--value": 24 } as React.CSSProperties}
                      ></span>
                    </span>
                    <span className="text-[#F87FA5] font-poppins text-[15px] uppercase font-bold">
                      min
                    </span>
                  </div>
                  <div className="flex flex-col items-center border p-0.5 h-16 w-[70px] bg-[#F9F2F2] rounded-box text-neutral-content">
                    <span className="countdown font-poppins text-base text-[#333333] pt-3 font-bold">
                      <span
                        style={{ "--value": counter } as React.CSSProperties}
                      ></span>
                    </span>
                    <span className="text-[#F87FA5] font-poppins text-[15px] uppercase font-bold">
                      sec
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-base font-poppins text-[#808080] pb-8 pt-3">
                  <span className="font-semibold text-[#333333]">Brand : </span>
                  PowerPulse Fitness
                </h5>
                <h5 className="text-base font-poppins text-[#808080]">
                  <span className="font-semibold text-[#333333]">
                    Availability:{" "}
                  </span>
                  {stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                </h5>
              </div>
            </div>

            {/* Description */}
            <div className="border-b-[1px] border-b-[#808080] pb-8">
              <p className="text-base text-center sm:text-start font-poppins font-medium text-[#808080] pt-8">
                {product?.shortDescription}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 pt-10">
              <div className="flex items-center space-x-2">
                <button
                  className="border px-5 py-[6px] text-xl font-poppins font-medium rounded-md"
                  onClick={decrement}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value)))
                  }
                  className="text-center w-12 border border-gray-300 rounded-md px-3 py-2 text-[#808080]"
                  min="1"
                />
                <button
                  className="border px-5 py-[6px] text-xl font-poppins font-medium rounded-md"
                  onClick={increment}
                  disabled={quantity + cartQuantity >= stockQuantity}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`bg-[#f87f96] w-full px-5 py-3 font-poppins font-semibold text-white rounded-md ${
                  isAddToCartDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isAddToCartDisabled}
              >
                {isAddToCartDisabled ? "Out of Stock" : "Add To Cart"}
              </button>
            </div>

            {/* Buy Now */}
            <div className="pt-7 border-b-[1px] border-b-[#808080] pb-8">
              <button
                onClick={handleAddToCartByNow}
                disabled={isAddToCartDisabled}
                className={`uppercase rounded-md w-full px-5 py-3 text-white text-base font-poppins font-semibold bg-[#7227b4] hover:bg-[#f87f96] ${
                  isAddToCartDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isAddToCartDisabled ? "Out of Stock" : "Buy Now"}
              </button>
            </div>
            <div className="flex flex-col semi-sm:flex-row items-center sm:items-start semi-sm:items-center justify-between">
              <div className="mt-7 flex items-center gap-4">
                <span className="text-[#333333] font-poppins font-semibold text-lg">
                  SKU :{" "}
                </span>
                <span className="font-poppins font-normal text-[#808080] text-[15px]">
                  {product?.sku}
                </span>
              </div>
              <div>
                <div className="mt-7 flex items-center gap-4">
                  <span className="text-[#333333] font-poppins font-semibold text-lg">
                    Share :{" "}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25px"
                    height="25px"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill="#1877F2"
                      d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
                    />
                    <path
                      fill="#ffffff"
                      d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="25px"
                    height="25px"
                    viewBox="0 -4 48 48"
                    version="1.1"
                  >
                    <title>Twitter-color</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g
                      id="Icons"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Color-"
                        transform="translate(-300.000000, -164.000000)"
                        fill="#00AAEC"
                      >
                        <path
                          d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283"
                          id="Twitter"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="25px"
                    height="25px"
                    viewBox="0 0 48 48"
                    version="1.1"
                  >
                    <title>Pinterest-color</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g
                      id="Icons"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Color-"
                        transform="translate(-300.000000, -260.000000)"
                        fill="#CC2127"
                      >
                        <path
                          d="M324.001411,260 C310.747575,260 300,270.744752 300,284.001411 C300,293.826072 305.910037,302.270594 314.368672,305.982007 C314.300935,304.308344 314.357382,302.293173 314.78356,300.469924 C315.246428,298.522491 317.871229,287.393897 317.871229,287.393897 C317.871229,287.393897 317.106368,285.861351 317.106368,283.59499 C317.106368,280.038808 319.169518,277.38296 321.73505,277.38296 C323.91674,277.38296 324.972306,279.022755 324.972306,280.987123 C324.972306,283.180102 323.572411,286.462515 322.852708,289.502205 C322.251543,292.050803 324.128418,294.125243 326.640325,294.125243 C331.187158,294.125243 334.249427,288.285765 334.249427,281.36532 C334.249427,276.10725 330.707356,272.170048 324.263891,272.170048 C316.985006,272.170048 312.449462,277.59746 312.449462,283.659905 C312.449462,285.754101 313.064738,287.227377 314.029988,288.367613 C314.475922,288.895396 314.535191,289.104251 314.374316,289.708238 C314.261422,290.145705 313.996119,291.21256 313.886047,291.633092 C313.725172,292.239901 313.23408,292.460046 312.686541,292.234256 C309.330746,290.865408 307.769977,287.193509 307.769977,283.064385 C307.769977,276.248368 313.519139,268.069148 324.921503,268.069148 C334.085729,268.069148 340.117128,274.704533 340.117128,281.819721 C340.117128,291.235138 334.884459,298.268478 327.165285,298.268478 C324.577174,298.268478 322.138649,296.868584 321.303228,295.279591 C321.303228,295.279591 319.908979,300.808608 319.615452,301.875463 C319.107426,303.724114 318.111131,305.575587 317.199506,307.014994 C319.358617,307.652849 321.63909,308 324.001411,308 C337.255248,308 348,297.255248 348,284.001411 C348,270.744752 337.255248,260 324.001411,260"
                          id="Pinterest"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center semi-sm:justify-start gap-2 mt-6 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 -11 70 70"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="69"
                  height="47"
                  rx="5.5"
                  fill="white"
                  stroke="#D9D9D9"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.2505 32.5165H17.0099L13.8299 20.3847C13.679 19.8267 13.3585 19.3333 12.8871 19.1008C11.7106 18.5165 10.4142 18.0514 9 17.8169V17.3498H15.8313C16.7742 17.3498 17.4813 18.0514 17.5991 18.8663L19.2491 27.6173L23.4877 17.3498H27.6104L21.2505 32.5165ZM29.9675 32.5165H25.9626L29.2604 17.3498H33.2653L29.9675 32.5165ZM38.4467 21.5514C38.5646 20.7346 39.2717 20.2675 40.0967 20.2675C41.3931 20.1502 42.8052 20.3848 43.9838 20.9671L44.6909 17.7016C43.5123 17.2345 42.216 17 41.0395 17C37.1524 17 34.3239 19.1008 34.3239 22.0165C34.3239 24.2346 36.3274 25.3992 37.7417 26.1008C39.2717 26.8004 39.861 27.2675 39.7431 27.9671C39.7431 29.0165 38.5646 29.4836 37.3881 29.4836C35.9739 29.4836 34.5596 29.1338 33.2653 28.5494L32.5582 31.8169C33.9724 32.3992 35.5025 32.6338 36.9167 32.6338C41.2752 32.749 43.9838 30.6502 43.9838 27.5C43.9838 23.5329 38.4467 23.3004 38.4467 21.5514ZM58 32.5165L54.82 17.3498H51.4044C50.6972 17.3498 49.9901 17.8169 49.7544 18.5165L43.8659 32.5165H47.9887L48.8116 30.3004H53.8772L54.3486 32.5165H58ZM51.9936 21.4342L53.1701 27.1502H49.8723L51.9936 21.4342Z"
                  fill="#172B85"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 -9 58 58"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="57"
                  height="39"
                  rx="3.5"
                  fill="white"
                  stroke="#F3F3F3"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26.4388 20.2562L26.6913 18.6477L26.1288 18.6346H23.4429L25.3095 6.76505C25.3153 6.72911 25.3341 6.69575 25.3616 6.67201C25.3892 6.64827 25.4243 6.63525 25.4611 6.63525H29.9901C31.4937 6.63525 32.5313 6.94897 33.073 7.56826C33.327 7.85879 33.4887 8.16246 33.567 8.49653C33.6491 8.84713 33.6505 9.26596 33.5704 9.77689L33.5646 9.81405V10.1415L33.8186 10.2858C34.0324 10.3996 34.2024 10.5298 34.3328 10.6788C34.55 10.9273 34.6905 11.2431 34.7499 11.6173C34.8113 12.0022 34.791 12.4604 34.6905 12.979C34.5746 13.5755 34.3873 14.0951 34.1343 14.5202C33.9016 14.9119 33.6052 15.2369 33.2531 15.4886C32.9171 15.7279 32.5178 15.9095 32.0664 16.0257C31.6288 16.1399 31.1301 16.1975 30.583 16.1975H30.2305C29.9786 16.1975 29.7338 16.2886 29.5416 16.4517C29.3489 16.6183 29.2215 16.8459 29.1824 17.0947L29.1558 17.2396L28.7096 20.0747L28.6894 20.1787C28.684 20.2117 28.6748 20.2281 28.6613 20.2392C28.6493 20.2494 28.632 20.2562 28.615 20.2562H26.4388"
                  fill="#28356A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M34.0589 9.85181C34.0455 9.93848 34.03 10.027 34.0126 10.1181C33.4154 13.1934 31.372 14.2558 28.7623 14.2558H27.4335C27.1143 14.2558 26.8453 14.4881 26.7957 14.8038L25.9227 20.3573C25.8904 20.5647 26.0497 20.7514 26.2582 20.7514H28.615C28.894 20.7514 29.1311 20.5481 29.1751 20.2721L29.1982 20.1521L29.6419 17.3281L29.6705 17.1732C29.7139 16.8962 29.9515 16.6928 30.2305 16.6928H30.583C32.8663 16.6928 34.6538 15.7632 35.1763 13.0728C35.3944 11.9489 35.2815 11.0105 34.704 10.3505C34.5293 10.1516 34.3125 9.98635 34.0589 9.85181"
                  fill="#298FC2"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M33.4342 9.60206C33.3429 9.57534 33.2488 9.5512 33.1522 9.52936C33.0551 9.50807 32.9557 9.48922 32.8533 9.47267C32.4951 9.41462 32.1025 9.38708 31.682 9.38708H28.1322C28.0447 9.38708 27.9617 9.40689 27.8874 9.44269C27.7236 9.52163 27.602 9.67707 27.5726 9.86736L26.8174 14.6641L26.7957 14.8039C26.8454 14.4882 27.1144 14.2558 27.4335 14.2558H28.7623C31.372 14.2558 33.4154 13.1929 34.0127 10.1181C34.0305 10.0271 34.0455 9.93856 34.0589 9.85189C33.9078 9.77146 33.7442 9.7027 33.568 9.64411C33.5244 9.62959 33.4795 9.61562 33.4342 9.60206"
                  fill="#22284F"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.5726 9.86737C27.6021 9.67708 27.7236 9.52165 27.8874 9.44325C27.9622 9.40731 28.0447 9.38751 28.1322 9.38751H31.682C32.1025 9.38751 32.4951 9.41518 32.8534 9.47323C32.9557 9.48964 33.0551 9.50863 33.1522 9.52992C33.2488 9.55162 33.3429 9.5759 33.4342 9.60248C33.4795 9.61605 33.5244 9.63015 33.5684 9.64412C33.7446 9.70272 33.9084 9.77202 34.0595 9.85191C34.2372 8.71545 34.058 7.94168 33.4453 7.241C32.7698 6.46953 31.5507 6.1394 29.9906 6.1394H25.4615C25.1429 6.1394 24.8711 6.37174 24.8218 6.68803L22.9354 18.6796C22.8982 18.9168 23.0807 19.1309 23.3193 19.1309H26.1153L27.5726 9.86737"
                  fill="#28356A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.0946 23.5209H9.79248C9.56648 23.5209 9.3743 23.6855 9.339 23.9093L8.00345 32.4009C7.97695 32.5686 8.10638 32.7195 8.27584 32.7195H9.85225C10.0782 32.7195 10.2704 32.555 10.3057 32.3308L10.6659 30.0404C10.7006 29.8162 10.8932 29.6516 11.1188 29.6516H12.1641C14.3393 29.6516 15.5946 28.5959 15.9226 26.5042C16.0703 25.589 15.9288 24.87 15.5014 24.3664C15.0321 23.8134 14.1997 23.5209 13.0946 23.5209ZM13.4755 26.6224C13.2949 27.8106 12.3896 27.8106 11.5143 27.8106H11.0159L11.3655 25.5914C11.3863 25.4573 11.5021 25.3585 11.6374 25.3585H11.8658C12.4621 25.3585 13.0246 25.3585 13.3152 25.6994C13.4886 25.9027 13.5416 26.2049 13.4755 26.6224Z"
                  fill="#28356A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.0496 26.5199H21.4683C21.3336 26.5199 21.2171 26.6187 21.1964 26.7528L21.1264 27.1963L21.0159 27.0356C20.6736 26.5373 19.9101 26.3707 19.1483 26.3707C17.4008 26.3707 15.9084 27.698 15.6177 29.5598C15.4666 30.4885 15.6814 31.3766 16.2068 31.9959C16.6887 32.5653 17.3782 32.8026 18.1985 32.8026C19.6065 32.8026 20.3871 31.8947 20.3871 31.8947L20.3167 32.3354C20.2902 32.5038 20.4196 32.6549 20.5881 32.6549H22.0124C22.2389 32.6549 22.4301 32.4903 22.4659 32.2661L23.3205 26.8385C23.3475 26.6714 23.2185 26.5199 23.0496 26.5199ZM20.8453 29.6064C20.6928 30.5122 19.9759 31.1204 19.0613 31.1204C18.6022 31.1204 18.2353 30.9727 17.9995 30.6929C17.7658 30.415 17.6771 30.0194 17.7513 29.5787C17.8939 28.6805 18.6229 28.0524 19.5235 28.0524C19.9725 28.0524 20.3375 28.2022 20.578 28.4843C20.8188 28.7695 20.9145 29.1676 20.8453 29.6064Z"
                  fill="#28356A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M31.3495 26.6556H29.7604C29.6088 26.6556 29.4664 26.7312 29.3805 26.8576L27.1888 30.095L26.2598 26.9839C26.2014 26.7892 26.0223 26.6556 25.8195 26.6556H24.2581C24.0682 26.6556 23.9365 26.8416 23.9968 27.0208L25.7471 32.1718L24.1016 34.5014C23.9722 34.6849 24.1025 34.9372 24.3261 34.9372H25.9132C26.0639 34.9372 26.2048 34.8635 26.2903 34.7397L31.5754 27.089C31.702 26.906 31.572 26.6556 31.3495 26.6556"
                  fill="#28356A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M36.6469 23.5209H33.3444C33.1189 23.5209 32.9267 23.6855 32.8914 23.9093L31.5559 32.4009C31.5294 32.5686 31.6588 32.7195 31.8273 32.7195H33.5221C33.6794 32.7195 33.8141 32.6044 33.8387 32.4475L34.2178 30.0404C34.2525 29.8162 34.4453 29.6516 34.6707 29.6516H35.7156C37.8912 29.6516 39.1461 28.5959 39.4745 26.5042C39.6227 25.589 39.4803 24.87 39.0529 24.3664C38.584 23.8134 37.7521 23.5209 36.6469 23.5209ZM37.0279 26.6224C36.8478 27.8106 35.9424 27.8106 35.0666 27.8106H34.5689L34.9189 25.5914C34.9396 25.4573 35.0545 25.3585 35.1902 25.3585H35.4186C36.0144 25.3585 36.5774 25.3585 36.868 25.6994C37.0414 25.9027 37.094 26.2049 37.0279 26.6224Z"
                  fill="#298FC2"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M46.5999 26.5199H45.0195C44.8839 26.5199 44.7685 26.6187 44.7482 26.7528L44.6782 27.1963L44.5671 27.0356C44.2248 26.5373 43.4619 26.3707 42.6999 26.3707C40.9526 26.3707 39.4607 27.698 39.1701 29.5598C39.0194 30.4885 39.2332 31.3766 39.7585 31.9959C40.2415 32.5653 40.9299 32.8026 41.7503 32.8026C43.1582 32.8026 43.9389 31.8947 43.9389 31.8947L43.8685 32.3354C43.842 32.5038 43.9713 32.6549 44.1408 32.6549H45.5647C45.7902 32.6549 45.9823 32.4903 46.0176 32.2661L46.8727 26.8385C46.8988 26.6714 46.7693 26.5199 46.5999 26.5199ZM44.3958 29.6064C44.2442 30.5122 43.5262 31.1204 42.6116 31.1204C42.1534 31.1204 41.7856 30.9727 41.5498 30.6929C41.3163 30.415 41.2283 30.0194 41.3016 29.5787C41.4451 28.6805 42.1732 28.0524 43.0738 28.0524C43.5228 28.0524 43.8878 28.2022 44.1283 28.4843C44.3701 28.7695 44.4657 29.1676 44.3958 29.6064Z"
                  fill="#298FC2"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M48.3324 23.7543L46.9771 32.4013C46.9506 32.569 47.0799 32.7199 47.2484 32.7199H48.611C48.8375 32.7199 49.0296 32.5554 49.0643 32.3312L50.4008 23.84C50.4275 23.6724 50.298 23.5209 50.1295 23.5209H48.6038C48.4691 23.5213 48.3532 23.6202 48.3324 23.7543"
                  fill="#298FC2"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 -11 70 70"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="69"
                  height="47"
                  rx="5.5"
                  fill="white"
                  stroke="#D9D9D9"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M35.3945 34.7619C33.0114 36.8184 29.92 38.0599 26.5421 38.0599C19.0047 38.0599 12.8945 31.8788 12.8945 24.254C12.8945 16.6291 19.0047 10.448 26.5421 10.448C29.92 10.448 33.0114 11.6895 35.3945 13.7461C37.7777 11.6895 40.869 10.448 44.247 10.448C51.7843 10.448 57.8945 16.6291 57.8945 24.254C57.8945 31.8788 51.7843 38.0599 44.247 38.0599C40.869 38.0599 37.7777 36.8184 35.3945 34.7619Z"
                  fill="#ED0006"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M35.3945 34.7619C38.3289 32.2296 40.1896 28.4616 40.1896 24.254C40.1896 20.0463 38.3289 16.2783 35.3945 13.7461C37.7777 11.6895 40.869 10.448 44.247 10.448C51.7843 10.448 57.8945 16.6291 57.8945 24.254C57.8945 31.8788 51.7843 38.0599 44.247 38.0599C40.869 38.0599 37.7777 36.8184 35.3945 34.7619Z"
                  fill="#F9A000"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M35.3946 13.7461C38.329 16.2784 40.1897 20.0463 40.1897 24.254C40.1897 28.4616 38.329 32.2295 35.3946 34.7618C32.4603 32.2295 30.5996 28.4616 30.5996 24.254C30.5996 20.0463 32.4603 16.2784 35.3946 13.7461Z"
                  fill="#FF5E00"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 -9 58 58"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="57"
                  height="39"
                  rx="3.5"
                  fill="#006FCF"
                  stroke="#F3F3F3"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.8632 28.8937V20.6592H21.1869L22.1872 21.8787L23.2206 20.6592H57.0632V28.3258C57.0632 28.3258 56.1782 28.8855 55.1546 28.8937H36.4152L35.2874 27.5957V28.8937H31.5916V26.6779C31.5916 26.6779 31.0867 26.9872 29.9953 26.9872H28.7373V28.8937H23.1415L22.1426 27.6481L21.1284 28.8937H11.8632ZM1 14.4529L3.09775 9.86914H6.7256L7.9161 12.4368V9.86914H12.4258L13.1346 11.7249L13.8216 9.86914H34.0657V10.8021C34.0657 10.8021 35.1299 9.86914 36.8789 9.86914L43.4474 9.89066L44.6173 12.4247V9.86914H48.3913L49.43 11.3247V9.86914H53.2386V18.1037H49.43L48.4346 16.6434V18.1037H42.8898L42.3321 16.8056H40.8415L40.293 18.1037H36.5327C35.0277 18.1037 34.0657 17.1897 34.0657 17.1897V18.1037H28.3961L27.2708 16.8056V18.1037H6.18816L5.63093 16.8056H4.14505L3.59176 18.1037H1V14.4529ZM1.01082 17.05L3.84023 10.8843H5.98528L8.81199 17.05H6.92932L6.40997 15.8154H3.37498L2.85291 17.05H1.01082ZM5.81217 14.4768L4.88706 12.3192L3.95925 14.4768H5.81217ZM9.00675 17.049V10.8832L11.6245 10.8924L13.147 14.8676L14.6331 10.8832H17.2299V17.049H15.5853V12.5058L13.8419 17.049H12.3996L10.6514 12.5058V17.049H9.00675ZM18.3552 17.049V10.8832H23.7219V12.2624H20.0171V13.3171H23.6353V14.6151H20.0171V15.7104H23.7219V17.049H18.3552ZM24.674 17.05V10.8843H28.3339C29.5465 10.8843 30.6331 11.5871 30.6331 12.8846C30.6331 13.9938 29.717 14.7082 28.8289 14.7784L30.9929 17.05H28.9831L27.0111 14.8596H26.3186V17.05H24.674ZM28.1986 12.2635H26.3186V13.5615H28.223C28.5526 13.5615 28.9776 13.3221 28.9776 12.9125C28.9776 12.5941 28.6496 12.2635 28.1986 12.2635ZM32.9837 17.049H31.3045V10.8832H32.9837V17.049ZM36.9655 17.049H36.603C34.8492 17.049 33.7844 15.754 33.7844 13.9915C33.7844 12.1854 34.8373 10.8832 37.052 10.8832H38.8698V12.3436H36.9856C36.0865 12.3436 35.4507 13.0012 35.4507 14.0067C35.4507 15.2008 36.1777 15.7023 37.2251 15.7023H37.6579L36.9655 17.049ZM37.7147 17.05L40.5441 10.8843H42.6892L45.5159 17.05H43.6332L43.1139 15.8154H40.0789L39.5568 17.05H37.7147ZM42.5161 14.4768L41.591 12.3192L40.6632 14.4768H42.5161ZM45.708 17.049V10.8832H47.7989L50.4687 14.7571V10.8832H52.1134V17.049H50.09L47.3526 13.0737V17.049H45.708ZM12.9885 27.8391V21.6733H18.3552V23.0525H14.6504V24.1072H18.2686V25.4052H14.6504V26.5005H18.3552V27.8391H12.9885ZM39.2853 27.8391V21.6733H44.6519V23.0525H40.9472V24.1072H44.5481V25.4052H40.9472V26.5005H44.6519V27.8391H39.2853ZM18.5635 27.8391L21.1765 24.7942L18.5012 21.6733H20.5733L22.1665 23.6026L23.7651 21.6733H25.756L23.1159 24.7562L25.7338 27.8391H23.6621L22.1151 25.9402L20.6057 27.8391H18.5635ZM25.9291 27.8401V21.6744H29.5619C31.0525 21.6744 31.9234 22.5748 31.9234 23.7482C31.9234 25.1647 30.8131 25.893 29.3482 25.893H27.617V27.8401H25.9291ZM29.4402 23.0687H27.617V24.4885H29.4348C29.9151 24.4885 30.2517 24.1901 30.2517 23.7786C30.2517 23.3406 29.9134 23.0687 29.4402 23.0687ZM32.6375 27.8391V21.6733H36.2973C37.51 21.6733 38.5966 22.3761 38.5966 23.6736C38.5966 24.7828 37.6805 25.4972 36.7923 25.5675L38.9563 27.8391H36.9465L34.9746 25.6486H34.2821V27.8391H32.6375ZM36.1621 23.0525H34.2821V24.3505H36.1864C36.5161 24.3505 36.9411 24.1112 36.9411 23.7015C36.9411 23.3831 36.6131 23.0525 36.1621 23.0525ZM45.4137 27.8391V26.5005H48.7051C49.1921 26.5005 49.403 26.2538 49.403 25.9833C49.403 25.7241 49.1928 25.462 48.7051 25.462H47.2177C45.9249 25.462 45.2048 24.7237 45.2048 23.6153C45.2048 22.6267 45.8642 21.6733 47.7854 21.6733H50.9881L50.2956 23.0606H47.5257C46.9962 23.0606 46.8332 23.321 46.8332 23.5697C46.8332 23.8253 47.0347 24.1072 47.4392 24.1072H48.9972C50.4384 24.1072 51.0638 24.8734 51.0638 25.8768C51.0638 26.9555 50.367 27.8391 48.9188 27.8391H45.4137ZM51.2088 27.8391V26.5005H54.5002C54.9873 26.5005 55.1981 26.2538 55.1981 25.9833C55.1981 25.7241 54.9879 25.462 54.5002 25.462H53.0129C51.72 25.462 51 24.7237 51 23.6153C51 22.6267 51.6594 21.6733 53.5806 21.6733H56.7833L56.0908 23.0606H53.3209C52.7914 23.0606 52.6284 23.321 52.6284 23.5697C52.6284 23.8253 52.8298 24.1072 53.2343 24.1072H54.7924C56.2336 24.1072 56.859 24.8734 56.859 25.8768C56.859 26.9555 56.1621 27.8391 54.7139 27.8391H51.2088Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <AccordionDemo
            longDescription={product?.longDescription!}
            name={product?.name!}
            id={product?.id!}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryProduct;
