import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetSingleProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
import { TImageFile } from "@/types";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const DashboardUpdateProduct = () => {
  // State to hold uploaded images
  const [images, setImages] = useState<TImageFile[]>([]);
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const token = useAppSelector(useCurrentToken);
  // Fetch product data
  const { data: singleProductData, refetch } = useGetSingleProductByIdQuery(
    id!
  );
  const product = singleProductData?.data;
  //   console.log(product);
  const [updateProduct] = useUpdateProductMutation();

  // Set form default values when the product data is fetched
  useEffect(() => {
    if (product) {
      // Set default values for form fields
      reset({
        name: product.name,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        category: product.category,
        sku: product.sku,
        stockQuantity: product.stockQuantity,
        price: product.price,
      });

      // If product has images, set them in the state for display
      if (product.images) {
        const productImages = product.images.map((url: string) => ({
          url, // image URL from product
          file: null, // no file associated for existing images from the DB
        }));
        setImages(productImages);
      }
    }
  }, [product, reset]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []); // Convert FileList to array
    const imageFiles = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file), // Create URL for image preview
      file, // Store actual file
    }));

    setImages((prevImages) => [...prevImages, ...imageFiles]); // Add new images to state
  };

  // Handle removing an image
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages); // Update state by removing the selected image
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating Product...");
    const productData = {
      ...data,
      // images: images.map((image) => image.file),
    };
    console.log(productData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(productData));
    // Append only new images (with actual file objects)
    images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });

    try {
      const res = await updateProduct({
        token,
        formData,
        id,
      }).unwrap();
      // console.log(res);
      toast.success(res.message || "Product Created successfully", {
        id: toastId,
        duration: 3000,
      });
      await refetch();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="mt-7 lg:mt-0 md:p-10">
      <h1 className="font-poppins font-bold text-2xl mb-5">Update Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col lg:flex-row items-start gap-5">
          <div className="border w-full lg:w-1/2 p-2 semi-sm:p-4 rounded-md bg-[#FFFFFF]">
            <h5 className="font-poppins font-medium text-lg mb-3">
              Description
            </h5>
            <div className="border p-4">
              <div className="mb-7">
                <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                  Product Name
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                  type="text"
                  id=""
                  placeholder="Enter Product Name"
                  {...register("name", {
                    required: "Product Name is Required",
                  })}
                />
              </div>
              <div className="mb-7">
                <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                  Product Short Description
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                  type="text"
                  id=""
                  placeholder="Enter Product Short Description"
                  {...register("shortDescription", {
                    required: "Product Short Description is Required",
                  })}
                />
              </div>
              <div className="mb-7">
                <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                  Product Long Description
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                  type="text"
                  id=""
                  placeholder="Enter Product Long Description"
                  {...register("longDescription", {
                    required: "Product Long Description is Required",
                  })}
                />
              </div>
            </div>

            <h5 className="font-poppins font-medium text-lg mt-5 mb-3">
              Categories
            </h5>
            <div className="border p-4">
              <div className="mb-7">
                <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                  Product Category
                </h2>
                <select
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                  id="productCategory"
                  {...register("category", {
                    required: "Product Category is Required",
                  })}
                >
                  <option value="">Select Category</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Weightlifting Bars & Weights">
                    Weightlifting Bars & Weights
                  </option>
                  <option value="Strength Equipments">
                    Strength Equipments
                  </option>
                  <option value="Conditioning">Conditioning</option>
                  <option value="Body Weight & Gymnastics">
                    Body Weight & Gymnastics
                  </option>
                  <option value="Straps Wraps & Support">
                    Straps Wraps & Support
                  </option>
                  <option value="Fitness Accessories">
                    Fitness Accessories
                  </option>
                  <option value="Yoga & Pilates">Yoga & Pilates</option>
                  <option value="Mats & Flooring">Mats & Flooring</option>
                  <option value="Cross Training">Cross Training</option>
                  <option value="Equipment Packages">Equipment Packages</option>
                  <option value="Clearance">Clearance</option>
                  <option value="BARBELLS">BARBELLS</option>
                  <option value="RACKS & CAGES">RACKS & CAGES</option>
                  <option value="BENCHES">BENCHES</option>
                  <option value="FLOORING">FLOORING</option>
                  <option value="New Arrival">New Arrival</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-7 w-full flex flex-col md:flex-row md:items-center gap-3">
                <div className="md:w-1/2">
                  <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                    Product SKU
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                    type="text"
                    id=""
                    placeholder="Enter Product SKU"
                    {...register("sku", {
                      required: "Product SKU is Required",
                    })}
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                    Product Stock Quantity
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                    type="number"
                    id=""
                    placeholder="Enter Product Stock Quantity"
                    {...register("stockQuantity", {
                      required: "Product Stock Quantity is Required",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 rounded-md bg-[#FFFFFF] border p-4">
            {/* Upload Image */}
            <div className="space-y-2 col-span-full lg:col-span-1">
              <div>
                <h2 className=" text-base md:text-xl font-semibold text-black mb-2 lg:mb-4">
                  Upload Product Image <span className="text-red-700">*</span>
                </h2>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#43B9B2] border-dashed rounded-lg cursor-pointer bg-[#ECF8F7] dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-black"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-black font-poppins text-center sem">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-black font-poppins">
                        SVG, PNG, JPG or GIF{" "}
                      </p>
                    </div>
                    <input
                      className="hidden"
                      id="dropzone-file"
                      type="file"
                      name="imageFiles"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={`Uploaded ${index}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h5 className="font-poppins font-medium text-lg mb-3 mt-5">
              Price
            </h5>
            <div className="border p-4">
              <div className="mb-7">
                <h2 className="text-base font-normal text-[#1D1D1F] mb-2 font-poppins">
                  Price
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#e8e8e1] border-[1px] bg-[#f2f6f6] text-[#1D1D1F] font-poppins   focus:outline focus:outline-1 focus:outline-[#1D1D1F]"
                  type="number"
                  id=""
                  placeholder="Enter Product Price"
                  {...register("price", {
                    required: "Product Price is Required",
                  })}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-5 mt-8 mb-5">
              <button
                type="submit"
                className="px-5 py-2 bg-[#43B9B2] font-poppins font-medium text-white rounded-md"
              >
                Update
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#C280D2] font-poppins font-medium text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardUpdateProduct;
