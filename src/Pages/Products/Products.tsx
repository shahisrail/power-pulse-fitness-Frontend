import ProductBanner from "./ProductBanner";
import "./Products.css";
import Drawer from "./Drawer";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";
import { useEffect, useState } from "react";
import { TPriceRange } from "@/types";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    // Load saved categories from localStorage or set to an empty array
    return JSON.parse(localStorage.getItem("selectedCategories") || "[]");
  });
  const [selectedStockAvailability, setSelectedStockAvailability] = useState<
    string[]
  >([]);

  const handleStockAvailabilitySelect = (availability: string[]) => {
    setSelectedStockAvailability(availability);
    localStorage.setItem(
      "selectedStockAvailability",
      JSON.stringify(availability)
    );
  };

  const [selectedPriceRange, setSelectedPriceRange] = useState<TPriceRange>(
    () => {
      // Load saved price range from localStorage or set to default range
      return JSON.parse(
        localStorage.getItem("selectedPriceRange") || '{"min": 0, "max": 5000}'
      );
    }
  );

  // Handle category selection and save to localStorage
  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    localStorage.setItem("selectedCategories", JSON.stringify(categories)); // Save categories to localStorage
  };

  // Handle price range selection and save to localStorage
  const handlePriceRangeSelect = (range: TPriceRange) => {
    setSelectedPriceRange(range);
    localStorage.setItem("selectedPriceRange", JSON.stringify(range)); // Save price range to localStorage
  };

  // Clear filters on navigation away
  useEffect(() => {
    return () => {
      localStorage.removeItem("selectedCategories");
      localStorage.removeItem("selectedPriceRange");
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>PowerPulse Fitness | Products</title>
      </Helmet>
      <ProductBanner />
      <div className="container mx-auto mb-28">
        <div className="flex items-start gap-10 w-full">
          <LeftSideContent
            onPriceRangeSelect={handlePriceRangeSelect}
            onCategorySelect={handleCategorySelect}
            onStockAvailabilitySelect={handleStockAvailabilitySelect}
            initialCategories={selectedCategories}
            initialPriceRange={selectedPriceRange}
          />
          <RightSideContent
            selectedPriceRange={selectedPriceRange}
            selectedCategories={selectedCategories}
            selectedStockAvailability={selectedStockAvailability}
          />
        </div>
      </div>
      <Drawer
        onPriceRangeSelect={handlePriceRangeSelect}
        onCategorySelect={handleCategorySelect}
        onStockAvailabilitySelect={handleStockAvailabilitySelect}
        initialCategories={selectedCategories}
        initialPriceRange={selectedPriceRange}
        htmlFor="my-drawer-4"
      />
    </div>
  );
};

export default Products;
