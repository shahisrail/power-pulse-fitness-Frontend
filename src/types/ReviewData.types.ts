export type TReviewData = {
  _id: string;
  productId: TProductId;
  userId: TUserId;
  name: string;
  email: string;
  rating: number;
  review: string;
  status: "Accepted" | "Rejected" | "Pending";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProductId = {
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  stockAvailability: string;
  id: string;
};

export type TUserId = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  __v: number;
};
