import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl:
    "https://power-pulse-fitness-equipment-and-accessories-backend.vercel.app/api",
    // "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (arg, api, extraOptions): Promise<any> => {
  let result = await baseQuery(arg, api, extraOptions);
  // console.log(result);
  if (result.error?.status === 401) {
    // sending refresh token
    console.log("Send refresh token");
    const res = await fetch(
      "https://power-pulse-fitness-equipment-and-accessories-backend.vercel.app/api/auth/refresh-token",
      // "http://localhost:5000/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();
    // console.log(data);

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(arg, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "Auth",
    "Wishlist",
    "Cart",
    "Products",
    "ProductById",
    "ProductsByCategory",
    "ProductByIdInCategory",
    "Checkout",
    "Review",
    "Address",
  ],
  endpoints: () => ({}),
});
