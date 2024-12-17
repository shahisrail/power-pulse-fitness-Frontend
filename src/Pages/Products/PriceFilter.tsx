import { useEffect, useState } from "react";
import "./Products.css";
import { debounce } from "lodash";
import { TPriceFilterProps } from "@/types";

const PriceFilter = ({
  onPriceRangeChange,
  resetPriceRange,
}: TPriceFilterProps) => {
  const [priceRange, setPriceRange] = useState(() => {
    const savedPriceRange = sessionStorage.getItem("priceRange");
    return savedPriceRange
      ? JSON.parse(savedPriceRange)
      : { min: 0, max: 5000 };
  });

  const debouncedPriceChange = debounce((newPriceRange) => {
    if (onPriceRangeChange) {
      onPriceRangeChange(newPriceRange);
    }
  }, 300); // Adjust the delay as needed

  // Update the price range based on parent reset trigger
  useEffect(() => {
    if (resetPriceRange) {
      setPriceRange({ min: 0, max: 5000 });
      sessionStorage.removeItem("priceRange");
    }
  }, [resetPriceRange]);

  // Save price range to sessionStorage and notify parent component
  useEffect(() => {
    sessionStorage.setItem("priceRange", JSON.stringify(priceRange));
    debouncedPriceChange(priceRange); // Notify parent component
  }, [priceRange]);

  // Clear sessionStorage when navigating away from the page
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("priceRange");
      debouncedPriceChange.cancel(); // Cancel the debounced call on unmount
    };
  }, []);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(parseInt(e.target.value, 10), priceRange.max - 1);
    setPriceRange({ ...priceRange, min: newMin });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(parseInt(e.target.value, 10), priceRange.min + 1);
    setPriceRange({ ...priceRange, max: newMax });
  };

  return (
    <div>
      <div className="slider-container">
        <input
          id="priceRangeMin"
          type="range"
          min="0"
          max="5000"
          value={priceRange.min}
          onChange={handleMinChange}
          className="custom-range slider-thumb thumb-min"
        />
        <input
          id="priceRangeMax"
          type="range"
          min="0"
          max="5000"
          value={priceRange.max}
          onChange={handleMaxChange}
          className="custom-range slider-thumb thumb-max"
        />
        <div className="custom-range-track-active"></div>
      </div>

      <div className="flex justify-between gap-4 mb-5">
        <div>
          <span className="text-xs font-poppins font-normal text-[#333333]">
            From
          </span>
          <div className="flex items-center lg:w-[160px] border border-[#808080] rounded-md px-[10px] py-2">
            <span className="text-[#333333]">$</span>
            <input
              type="number"
              min="0"
              max="5000"
              value={priceRange.min}
              onChange={handleMinChange}
              placeholder="0000"
              className="w-full bg-[#f2f6f6] text-[#6F6F6F] font-poppins text-right outline-none"
            />
          </div>
        </div>

        <div>
          <span className="text-xs font-poppins font-normal text-[#333333]">
            To
          </span>
          <div className="flex items-center lg:w-[160px] border border-[#808080] rounded-md px-[10px] py-2">
            <span className="text-[#333333]">$</span>
            <input
              type="number"
              min="0"
              max="5000"
              value={priceRange.max}
              onChange={handleMaxChange}
              placeholder="5000"
              className="w-full bg-[#f2f6f6] text-[#6F6F6F] font-poppins text-right outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
