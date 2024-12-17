import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import RightSideUpperContent from "./RightSideUpperContent";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import ProductCardOptional from "./ProductCardOptional";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import { TMetaData, TQueryParams, TRightSideContentProps } from "@/types";
import Spinner from "@/components/Spinner/Spinner";

const RightSideContent = ({
  selectedCategories,
  selectedPriceRange,
  selectedStockAvailability,
}: TRightSideContentProps) => {
  const [sortOption, setSortOption] = useState(() => {
    // Load the saved sort option from localStorage, default to "Featured"
    return localStorage.getItem("selectedSortOption") || "Featured";
  });
  // Load the grid/list view state from localStorage on page load
  const [isGridView, setIsGridView] = useState(() => {
    const savedView = localStorage.getItem("isGridView");
    return savedView ? JSON.parse(savedView) : true; // Default to grid view if nothing is saved
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 9;

  const queryParams: TQueryParams = {
    page: currentPage,
    limit,
    searchTerm,
  };

  // Add stock availability to query parameters
  if (selectedStockAvailability && selectedStockAvailability.length > 0) {
    queryParams.stockAvailability = selectedStockAvailability;
  }

  // Handle categories
  if (selectedCategories.length > 0) {
    queryParams.category = selectedCategories;
  }

  // Handle price range
  if (selectedPriceRange) {
    queryParams.minPrice = selectedPriceRange.min;
    queryParams.maxPrice = selectedPriceRange.max;
  }

  // Add sorting
  if (sortOption === "Price, low to high") {
    queryParams.sort = "price_low_to_high";
  } else if (sortOption === "Price, high to low") {
    queryParams.sort = "price_high_to_low";
  }

  const { data: productData, isLoading } = useGetAllProductsQuery(queryParams);

  const metaData: TMetaData | undefined = productData?.meta;
  // console.log(metaData);

  const totalProducts = metaData?.total ?? 0;
  // console.log(totalProducts);

  // Save the grid/list view state whenever it changes
  useEffect(() => {
    localStorage.setItem("isGridView", JSON.stringify(isGridView));
  }, [isGridView]);

  useEffect(() => {
    // Save the selected sort option to localStorage whenever it changes
    localStorage.setItem("selectedSortOption", sortOption);
  }, [sortOption]);

  // Clear the grid/list view state when the component is unmounted (navigating away)
  useEffect(() => {
    return () => {
      localStorage.removeItem("isGridView");
      localStorage.removeItem("selectedSortOption");
    };
  }, []);

  const handleNextPage = () => {
    if (metaData && metaData?.page < metaData?.totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (metaData && metaData?.page > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="">
      <RightSideUpperContent
        totalProducts={totalProducts}
        setSortOption={setSortOption}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        setSearchTerm={setSearchTerm}
      />
      {/* Check if products are found */}
      {isLoading ? (
        <div className="text-center py-4 font-poppins font-bold text-2xl">
          <div className="text-lg flex items-center justify-center mt-4">
            <Spinner />
          </div>
        </div>
      ) : productData?.data?.length === 0 ? (
        <p className="text-center text-lg text-black mt-10 font-poppins font-bold">
          No Product Found
        </p>
      ) : (
        <div
          className={
            isGridView
              ? "grid gap-5 semi-sm:gap-2 md:gap-5 grid-cols-1 semi-sm:grid-cols-2 lg:grid-cols-3 mt-10"
              : "flex flex-col gap-5 mt-10"
          }
        >
          {isGridView
            ? productData?.data?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            : productData?.data?.map((product) => (
                <ProductCardOptional key={product._id} product={product} />
              ))}
        </div>
      )}
      {metaData && metaData?.totalPage > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            title="previous"
            onClick={handlePreviousPage}
            disabled={metaData.page === 1} // Disable if on first page
            className={`inline-flex items-center justify-center w-8 h-8 py-0 border rounded-full ${
              metaData.page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#7227b4] hover:bg-[#f87f96] text-white"
            } shadow-md dark:bg-gray-900 dark:border-gray-800`}
          >
            <IoArrowBackOutline />
          </button>

          {[...Array(metaData.totalPage).keys()].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`inline-flex items-center justify-center w-8 h-8 text-sm font-poppins font-semibold border rounded-full shadow-md ${
                currentPage === index + 1
                  ? "bg-[#f87f96] text-white"
                  : "bg-[#fff] text-[#f87f96] dark:bg-gray-900 dark:border-violet-400"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            title="next"
            onClick={handleNextPage}
            disabled={metaData.page === metaData.totalPage} // Disable if on last page
            className={`inline-flex items-center justify-center w-8 h-8 py-0 border rounded-full ${
              metaData.page === metaData.totalPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#7227b4] hover:bg-[#f87f96] text-white"
            } shadow-md dark:bg-gray-900 dark:border-gray-800`}
          >
            <IoMdArrowForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default RightSideContent;
