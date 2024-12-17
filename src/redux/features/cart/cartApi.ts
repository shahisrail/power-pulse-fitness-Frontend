import { baseApi } from "../../api/baseApi";

const CartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCart: builder.mutation({
      query: ({ token, data }) => ({
        url: "/addToCart/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    increaseQuantity: builder.mutation({
      query: ({ token, productId }) => ({
        url: "/addToCart/increase-quantity",
        method: "PATCH",
        body: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    decreaseQuantity: builder.mutation({
      query: ({ token, productId }) => ({
        url: "/addToCart/decrease-quantity",
        method: "PATCH",
        body: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    getAllCartByUser: builder.query({
      query: (token) => ({
        url: "/addToCart/user-cart",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Cart"],
    }),
    removeProductFromCart: builder.mutation({
      query: ({ token, productId }) => ({
        url: "/addToCart/remove",
        method: "DELETE",
        body: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useCreateCartMutation,
  useGetAllCartByUserQuery,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
  useRemoveProductFromCartMutation,
} = CartApi;
