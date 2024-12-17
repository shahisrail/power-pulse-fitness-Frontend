import { useEffect, useState } from "react";
import { CiCircleList, CiFilter, CiGrid41 } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SortOption } from "./Product.constant";
import { debounce } from "lodash";
import { TRightSideUpperContentProps } from "@/types";

const RightSideUpperContent = ({
  totalProducts,
  setSortOption,
  isGridView,
  setIsGridView,
  setSearchTerm,
}: TRightSideUpperContentProps) => {
  const [selectedOption, setSelectedOption] = useState<SortOption>("Featured");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const savedOption = localStorage.getItem(
      "selectedSortOption"
    ) as SortOption;
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, []);

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);
    localStorage.setItem("selectedSortOption", option);
    setDropdownOpen(false);

    // Update sorting in parent component
    setSortOption(option);
  };

  // Debounced search function
  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    debouncedSearch(value); // Call debounced function
  };

  return (
    <div className="">
      <h3 className="text-base font-poppins font-semibold text-[#333333] mb-8">
        Products ({totalProducts})
      </h3>
      <img
        className="rounded-[10px]"
        src="https://i.ibb.co.com/CPGhC1d/collection-banner.webp"
        alt=""
      />

      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-0 lg:justify-between items-center mt-8">
        {/* Left Side - Icons */}
        <div className="flex items-center w-full lg:w-0 justify-between lg:gap-3 ">
          <label
            htmlFor="my-drawer-4"
            className="flex items-center gap-1 lg:hidden cursor-pointer "
          >
            <CiFilter className="text-2xl" />
            <p className="text-[15px] font-poppins font-normal">Filter</p>
          </label>
          <div className="flex items-center gap-3">
            {/* Grid and List view buttons */}
            <CiGrid41
              className={`text-xl ${
                isGridView ? "text-[#f87f96]" : "text-[#333333]"
              }`}
              onClick={() => setIsGridView(true)} // Set grid view
            />
            <CiCircleList
              className={`text-xl ${
                !isGridView ? "text-[#f87f96]" : "text-[#333333]"
              }`}
              onClick={() => setIsGridView(false)} // Set list view
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            className="w-full semi-sm:w-[350px] py-2 border border-gray-300 bg-white rounded-md font-poppins text-base px-5 outline-none"
            placeholder="Search By Product Name"
            name=""
            id=""
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>

        {/* Right Side - Dropdown */}
        <div
          className="relative w-full lg:w-[280px]"
          onMouseEnter={() => setDropdownOpen(true)} // Open on hover
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded cursor-pointer">
            {/* Sort Text */}
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-[#f87f96] font-normal font-poppins">
                Sort by:
              </span>
              <span className="text-[15px] text-[#333333] font-normal font-poppins">
                {selectedOption}
              </span>
            </div>
            {/* Arrow Icon */}
            <MdOutlineKeyboardArrowDown className="text-lg text-[#333333]" />
          </button>

          {/* Dropdown Content */}
          {dropdownOpen && (
            <ul className="absolute top-full mt-1 left-0 bg-[#FFFFFF] z-10 w-full p-3 shadow-xl space-y-2">
              <li onClick={() => handleOptionClick("Featured")}>
                <a className="block text-[#333333] text-[15px] font-poppins font-medium hover:text-[#f87f96] cursor-pointer">
                  Featured
                </a>
              </li>
              <li onClick={() => handleOptionClick("Best selling")}>
                <a className="block text-[#333333] text-[15px] font-poppins font-medium hover:text-[#f87f96] cursor-pointer">
                  Best selling
                </a>
              </li>
              <li onClick={() => handleOptionClick("Alphabetically, A-Z")}>
                <a className="block text-[#333333] text-[15px] font-poppins font-medium hover:text-[#f87f96] cursor-pointer">
                  Alphabetically, A-Z
                </a>
              </li>
              <li onClick={() => handleOptionClick("Alphabetically, Z-A")}>
                <a className="block text-[#333333] text-[15px] font-poppins font-medium hover:text-[#f87f96] cursor-pointer">
                  Alphabetically, Z-A
                </a>
              </li>
              <li onClick={() => handleOptionClick("Price, low to high")}>
                <a className="block text-[#333333] text-[15px] font-poppins font-medium hover:text-[#f87f96] cursor-pointer">
                  Price, low to high
                </a>
              </li>
              <li onClick={() => handleOptionClick("Price, high to low")}>
                <a className="block text-[#333333] text-[15px] font-poppins font-medium hover:text-[#f87f96] cursor-pointer">
                  Price, high to low
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSideUpperContent;
