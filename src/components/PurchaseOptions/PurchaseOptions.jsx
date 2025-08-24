'use client';
import React, { useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { addItemSafe } from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaShoppingBasket } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const PurchaseOptions = ({ data }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('one-time');
  const [qty, setQty] = useState(1);
  const [agreed, setAgreed] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const addToCartItem = () => {
    const exists = items.find((i) => i.id === data?.id);

    if (exists) {
      toast("Item is already in your cart!", {
        icon: <FaShoppingBasket className="text-black" />, // ✅ custom basket icon
      });
      return;
    }

    const item = {
      id: data?.id,
      slug: data?.productSlug,
      name: data?.productName,
      price: data?.productPrice,
      unite_price: data?.productPrice,
      image: data?.productImages?.[0]?.image
        ? `${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${data?.productImages[0].image}`
        : null,
      qty: qty,
    };

    dispatch(addItemSafe(item));

    toast("Added to cart!", {
      icon: <FaShoppingBasket className="text-black" />, // optional: show basket icon here too
    });
  };


  // DRY: Centralized options config
  const options = [
    {
      key: 'one-time',
      label: 'One Time Purchase',
      price: data?.productPrice,
      discountedPrice: null,
      badge: null,
    },
    {
      key: 'subscription',
      label: 'Subscribe and save',
      price: data?.productPrice,
      discountedPrice: data?.productPrice
        ? (data.productPrice * 0.97) // 3% off
        : null,
      badge: 'SAVE 3%',
    }

  ];

  return (
    <div className="w-full space-y-6">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-6">
        <button
          className="w-10 h-10 rounded-full bg-gray-100 text-xl"
          onClick={() => qty > 1 && setQty(qty - 1)}
        >
          −
        </button>
        <span className="text-xl">{qty}</span>
        <button
          className="w-10 h-10 rounded-full bg-gray-100 text-xl"
          onClick={() => setQty(qty + 1)}
        >
          +
        </button>
      </div>


      {/* Purchase Options */}
      <div className="space-y-4">
        <h3 className="font-semibold">Purchase Options</h3>
        {options.map((option) => (
          <label
            key={option.key}
            className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer transition ${selectedOption === option.key ? 'border-black' : 'border-gray-300'
              }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="purchase"
                checked={selectedOption === option.key}
                onChange={() => setSelectedOption(option.key)}
              />
              <span className="text-sm font-medium">{option.label}</span>
              {option.badge && (
                <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  {option.badge}
                </span>
              )}
            </div>
            <div className="text-sm font-medium text-right">
              {option.discountedPrice ? (
                <>
                  <span className="line-through text-gray-500">
                    {((option.price ?? 0) * qty)} {process.env.NEXT_PUBLIC_CURRENCY}
                  </span>{" "}
                  <span className="text-black">
                    {((option.discountedPrice ?? 0) * qty)} {process.env.NEXT_PUBLIC_CURRENCY}
                  </span>
                </>
              ) : (
                <span className="text-black">
                  {((option.price ?? 0) * qty)} {process.env.NEXT_PUBLIC_CURRENCY}
                </span>
              )}
            </div>

          </label>
        ))}
      </div>

      {/* Subscription Detail */}
      {selectedOption === 'subscription' && (
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <FaSyncAlt />
          <span>Subscription detail</span>
        </div>
      )}

      {/* Cart & Terms Section */}
      <div className="space-y-3">
        {/* Add to Cart Button */}
        <button className="w-full bg-black mb-8 text-white py-3 rounded-full hover:bg-gray-800 transition" onClick={addToCartItem}>
          Add to Cart
        </button>

        {/* Terms Checkbox */}
        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" id="terms-cond" className="accent-black" onChange={(e) => setAgreed(e.target.checked)} />
          <label htmlFor="terms-cond" className="cursor-pointer">
            I agree with <span className="underline">Terms & Conditions</span>
          </label>

        </div>

        {/* Buy It Now Button */}
        <button
          disabled={!agreed}
          onClick={()=>{router.push(`/checkout?i=${data?.id}&q=${qty}`)}}
          className={`w-full rounded-full py-3 transition ${agreed
            ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            : "bg-red-500/10 text-red-600 cursor-not-allowed"
            }`}
        >
          Buy It Now
        </button>
      </div>
    </div>
  );
};

export default PurchaseOptions;
