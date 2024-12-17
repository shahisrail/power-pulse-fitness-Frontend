import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
import ErrorElement from "@/Layout/ErrorElement/ErrorElement";
import MainLayout from "@/Layout/MainLayout/MainLayout";
import CategoryProducts from "@/Pages/CategoryProduct/CategoryProducts";
import ForgotPassword from "@/Pages/ForgotPassword/ForgotPassword";
import Account from "@/Pages/HomePages/Account/Account";
import Home from "@/Pages/HomePages/Home/Home";
import Login from "@/Pages/Login/Login";
import MyWishlist from "@/Pages/MyWishlist/MyWishlist";
import Products from "@/Pages/Products/Products";
import SingleCategoryProduct from "@/Pages/Products/SingleCategoryProduct";
import SingleProduct from "@/Pages/Products/SingleProduct";
import Register from "@/Pages/Register/Register";
import ResetPassword from "@/Pages/ResetPassword/ResetPassword";
import { createBrowserRouter } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoute";

import DashboardAddProduct from "@/Pages/DashboardPages/DashboardAddProduct/DashboardAddProduct";
import DashboardManageProduct from "@/Pages/DashboardPages/DashboardManageProduct/DashboardManageProduct";
import DashboardAdminProfile from "@/Pages/DashboardPages/DashboardHome/DashboardAdminProfile";
import DashboardUpdateProduct from "@/Pages/DashboardPages/DashboardUpdateProduct/DashboardUpdateProduct";
import Mycart from "@/Pages/MyCart/Mycart";
import CheckoutPage from "@/Pages/Checkout/CheckoutPage/CheckoutPage";
import OrderSummery from "@/Pages/OrderSummery/OrderSummery";
import DashboardAddDiscount from "@/Pages/DashboardPages/DashboardAddDiscount/DashboardAddDiscount";
import ManageDiscount from "@/Pages/DashboardPages/ManageDiscount/ManageDiscount";
import AboutUs from "@/Pages/AboutUs/AboutUs";
import DashboardOrderSummery from "@/Pages/DashboardPages/DashboardOrderSummer/DashboardOrderSummery";
import DashboardManageReviews from "@/Pages/DashboardPages/DashboardManageReviews/DashboardManageReviews";
import Payment from "@/components/Payment/Payment";
import Addresses from "@/components/Addresses/Addresses";
import ChangePassword from "@/Pages/ChangePassword/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
      },
      {
        path: "/products/category/:category",
        element: <CategoryProducts />,
      },
      {
        path: "/products/:category/:id",
        element: <SingleCategoryProduct />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/my-wishlist",
        element: <MyWishlist />,
      },
      {
        path: "/cart",
        element: <Mycart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/account/addresses",
        element: <Addresses />,
      },
      {
        path: "/login/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/login/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/account/change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    errorElement: <ErrorElement />,
    element: (
      <AdminProtectedRoute>
        <DashboardLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "adminProfile",
        element: <DashboardAdminProfile />,
      },
      {
        path: "addProduct",
        element: <DashboardAddProduct />,
      },
      {
        path: "manageProduct",
        element: <DashboardManageProduct />,
      },
      {
        path: "manageProduct/updateProduct/:id",
        element: <DashboardUpdateProduct />,
      },
      {
        path: "addDiscount",
        element: <DashboardAddDiscount />,
      },
      {
        path: "manageDiscount",
        element: <ManageDiscount />,
      },
      {
        path: "manageReviews",
        element: <DashboardManageReviews />,
      },
      {
        path: "orderSummery",
        element: <DashboardOrderSummery />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/checkout/order-received/:id",
    element: <OrderSummery />,
  },
]);

export default router;
