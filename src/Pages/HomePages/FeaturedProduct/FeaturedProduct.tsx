import { useGetAllAdvertiseProductQuery } from "@/redux/features/product/productApi";
import FeaturedProductCard from "./FeaturedProductCard";
import { Link } from "react-router-dom";
import { TFeaturedProduct } from "@/types";

const FeaturedProduct = () => {
  const { data: advertiseData } = useGetAllAdvertiseProductQuery(undefined);
  // console.log(advertiseData);

  return (
    <div className="container mx-auto mt-20 mb-20">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold md:text-3xl">
          Featured Product
        </h1>
        <Link to="/products">
          <button
            className="border border-[#e8e8e1] text-[#1d1d1f] px-1 sm:px-5 md:px-7 py-2 text-sm md:text-base font-oswald font-semibold focus:outline focus:outline-1 focus:outline-[#1D1D1F] rounded-md bg-transparent"
            style={{ lineHeight: "1.6", letterSpacing: "0.1em" }}
          >
            Explore More
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {advertiseData?.data?.map((product: TFeaturedProduct) => (
          <FeaturedProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
