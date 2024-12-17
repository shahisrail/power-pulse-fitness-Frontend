import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TProductData } from "@/types/productData.type";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({ token, formData }) => ({
        url: "/products",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // Loop through args and append them to params
        Object.keys(args).forEach((key) => {
          if (Array.isArray(args[key])) {
            // Handle array for categories (or other multiple values)
            args[key].forEach((value: string) => {
              params.append(key, value);
            });
          } else if (args[key]) {
            // Append normal key-value pairs
            params.append(key, args[key]);
          }
        });

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProductData[]>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Products"],
    }),
    getSingleProductById: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "ProductById", id }],
    }),
    getProductsByCategory: builder.query({
      query: (category: string) => ({
        url: `/products/category/${category}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProductData[]>) => {
        console.log("Single Category All Data", response);
        return {
          data: response.data,
        };
      },
      providesTags: (category) => [{ type: "ProductsByCategory", category }],
    }),
    getProductByIdInCategory: builder.query({
      query: ({ category, id }: { category: string; id: string }) => ({
        url: `/products/${category}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProductData[]>) => {
        console.log("Single Category Product Data", response);
        return {
          data: response.data,
        };
      },
      providesTags: (_result, _error, { category, id }) => [
        { type: "Products", id: id }, // For specific product
        { type: "ProductsByCategory", category }, // For the entire category
      ],
    }),
    getCategoryProductCount: builder.query({
      query: () => ({
        url: "/products/category-count",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProductData[]>) => {
        console.log("Category Product Count", response);
        return {
          data: response.data,
        };
      },
      providesTags: ["Products"],
    }),
    getProductStockCount: builder.query({
      query: () => ({
        url: "/products/stock-count",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProductData[]>) => {
        console.log("Product Stock Count", response);
        return {
          data: response.data,
        };
      },
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ token, id, formData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    removeProduct: builder.mutation({
      query: ({ token, id }) => ({
        url: `/products/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    patchProductDiscount: builder.mutation({
      query: ({ token, discountData }) => ({
        url: "/products/discount",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: discountData,
      }),
      invalidatesTags: ["Products"],
    }),
    getAllDiscount: builder.query({
      query: () => ({
        url: "/products/discounts",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProductData[]>) => {
        console.log("Single Discount Data", response);
        return {
          data: response.data,
        };
      },
      providesTags: ["Products"],
    }),
    addAdvertiseDiscountProduct: builder.mutation({
      query: ({ token, id }) => ({
        url: `/products/advertise/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    removeAdvertiseDiscountProduct: builder.mutation({
      query: ({ token, id }) => ({
        url: `/products/remove-advertise/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    removeDiscount: builder.mutation({
      query: ({ token, id }) => ({
        url: `/products/remove-discount/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    getAllAdvertiseProduct: builder.query({
      query: () => ({
        url: "/products/advertise",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdInCategoryQuery,
  useGetCategoryProductCountQuery,
  useGetProductStockCountQuery,
  useUpdateProductMutation,
  useRemoveProductMutation,
  usePatchProductDiscountMutation,
  useGetAllDiscountQuery,
  useAddAdvertiseDiscountProductMutation,
  useRemoveAdvertiseDiscountProductMutation,
  useRemoveDiscountMutation,
  useGetAllAdvertiseProductQuery,
} = productApi;
