import { SortOption } from "@/Pages/Products/Product.constant";
import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TAddToCartProduct } from "./checkoutData.types";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TMetaData = {
  page: number;
  total: number;
  totalPage: number;
};

export type TPriceRange = {
  min: number;
  max: number;
};

export type TRightSideContentProps = {
  selectedCategories: string[];
  selectedPriceRange?: TPriceRange;
  selectedStockAvailability?: string[];
};

export type TLeftSideContentProps = {
  onCategorySelect: (categories: string[]) => void;
  onPriceRangeSelect: (range: TPriceRange) => void;
  initialCategories?: string[];
  initialPriceRange: TPriceRange;
  onStockAvailabilitySelect: (availability: string[]) => void;
};

export type TPriceFilterProps = {
  onPriceRangeChange?: (range: TPriceRange) => void;
  resetPriceRange?: boolean;
};

export type TRightSideUpperContentProps = {
  totalProducts: number;
  setSortOption: (option: SortOption) => void;
  isGridView: boolean;
  setIsGridView: (view: boolean) => void;
  setSearchTerm: (term: string) => void;
};

export type TQueryParams = {
  page: number;
  limit: number;
  searchTerm?: string;
  stockAvailability?: string[];
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
};

export type TProduct = {
  _id: string;
  name: string;
  price: number;
  sku: string;
  images: string[];
  shortDescription?: string;
  stockQuantity: number;
  discountPercentage?: number;
  discountPrice?: number;
};

export type TProductCardProps = {
  product: TProduct;
};

export type TCategoryProduct = {
  _id: string;
  name: string;
  price: number;
  sku: string;
  images: string[];
  category: string;
  shortDescription?: string;
  stockQuantity: number;
};

export type TCategoryProductCardProps = {
  product: TCategoryProduct;
};

export type TAccordionDemoProps = {
  longDescription: string;
  name: string;
  id: string;
};

export type TEyeModalProps = {
  images: string[];
  name: string;
  price: number;
  sku: string;
  modalId: string;
  id: string;
  stockQuantity: number;
};

// Define an interface for the user
export type TUser = {
  email: string;
  fullName: string;
  role: string;
  iat: number; // Issued at time (Unix timestamp)
  exp: number; // Expiration time (Unix timestamp)
};

export type TFeaturedProduct = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  sku: string;
  discountPercentage: number;
  discountPrice: number;
  stockQuantity: number;
};

export type TFeaturedProductCardProps = {
  product: TFeaturedProduct;
};

// My Cart page types
export type TMyCartProduct = {
  _id: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  images: string[];
};

export type TCartItem = {
  _id: string;
  productId: TMyCartProduct;
  quantity: number;
};

export type TQuantityItem = {
  id: string | number; // Adjust to the correct type of your product ID
  quantity: number;
};

export type MyCartTableProps = {
  item: TCartItem;
  quantities: TQuantityItem[];
  index: number;
  decrement: (product: TMyCartProduct) => void;
  increment: (product: TMyCartProduct) => void;
  setQuantity: (productId: string | number, quantity: number) => void;
  removeProduct: (product: TMyCartProduct) => void;
};

// Dashboard Order Summery

export type TProductDetails = {
  _id: string;
  name: string;
  price: number;
  sku: string;
  stockQuantity: number;
  shortDescription: string;
  longDescription: string;
  images: string[];
  category: string;
  discountPrice: number;
  discountPercentage: number;
  isDeleted: boolean;
  stockAvailability: string;
  id: string;
};

// Define the type for the Product object
export type TOrderProduct = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  orderNumber: string;
  deliveryProcess: string;
  addToCartProduct: TAddToCartProduct[];
  subTotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: "Pending" | "Shipped" | "Delivered";
};

// Define the props interface for DashboardOrderSummeryCard
export type TDashboardOrderSummeryCardProps = {
  product: TOrderProduct;
  index: number;
  refetch: () => void; // function type for refetch
};

// Define the type for the review item prop
export type TReviewItem = {
  _id: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  productId: {
    name: string;
  };
  status: "Accepted" | "Rejected" | "Pending";
};

export type TReviewItemPending = {
  _id: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  productId: string;
  status: "Accepted" | "Rejected" | "Pending";
};

export type TReviewsDataTableProps = {
  item: TReviewItem;
  index: number;
  refetch: () => void;
};

// Navbar sidebbar
export type TNavbarSidebarProps = {
  showSidebar: boolean;
  toggleSidebar: () => void;
};

// Define an interface for the payload
export type TUserPayload = {
  user: TUser;
  id: string;
};

// Define a type for the images in state
export type TImageFile = {
  url: string;
  file: File;
};

export type TDrawerType = {
  htmlFor: string;
  onCategorySelect: (categories: string[]) => void;
  onPriceRangeSelect: (range: TPriceRange) => void;
  initialCategories: string[];
  initialPriceRange: TPriceRange;
  onStockAvailabilitySelect: (availability: string[]) => void;
};

export type TCartProduct = {
  _id: string;
  productId: {
    name: string;
    price: number;
  };
  quantity: number;
};

export type TProductWishlist = {
  _id: string;
  name: string;
  images: string;
  price: number;
  stockQuantity: number;
};

export type TWishlistItem = {
  _id: string;
  productId: TProductWishlist;
};

export type TWishlistCardProps = {
  singleWishlist: TWishlistItem;
};
