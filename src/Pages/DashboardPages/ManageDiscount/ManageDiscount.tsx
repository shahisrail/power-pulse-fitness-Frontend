import { useGetAllDiscountQuery } from "@/redux/features/product/productApi";
import { useState } from "react";
import DiscountDataTable from "./DiscountDataTable";
import Spinner from "@/components/Spinner/Spinner";

const ManageDiscount = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    data: discountData,
    refetch,
    isLoading,
  } = useGetAllDiscountQuery(undefined);
  // console.log(discountData);

  // Count the total number of advertised discounts across all products
  const advertisedCount =
    discountData?.data?.filter((product) => product.advertise === true)
      .length || 0;

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // const closeDropdown = () => {
  //   setIsDropdownOpen(false);
  // };

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
                Regular Price
              </th>
              <th scope="col" className="px-6 py-3">
                Discount Price
              </th>
              <th scope="col" className="px-6 py-3">
                Discount Percentage
              </th>
              <th scope="col" className="px-6 py-3">
                Discount Duration
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={10} className="text-center py-6  mx-auto">
                  <div className="text-lg flex items-center justify-center mt-4 ">
                    <Spinner /> {/* Display spinner while loading */}
                  </div>
                </td>
              </tr>
            ) : discountData?.data?.length ? (
              discountData?.data?.map((product, index) => (
                <DiscountDataTable
                  key={product._id}
                  index={index}
                  product={product}
                  advertisedCount={advertisedCount}
                  refetch={refetch}
                />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-6">
                  <div className="text-center mt-10 text-lg font-poppins">
                    No Discount product in the Table
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDiscount;
