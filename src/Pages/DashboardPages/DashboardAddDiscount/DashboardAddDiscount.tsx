import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { usePatchProductDiscountMutation } from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const DashboardAddDiscount = () => {
  const [patchProductDiscount] = usePatchProductDiscountMutation();
  const token = useAppSelector(useCurrentToken); // Get current user's token
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Applying Discount...");
    const discountData = {
      sku: data.sku,
      percentage: data.percentage,
      duration: data.duration,
      durationUnit: data.durationUnit,
    };
    console.log("Discount Data Is", discountData);
    const res = await patchProductDiscount({ token, discountData }).unwrap();
    // console.log(res);
    toast.success(res.message || "Discount Updated successfully!", {
      id: toastId,
      duration: 3000,
    });
    reset();
  };

  return (
    <div className="flex items-center justify-center mt-28 mb-20 ">
      <div className="border w-full lg:w-1/2 p-2 semi-sm:p-4 rounded-md bg-[#FFFFFF]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="font-poppins font-medium text-lg mb-3">
            Add Discount
          </h5>
          <div className="border p-4">
            <div className="mb-7">
              <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                Product SKU
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                type="text"
                id=""
                {...register("sku", {
                  required: "Product SKU is Required",
                })}
                placeholder="Enter Product SKU"
              />
            </div>
            <div className="mb-7">
              <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                Product Percentage
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                type="number"
                id=""
                {...register("percentage", {
                  required: "Product Percentage is Required",
                })}
                placeholder="Enter Product Percentage"
              />
            </div>
            <div className="mb-7">
              <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                Product Discount Duration
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                type="number"
                id=""
                {...register("duration", {
                  required: "Product Duration is Required",
                })}
                placeholder="Enter Product Discount Duration"
              />
            </div>
            <div className="mb-7">
              <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                Product Duration Unit
              </h2>
              <select
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                id="productDurationUnit"
                {...register("durationUnit", {
                  required: "Product Duration Unit is Required",
                })}
              >
                <option value="">Select Unit</option>
                <option value="Minutes">Minutes</option>
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
              </select>
            </div>
          </div>
          <div className="mt-8 mb-5 flex items-center justify-center">
            <button
              type="submit"
              className="px-5 py-2 bg-[#43B9B2] font-poppins font-medium text-white rounded-md "
            >
              Add Discount
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddDiscount;
