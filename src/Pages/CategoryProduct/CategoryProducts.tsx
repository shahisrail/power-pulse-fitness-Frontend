import { useGetProductsByCategoryQuery } from "@/redux/features/product/productApi";
import { useParams } from "react-router-dom";
import ProductCategoryBanner from "@/components/ProductCategoryBanner/ProductCategoryBanner";
import CategoryProductCard from "../Products/CategoryProductCard";
import Spinner from "@/components/Spinner/Spinner";

interface Product {
  _id: string;
  name: string;
  price: number;
  sku: string;
  images: string[];
  category: string;
  shortDescription?: string;
  stockQuantity: number;
}

interface CategoryProductsResponse {
  data: {
    products: Product[];
  }[];
}

const CategoryProducts = () => {
  const { category } = useParams();

  const { data: CategoryProducts, isLoading } = useGetProductsByCategoryQuery(
    category!,
    {
      skip: !category,
    }
  ) as { data: CategoryProductsResponse | undefined; isLoading: boolean };
  // console.log(CategoryProducts);

  // Access the products array from the response
  const products = CategoryProducts?.data?.[0]?.products || [];

  return (
    <div>
      <ProductCategoryBanner category={category} />
      <div className="container mx-auto mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading ? (
            <div className="text-center py-10 font-poppins font-bold text-2xl md:pl-96 lg:pl-[700px]">
              <div className="text-lg flex items-center justify-center ">
                <Spinner />
              </div>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <CategoryProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="text-center py-4 font-poppins font-bold text-3xl">
              No Product Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
