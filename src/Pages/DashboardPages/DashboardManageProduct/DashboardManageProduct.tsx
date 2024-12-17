import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useState } from "react";
import ProductTable from "./ProductTable";
import { TMetaData } from "@/types";
import { IoMdArrowForward } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import Spinner from "@/components/Spinner/Spinner";
import { debounce } from "lodash";

const DashboardManageProduct = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const limit = 12;

  const queryParams: any = {
    page: currentPage,
    limit,
    searchTerm,
  };

  const { data: productData, isLoading } = useGetAllProductsQuery(queryParams);
  // console.log(productData);
  const metaData: TMetaData | undefined = productData?.meta;

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // const closeDropdown = () => {
  //   setIsDropdownOpen(false);
  // };

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
    <div className="mt-7 lg:mt-0 md:p-10 font-poppins">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <button
              id="dropdownRadioButton"
              onClick={toggleDropdown}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              Last 30 days
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute">
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                  {[
                    "Last day",
                    "Last 7 days",
                    "Last 30 days",
                    "Last month",
                    "Last year",
                  ].map((label, index) => (
                    <li key={index}>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          id={`filter-radio-example-${index + 1}`}
                          type="radio"
                          name="filter-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`filter-radio-example-${index + 1}`}
                          className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          {label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              value={searchInput}
              onChange={handleSearchChange}
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Product Price
              </th>
              <th scope="col" className="px-6 py-3">
                Product Category
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  <div className="text-lg flex items-center justify-center mt-4">
                    <Spinner /> {/* Display spinner while loading */}
                  </div>
                </td>
              </tr>
            ) : productData?.data?.length ? (
              productData.data.map((product, index) => (
                <ProductTable
                  key={product._id}
                  index={(currentPage - 1) * limit + index}
                  product={product}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  <div className="text-center mt-10 text-lg font-poppins">
                    No product in the Table
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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

export default DashboardManageProduct;
