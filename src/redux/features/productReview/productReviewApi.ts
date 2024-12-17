import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TReviewData } from "@/types/ReviewData.types";

const ProductReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProductReview: builder.mutation({
      query: (reviewInfo) => ({
        url: "/review",
        method: "POST",
        body: reviewInfo,
      }),
      invalidatesTags: ["Review"],
    }),
    getAllProductReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // Loop through args and append them to params
        Object.keys(args).forEach((key) => {
          if (Array.isArray(args[key])) {
            // Handle array for multiple values, if necessary (e.g., for statuses)
            args[key].forEach((value: string) => {
              params.append(key, value);
            });
          } else if (args[key]) {
            // Append normal key-value pairs
            params.append(key, args[key]);
          }
        });

        return {
          url: "/review",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TReviewData[]>) => {
        // console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Review"],
    }),
    getAcceptedProductReviewsByProductId: builder.query({
      query: ({ productId }) => ({
        url: `/review/accepted?productId=${productId}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    getPendingProductReviewsByProductId: builder.query({
      query: ({ productId }) => ({
        url: `/review/pending?productId=${productId}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    updateReviewStatus: builder.mutation({
      query: ({ reviewId, status, token }) => ({
        url: "/review/status",
        method: "PATCH",
        body: { reviewId, status },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Review"],
    }),
    removePendingProductReviewByProductId: builder.mutation({
      query: ({ productId, token }) => ({
        url: `/review/pending?productId=${productId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Review"],
    }),
    removeProductReview: builder.mutation({
      query: ({ id, token }) => ({
        url: `/review/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateProductReviewMutation,
  useGetAllProductReviewsQuery,
  useGetAcceptedProductReviewsByProductIdQuery,
  useGetPendingProductReviewsByProductIdQuery,
  useRemovePendingProductReviewByProductIdMutation,
  useUpdateReviewStatusMutation,
  useRemoveProductReviewMutation,
} = ProductReviewApi;
