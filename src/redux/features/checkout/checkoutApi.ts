import { TCheckoutData } from "@/types/checkoutData.types";
import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "@/types";

const CheckoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckout: builder.mutation({
      query: (checkoutData) => ({
        url: "/checkout/",
        method: "POST",
        body: checkoutData,
      }),
      invalidatesTags: ["Checkout"],
    }),
    getSingleOrder: builder.query({
      query: (id: string) => ({
        url: `/checkout/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Checkout", id }],
    }),
    getAllOrders: builder.query({
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
          url: "/checkout",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TCheckoutData[]>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Checkout"],
    }),
    getUserOrderItems: builder.query({
      query: (token) => ({
        url: "/checkout/user-order",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Checkout"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/checkout/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Checkout"],
    }),
    removeOrder: builder.mutation({
      query: ({ token, id }) => ({
        url: `/checkout/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Checkout"],
    }),
    createPaymentIntent: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/create-intent",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Checkout"],
    }),
  }),
});

export const {
  useCreateCheckoutMutation,
  useGetSingleOrderQuery,
  useGetAllOrdersQuery,
  useGetUserOrderItemsQuery,
  useUpdateOrderStatusMutation,
  useRemoveOrderMutation,
  useCreatePaymentIntentMutation,
} = CheckoutApi;
