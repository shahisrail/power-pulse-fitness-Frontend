import { TProductData } from "./productData.type";

export type TAddToCartProduct = {
  productId: TProductData | null;
  quantity: number;
  _id: string;
};

export type TUserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  fullName: string;
};

export type TCheckoutData = {
  _id: string;
  addToCartProduct: TAddToCartProduct[];
  userId: TUserData;
  firstName: string;
  lastName: string;
  companyName: string;
  countryName: string;
  streetAddress: string;
  apartment: string;
  town: string;
  postCode: number;
  phone: number;
  email: string;
  orderNote: string;
  subTotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: "Pending" | "Shipped" | "Delivered";
  deliveryProcess: string;
  orderNumber: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CheckoutFormProps = {
  checkoutDataItem: TCheckoutData;
};
