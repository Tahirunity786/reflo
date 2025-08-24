"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import { removeItem as removeWishlistItem } from "@/redux/slices/wishSlice";
import { addItemSafe as addCartItemSafe } from "@/redux/slices/cartSlice";
import { FaShoppingBasket } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Wishlist() {
  const router = useRouter()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [bsData, setBSData] = useState([]);
  const [error, setError] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Add wishlist item to cart
  const handleAddToCart = (item) => {
    const exists = cartItems.find((i) => i.id === item.id);

    if (exists) {
      toast("Item is already in your cart!", {
        icon: <FaShoppingBasket className="text-black" />,
      });
      return;
    }

    const cartItem = {
      ...item,
      qty: 1, // default quantity
    };

    dispatch(addCartItemSafe(cartItem));

    toast("Added to cart!", {
      icon: <FaShoppingBasket className="text-black" />,
    });
  };

  // ✅ Remove item from wishlist (Redux)
  const handleRemoveWishlist = (id) => {
    dispatch(removeWishlistItem(id));
    toast("Removed from wishlist", {
      icon: "❌",
    });
  };

  useEffect(() => {

    const fetchBSProducts = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/product/products?type=${"bestSelling"}&quantity=4`
        );
        if (response.ok) {
          const data = await response.json();
          setBSData(data || []);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBSProducts();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-800">
      {/* Page Heading */}
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wishlist Table */}
        <div className="lg:col-span-2 overflow-x-auto rounded-lg bg-white">
          <table className="min-w-full text-left">
            <thead className="bg-black text-sm text-white">
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => {
                  const isLong = item.name.length > 15;
                  const displayName = isLong
                    ? item.name.slice(0, 15) + "..."
                    : item.name;

                  return (
                    <tr key={item.id} className="border-t">
                      {/* Remove Button */}
                      <td className="p-4">
                        <button
                          onClick={() => handleRemoveWishlist(item.id)}
                          className="text-red-500 font-bold text-lg"
                          aria-label="Remove item"
                        >
                          ×
                        </button>
                      </td>

                      {/* Product Name + Tooltip */}
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <Tooltip.Provider delayDuration={200}>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <p onClick={() => router.push(`/shop/${item.slug}`)} className="text-sm font-medium text-gray-800 truncate cursor-pointer">
                                {displayName}
                              </p>
                            </Tooltip.Trigger>
                            {isLong && (
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  side="top"
                                  align="center"
                                  className="z-[9999] bg-gray-900 text-white px-3 py-1 rounded-md text-xs shadow-lg"
                                >
                                  {item.name}
                                  <Tooltip.Arrow className="fill-gray-900" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            )}
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      </td>

                      {/* Price */}
                      <td className="p-4 text-orange-500 font-medium">
                        ${item.price.toFixed(2)}
                      </td>

                      {/* Stock Status */}
                      <td className="p-4">
                        <span
                          className={`font-medium ${item.stockStatus === "In Stock"
                            ? "text-green-600"
                            : "text-red-500"
                            }`}
                        >
                          {item.stockStatus}
                        </span>
                      </td>

                      {/* Add to Cart */}
                      <td className="p-4">
                        {item.stockStatus === "In Stock" && (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="text-orange-500 hover:underline font-medium"
                          >
                            Add to Cart
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-gray-500"
                  >
                    Your wishlist is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Related Products Sidebar */}
        <aside className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Related Products
          </h2>

          {bsData.slice(0, 4).map((product) => {
            const isLong = product.productName.length > 35;
            const displayName = isLong
              ? product.productName.slice(0, 35) + "..."
              : product.productName;
            return (

              <div
                key={product?.id}
                className="flex gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
              >
                <img
                  onClick={() => router.push(`/shop/${product.productSlug}`)}
                  src={
                    product?.productImages?.[0]?.image
                      ? `${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${product.productImages[0].image}`
                      : "/placeholder.jpg"
                  }
                  alt={product?.productName || "Product image"}
                  className="w-16 h-16 object-cover rounded cursor-pointer"
                />
                <div className="flex flex-col justify-between">
                  <Tooltip.Provider delayDuration={200}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <p
                          className="text-sm font-medium text-gray-800 truncate cursor-pointer"
                          onClick={() => router.push(`/shop/${product.productSlug}`)}
                        >
                          {displayName}
                        </p>
                      </Tooltip.Trigger>
                      {isLong && (
                        <Tooltip.Portal>
                          <Tooltip.Content
                            side="top"
                            align="center"
                            className="z-[9999] bg-gray-900 text-white px-3 py-1 rounded-md text-xs shadow-lg"
                          >
                            {product.productName}
                            <Tooltip.Arrow className="fill-gray-900" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      )}
                    </Tooltip.Root>
                  </Tooltip.Provider>

                  <span className="text-orange-500 font-semibold text-sm">
                    ${Number(product?.productPrice || 0).toFixed(2)}
                  </span>

                </div>
              </div>
            )
          })}

        </aside>

      </div>
    </div>
  );
}
