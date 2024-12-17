import { baseApi } from "../../api/baseApi";

const AddressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (addressInfo) => ({
        url: "/address",
        method: "POST",
        body: addressInfo,
      }),
      invalidatesTags: ["Address"],
    }),
    getUserAddress: builder.query({
      query: (token) => ({
        url: "/address",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, addressInfo }) => ({
        url: `/address/${id}`,
        method: "PUT",

        body: addressInfo,
      }),
      invalidatesTags: ["Address"],
    }),
    removeAddress: builder.mutation({
      query: ({ id }) => ({
        url: `/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetUserAddressQuery,
  useUpdateAddressMutation,
  useRemoveAddressMutation,
} = AddressApi;
