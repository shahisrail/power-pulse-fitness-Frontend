import PriceFilter from "./PriceFilter";
import "./Products.css";
import { useEffect, useState } from "react";
import { TDrawerType, TPriceRange } from "@/types";
import {
  useGetCategoryProductCountQuery,
  useGetProductStockCountQuery,
} from "@/redux/features/product/productApi";

const Drawer = ({
  htmlFor,
  onCategorySelect,
  onPriceRangeSelect,
  initialCategories,
  initialPriceRange,
  onStockAvailabilitySelect,
}: TDrawerType) => {
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [priceRange, setPriceRange] = useState<TPriceRange>(initialPriceRange);
  const [resetPriceRange, setResetPriceRange] = useState(false);
  const [stockAvailability, setStockAvailability] = useState<string[]>([]);
  const { data: categoryProductCount } =
    useGetCategoryProductCountQuery(undefined);

  const { data: productStockCount } =
    useGetProductStockCountQuery<any>(undefined);

  // console.log(productStockCount);

  // Function to calculate stock counts based on selected categories
  const calculateStockCounts = () => {
    let totalInStockCount = 0;
    let totalOutOfStockCount = 0;

    if (categoryProductCount?.data) {
      categoryProductCount.data.forEach(
        ({ category, inStockCount, outOfStockCount }) => {
          if (selectedCategories.includes(category)) {
            totalInStockCount += inStockCount;
            totalOutOfStockCount += outOfStockCount;
          }
        }
      );
    }

    return { totalInStockCount, totalOutOfStockCount };
  };

  // If categories are selected, use calculated stock counts, else use default productStockCount
  const { totalInStockCount, totalOutOfStockCount } =
    selectedCategories.length > 0
      ? calculateStockCounts()
      : {
          totalInStockCount: productStockCount?.data?.totalInStockCount ?? 0,
          totalOutOfStockCount:
            productStockCount?.data?.totalOutOfStockCount ?? 0,
        };

  useEffect(() => {
    setSelectedCategories(initialCategories);
    setPriceRange(initialPriceRange);
  }, [initialCategories, initialPriceRange]);

  const handleCategoryClick = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onCategorySelect(updatedCategories); // Notify parent component about category change
  };

  const handlePriceRangeChange = (range: TPriceRange) => {
    setPriceRange(range);
    onPriceRangeSelect(range); // Notify parent component about price range change
  };

  const handleReset = () => {
    setResetPriceRange(true); // Trigger reset in PriceFilter
    setTimeout(() => setResetPriceRange(false), 0); // Reset the flag after clearing
  };

  const handleStockAvailabilityChange = (availability: string) => {
    const updatedAvailability = stockAvailability.includes(availability)
      ? stockAvailability.filter((a) => a !== availability)
      : [...stockAvailability, availability];

    setStockAvailability(updatedAvailability);
    onStockAvailabilitySelect(updatedAvailability); // Notify parent component
  };

  // Function to reset stock availability
  const handleResetStockAvailability = () => {
    setStockAvailability([]); // Reset stock availability to an empty array
    onStockAvailabilitySelect([]); // Notify parent component that filter is reset
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 5000 });
    setStockAvailability([]);
    setResetPriceRange(true); // Trigger price reset
    onCategorySelect([]);
    onPriceRangeSelect({ min: 0, max: 5000 }); // Notify parent
    onStockAvailabilitySelect([]);

    setTimeout(() => setResetPriceRange(false), 0); // Reset flag after clearing
  };

  // Calculate the number of selected availability options
  const selectedCount = stockAvailability.length;
  const activeFilters = [];

  if (priceRange.min > 0 || priceRange.max < 5000) {
    activeFilters.push({
      label: `$${priceRange.min} - $${priceRange.max}`,
      onRemove: () => handleReset(),
    });
  }

  if (selectedCategories.length > 0) {
    selectedCategories.forEach((category) => {
      activeFilters.push({
        label: category,
        onRemove: () => handleCategoryClick(category),
      });
    });
  }

  if (stockAvailability.length > 0) {
    stockAvailability.forEach((availability) => {
      activeFilters.push({
        label: availability,
        onRemove: () => handleStockAvailabilityChange(availability),
      });
    });
  }

  return (
    <div className="drawer drawer-end top-0 z-50 lg:hidden">
      {/* Sidebar Drawer */}
      <input id={htmlFor} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* You can put other content here if needed */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay"
          aria-label="close sidebar"
        ></label>
        <ul className="p-4 w-72 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <div className="border-b-[1px] border-b-[#808080]">
            <h3 className="text-base font-poppins font-semibold text-[#333333] mb-8">
              Categories
            </h3>
            {categoryProductCount?.data?.map(
              ({ category, totalProducts }, index) => (
                <div className="checkbox-container mb-3" key={index}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="hidden-checkbox"
                      checked={selectedCategories.includes(category)} // Handle multiple selection
                      onChange={() => handleCategoryClick(category)} // Update on change
                    />
                    <div className="checkbox-content">
                      <span className="checkbox-box">
                        <svg
                          className="checkmark"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <p className="checkbox-text">{category}</p>
                    </div>
                    <p className="checkbox-count">({totalProducts})</p>
                  </label>
                </div>
              )
            )}
          </div>
          <div className="border-b-[1px] border-b-[#808080]">
            <h3 className="text-base font-poppins mt-5 font-semibold text-[#333333] mb-5">
              Filter
            </h3>
            {/* <p className="text-[15px] font-poppins font-normal text-[#33333] mb-8">
          15 Products
        </p> */}
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.length > 0 && (
                <div className="active-filters-container">
                  {activeFilters.map((filter, index) => (
                    <div className="filter-button font-poppins" key={index}>
                      {filter.label}
                      <button
                        onClick={filter.onRemove}
                        className="remove-button"
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {activeFilters.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="clear-all-button font-poppins active-filters-container"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
          <div className="border-b-[1px] border-b-[#808080]">
            <h3 className="text-base font-poppins mt-5 font-semibold text-[#333333] mb-8">
              Availability
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-poppins font-normal text-[#33333] mb-8">
                {selectedCount} selected
              </p>
              <p
                onClick={handleResetStockAvailability}
                className="text-[15px] font-poppins font-normal text-[#33333] mb-8 border-b-[1px] border-b-black"
              >
                Reset
              </p>
            </div>
            <div className="checkbox-container mb-5">
              <label className="checkbox-label">
                <input
                  checked={stockAvailability.includes("In Stock")}
                  onChange={() => handleStockAvailabilityChange("In Stock")}
                  type="checkbox"
                  className="hidden-checkbox"
                />
                <div className="checkbox-content">
                  <span className="checkbox-box">
                    <svg
                      className="checkmark"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <p className="checkbox-text">In Stock</p>
                </div>
                <p className="checkbox-count">({totalInStockCount})</p>
              </label>
            </div>
            <div className="checkbox-container mb-5">
              <label className="checkbox-label">
                <input
                  checked={stockAvailability.includes("Out of Stock")}
                  onChange={() => handleStockAvailabilityChange("Out of Stock")}
                  type="checkbox"
                  className="hidden-checkbox"
                />
                <div className="checkbox-content">
                  <span className="checkbox-box">
                    <svg
                      className="checkmark"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <p className="checkbox-text">Out Of Stock</p>
                </div>
                <p className="checkbox-count">({totalOutOfStockCount})</p>
              </label>
            </div>
          </div>
          <div className="border-b-[1px] border-b-[#808080]">
            <h3 className="text-base font-poppins mt-5 font-semibold text-[#333333] mb-8">
              Availability
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-poppins font-normal text-[#33333] mb-8">
                The highest price is $5000.00
              </p>
              <p
                onClick={handleReset}
                className="text-[15px] font-poppins font-normal text-[#33333] mb-8 border-b-[1px] border-b-black"
              >
                Reset
              </p>
            </div>
            <PriceFilter
              resetPriceRange={resetPriceRange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>
          <div className="mt-8">
            <img
              className="rounded-lg"
              src="https://i.ibb.co.com/gFpqJrs/Red-Modern-Masculine-Fitness-Class-Discount-Instagram-Post.png"
              alt=""
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
