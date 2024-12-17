import { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import "./Sidebar.css";
import Swal from "sweetalert2";
import {
  useGetAllCartByUserQuery,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
  useRemoveProductFromCartMutation,
} from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  TCartItem,
  TMyCartProduct,
  TNavbarSidebarProps,
  TQuantityItem,
} from "@/types";
import Spinner from "@/components/Spinner/Spinner";

const NavbarSidebar: React.FC<TNavbarSidebarProps> = ({
  showSidebar,
  toggleSidebar,
}) => {
  const {
    data: cartData,
    refetch,
    isLoading,
  } = useGetAllCartByUserQuery(undefined);
  const token = useAppSelector(useCurrentToken); // Get current user's token

  // Ensure that cartData is valid and items is an array
  const cartItems = Array.isArray(cartData?.data?.items)
    ? cartData.data.items
    : [];

  // Calculate total quantity of all products in the cart
  const totalQuantity = cartItems.reduce(
    (acc: number, item: TCartItem) => acc + item.quantity,
    0
  );

  const [quantities, setQuantities] = useState(
    cartItems?.map((item: TCartItem) => ({
      id: item.productId,
      quantity: item.quantity,
    })) || []
  );

  useEffect(() => {
    // Only update quantities if cartItems has changed
    if (cartItems.length > 0) {
      setQuantities(
        cartItems.map((item: TCartItem) => ({
          id: item.productId,
          quantity: item.quantity,
        }))
      );
    }
  }, [cartItems]);

  const [increaseQuantity] = useIncreaseQuantityMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const [removeProductFromCart] = useRemoveProductFromCartMutation();

  // console.log(increaseQuantity);

  const increment = async (productId: TMyCartProduct) => {
    try {
      console.log("increment", productId._id);
      await increaseQuantity({
        token,
        productId: productId._id,
      }).unwrap();
      refetch();
      setQuantities((prevQuantities: TQuantityItem[]) =>
        prevQuantities.map((item: TQuantityItem) =>
          item.id === productId._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const decrement = async (productId: TMyCartProduct) => {
    try {
      console.log("increment", productId._id);
      await decreaseQuantity({
        token,
        productId: productId._id,
      }).unwrap();
      refetch();
      setQuantities((prevQuantities: TQuantityItem[]) =>
        prevQuantities.map((item: TQuantityItem) =>
          item.id === productId._id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const removeProduct = async (productId: TMyCartProduct) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeProductFromCart({
            token,
            productId: productId._id,
          }).unwrap();
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "The product has been removed from your cart.",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove product:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove product from the cart.",
            icon: "error",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        }
      }
    });
  };

  const setQuantity = (productId: string | number, newQuantity: number) => {
    setQuantities((prevQuantities: TQuantityItem[]) =>
      prevQuantities.map((item: TQuantityItem) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  return (
    <div>
      <div className={`sidebar ${showSidebar ? "active" : ""}`}>
        <div className="sidebar-header">
          <div className="flex items-center justify-between w-auto pb-5 border-b-[1px] border-b-[#808080]">
            <h1 className="font-poppins font-semibold text-2xl text-black">
              Cart
            </h1>
            <button onClick={toggleSidebar}>
              <MdOutlineCancel className="text-black text-2xl" />
            </button>
          </div>

          <div className="mt-5 text-lg font-poppins font-semibold">
            Total Items in Cart: {totalQuantity}
          </div>
        </div>

        <div className="sidebar-content">
          <div className="cart-items">
            {isLoading ? (
              <div className="text-lg flex items-center justify-center mt-4">
                <Spinner />
              </div>
            ) : cartItems.length > 0 ? (
              cartItems.map((item: TCartItem) => {
                const currentQuantity =
                  quantities.find(
                    (q: TQuantityItem) => q.id === item.productId._id
                  )?.quantity || item.quantity;

                const productImage =
                  item?.productId.images && item.productId.images[0];
                const availableStock = item.productId.stockQuantity;
                const productId = item.productId._id;

                return (
                  <div className="relative">
                    <div
                      key={productId}
                      className="flex items-center justify-between mb-7 border-b pb-7"
                    >
                      <Link to={`/products/${productId}`}>
                        <div>
                          <img
                            className="w-24 h-24"
                            src={productImage}
                            alt=""
                          />
                        </div>
                      </Link>

                      <div className="flex flex-col items-center justify-center md:justify-start gap-3">
                        <h1 className="font-poppins font-medium text-[15px]">
                          {item?.productId?.name}
                        </h1>
                        <div className="flex items-center space-x-2">
                          <button
                            className="border px-2 py-[2px] text-xl font-poppins font-medium rounded-md"
                            onClick={() => decrement(item.productId)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={currentQuantity}
                            onChange={(e) =>
                              setQuantity(
                                item.productId._id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="text-center w-9 border border-gray-300 rounded-md px-1 py-[3px] text-[#808080]"
                            min="1"
                          />
                          <button
                            className="border px-2 py-[2px] text-xl font-poppins font-medium rounded-md"
                            onClick={() => increment(item.productId)}
                            disabled={currentQuantity >= availableStock}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="font-poppins font-semibold text-[15px]">
                          ${item?.productId?.price}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-6 right-3 cursor-pointer">
                      <RiDeleteBin5Line
                        onClick={() => removeProduct(item?.productId)}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center font-poppins text-xl font-semibold">
                No items in cart
              </p>
            )}
            {cartItems.length > 0 && (
              <div className="mt-4 mb-3">
                <label
                  htmlFor="message"
                  className="font-poppins text-[15px] font-bold text-[#2C2C2C] uppercase"
                  style={{ lineHeight: "1", letterSpacing: ".1em" }}
                >
                  Order Note
                </label>
                <textarea
                  id="order"
                  rows={4}
                  className="w-full border-[#e8e8e1] border-[1px] focus:outline focus:outline-1 focus:outline-[#1D1D1F] font-poppins border-b-[#C6C6C6] outline-none pt-3 pb-3 pl-3 mt-4 "
                ></textarea>
              </div>
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="sidebar-footer">
            <div className="px-5 flex items-center justify-between">
              <h3
                className="font-poppins font-bold text-[15px] uppercase"
                style={{ lineHeight: "1", letterSpacing: ".1em" }}
              >
                Subtotal
              </h3>
              <p className="font-poppins font-semibold text-[15px]">
                $
                {cartItems
                  .reduce(
                    (acc: number, item: TCartItem) =>
                      acc + item.quantity * item.productId.price,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <p className="text-sm font-poppins font-normal text-[#808080] px-5 mt-3">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="px-5 mt-5">
              <Link to="/cart">
                <button className="w-full bg-[#FA7F96] hover:bg-black rounded-md text-white font-poppins font-medium text-base py-3 mb-3">
                  View Cart
                </button>
              </Link>
              <Link to="/checkout">
                <button className="w-full bg-black rounded-md hover:bg-[#FA7F96] text-white font-poppins font-medium text-base py-3">
                  CheckOut
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div
        className={`backdrop ${showSidebar ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default NavbarSidebar;
