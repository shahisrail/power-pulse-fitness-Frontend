import {
  BangladeshDivisions,
  IndiaStates,
} from "@/Pages/Checkout/CheckoutPage/Checkout.constant";
import {
  useRemoveAddressMutation,
  useUpdateAddressMutation,
} from "@/redux/features/address/addressApi";
import {
  clearDefaultAddress,
  updateDefaultAddress,
} from "@/redux/features/address/addressSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TUserPayload } from "@/types";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import Swal from "sweetalert2";

const AddressDetails = ({ address, refetch }: any) => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const userId = user?.id as string;
  const [editAddress, setEditAddress] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    address?.countryName || ""
  );
  const [selectedDivision, setSelectedDivision] = useState(address?.town || "");
  const [removeAddress] = useRemoveAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  // Initialize useForm with defaultValues option
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: address?.firstName || "",
      lastName: address?.lastName || "",
      companyName: address?.companyName || "",
      countryName: address?.countryName || "",
      streetAddress: address?.streetAddress || "",
      apartment: address?.apartment || "",
      town: address?.town || "",
      postCode: address?.postCode || "",
      phone: address?.phone || "",
      isDefault: address?.isDefault || false,
    },
  });

  // Reset form values when address changes
  useEffect(() => {
    if (address) {
      reset({
        firstName: address?.firstName || "",
        lastName: address?.lastName || "",
        companyName: address?.companyName || "",
        countryName: address?.countryName || "",
        streetAddress: address?.streetAddress || "",
        apartment: address?.apartment || "",
        town: address?.town || "",
        postCode: address?.postCode || "",
        phone: address?.phone || "",
      });
    }
  }, [address, reset]);

  // List of Bangladesh divisions
  const bangladeshDivisions: BangladeshDivisions[] = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Barishal",
    "Rajshahi",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ];

  // List of Indian states
  const indiaStates: IndiaStates[] = [
    "AndhraPradesh",
    "ArunachalPradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "HimachalPradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "MadhyaPradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "TamilNadu",
    "Telangana",
    "Tripura",
    "UttarPradesh",
    "Uttarakhand",
    "WestBengal",
  ];

  // Handle country selection and display corresponding divisions
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  // Get divisions based on the selected country
  const getDivisions = (): (BangladeshDivisions | IndiaStates)[] => {
    if (selectedCountry === "Bangladesh") {
      return bangladeshDivisions;
    } else if (selectedCountry === "India") {
      return indiaStates;
    } else {
      return [];
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating Address...");
    // console.log(data);
    const isDefaultChecked = data.isDefault || false;
    try {
      const res = await updateAddress({
        id: address?._id,
        addressInfo: data,
        ...(isDefaultChecked && { isDefault: true }),
      }).unwrap();
      // console.log(res);
      toast.success(res.message || "Default Address updated successfully!", {
        id: toastId,
        duration: 3000,
      });

      if (res?.data) {
        dispatch(updateDefaultAddress(res.data));
      }

      reset({
        isDefault: false,
      });

      await refetch();
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  const handleRemoveAddress = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Address!",
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeAddress({
            id: address?._id,
          }).unwrap();
          refetch();
          // Check if the address being removed is the current default address
          if (address?.isDefault) {
            // Dispatch action to clear the default address for the user
            dispatch(clearDefaultAddress(userId));
          }
          Swal.fire({
            title: "Removed!",
            text: "Your Deafult Address has been removed .",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove default address:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove default address.",
            icon: "error",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="flex items-start flex-col md:flex-row justify-between w-full mb-5 gap-5 lg:gap-0  border border-[#C6C6C6] p-7 rounded-lg">
        <div className="">
          <p className="font-poppins text-base mt-1 text-black font-semibold group-hover:text-[#f87f96]">
            {address?.firstName} {address?.lastName}{" "}
            {address?.isDefault == true ? "(Default)" : ""}
          </p>
          <p className="font-poppins text-base mt-1 text-[#828282] group-hover:text-[#f87f96]">
            {address?.companyName}
          </p>
          <p className="font-poppins text-base mt-1 text-[#828282] group-hover:text-[#f87f96]">
            {address?.countryName}
          </p>
          <p className="font-poppins text-base mt-1 text-[#828282] group-hover:text-[#f87f96]">
            {address?.streetAddress}
          </p>
          <p className="font-poppins text-base mt-1 text-[#828282] group-hover:text-[#f87f96]">
            {address?.apartment}
          </p>
          <p className="font-poppins text-base mt-1 text-[#828282] group-hover:text-[#f87f96]">
            {address?.town}
          </p>
          <p className="font-poppins text-base mt-1 text-[#828282] group-hover:text-[#f87f96]">
            {address?.postCode}
          </p>
          <p className="font-poppins text-base mt-1 text-[#828282] group-hover:text-[#f87f96]">
            {address?.phone}
          </p>
        </div>
        <div className="border p-3 border-[#C6C6C6] font-poppins">
          <button
            onClick={() => setEditAddress(!editAddress)}
            className="border-r-[1px] border-r-black pr-2 hover:text-[#f87f96]"
          >
            Edit
          </button>
          <button
            onClick={handleRemoveAddress}
            className="pl-2 hover:text-[#f87f96]"
          >
            Delete
          </button>
        </div>
      </div>
      <div
        className={`${
          editAddress ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all`}
        style={{
          transitionDuration: "2s",
          transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <div>
          <p className="font-poppins text-base mt-2 text-black font-semibold mb-5">
            Update new address
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-10 mb-6">
              <div className="flex-1">
                <h2 className="font-poppins text-sm font-semibold text-[#2C2C2C] uppercase">
                  First Name{" "}
                  <span className="text-red-700 font-poppins font-bold">*</span>
                </h2>
                <div className="pt-1">
                  <input
                    className="w-full border-b py-3 font-poppins border-b-[#C6C6C6] bg-[#f2f6f6] outline-none text-sm"
                    type="text"
                    id=""
                    {...register("firstName")}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-poppins text-sm font-semibold text-[#2C2C2C] uppercase">
                  Last Name{" "}
                  <span className="text-red-700 font-poppins font-bold">*</span>
                </h2>
                <div className="pt-1">
                  <input
                    className="w-full border-b py-3 font-poppins border-b-[#C6C6C6] bg-[#f2f6f6] outline-none text-sm"
                    type="text"
                    {...register("lastName")}
                    id=""
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="font-poppins text-sm font-semibold text-[#2C2C2C] uppercase">
                Company Name (Optional)
              </h2>
              <div className="pt-1">
                <input
                  className="w-full border-b py-3 font-poppins border-b-[#C6C6C6] bg-[#f2f6f6] outline-none text-sm"
                  type="text"
                  {...register("companyName")}
                  id=""
                />
              </div>
            </div>
            <div className="mb-6">
              <h2 className="font-poppins text-sm font-semibold text-[#2C2C2C] uppercase pb-2">
                Country / Region{" "}
                <span className="text-red-700 font-poppins font-bold">*</span>
              </h2>
              <select
                className="w-full border-b py-3 font-poppins border-b-[#C6C6C6] bg-[#f2f6f6] outline-none text-sm"
                value={selectedCountry}
                id="country"
                {...register("countryName", {
                  onChange: (e) => handleCountryChange(e),
                })}
              >
                <option value="">---</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
              </select>
            </div>

            <div className="mb-6">
              <h2 className="font-poppins text-sm font-semibold text-[#2C2C2C] uppercase">
                Street address{" "}
                <span className="text-red-700 font-poppins font-bold">*</span>
              </h2>
              <div className="pt-1">
                <input
                  className="w-full border-b py-3 font-poppins border-b-[#C6C6C6] bg-[#f2f6f6] outline-none text-sm"
                  type="text"
                  {...register("streetAddress")}
                  id=""
                  placeholder="House Number and Street Name"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="pt-1">
                <input
                  className="w-full border-b py-3 font-poppins border-b-[#C6C6C6] bg-[#f2f6f6] outline-none text-sm"
                  type="text"
                  id=""
                  placeholder="Apartment,suite,unit etc.(Optional)"
                  {...register("apartment")}
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-poppins text-sm font-semibold text-[#2C2C2C] uppercase">
                Town / City{" "}
                <span className="text-red-700 font-poppins font-bold">*</span>
              </h2>
              <div className="pt-1">
                <select
                  className="w-full border-b py-3 font-poppins border-b-[#C6C6C6] bg-[#f2f6f6] outline-none text-sm"
                  value={selectedDivision}
                  {...register("town", {
                    onChange: (e) => setSelectedDivision(e.target.value),
                  })}
                >
                  <option value="">---</option>
                  {getDivisions().map((division, index) => (
                    <option key={index} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="font-poppins text-sm font-semibold text-[#2C2C2C] uppercase">
                Postcode{" "}
                <span className="text-red-700 font-poppins font-bold">*</span>
              </h2>
              <div className="pt-1">
                <input
                  className="w-full border-b py-3 font-poppins border-b-[#C6C6C6] bg-[#f2f6f6] outline-none text-sm"
                  type="text"
                  {...register("postCode")}
                  id=""
                />
              </div>
            </div>
            <div className="mb-6">
              <h2 className="font-poppins text-sm font-semibold text-[#2C2C2C] uppercase">
                Phone{" "}
                <span className="text-red-700 font-poppins font-bold">*</span>
              </h2>
              <div className="pt-1">
                <input
                  className="w-full border-b py-3 font-poppins border-b-[#C6C6C6] bg-[#f2f6f6] outline-none text-sm"
                  type="text"
                  {...register("phone")}
                  id=""
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="address-custom-checkbox-container">
                <input
                  type="checkbox"
                  {...register("isDefault")}
                  className="hidden"
                />
                <span className="address-custom-checkbox"></span>
              </label>
              <p className="font-poppins font-medium">
                Update As Default Address
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-5 mt-8 mb-5">
              <button
                type="submit"
                className="px-5 py-2 bg-[#43B9B2] font-poppins font-medium text-white rounded-md"
              >
                Update
              </button>
              <button
                type="button"
                className={`px-5 py-2 bg-[#C280D2] font-poppins font-medium text-white rounded-md transition-all`}
                style={{
                  transitionDuration: "2s",
                  transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                onClick={() => setEditAddress(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
