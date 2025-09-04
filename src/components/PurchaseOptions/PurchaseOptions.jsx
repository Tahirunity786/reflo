'use client';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addItemSafe } from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaShoppingBasket } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import SignUpModal from '../SignUpModal/SignUpModal';
import SignInModal from '../SignInModal/SignInModal';


const PurchaseOptions = ({ data }) => {
  const router = useRouter();
  // const [selectedOption, setSelectedOption] = useState('one-time');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [qty, setQty] = useState(1);
  const [agreed, setAgreed] = useState(false);

  // const isAuthenticated = typeof window !== 'undefined' && Cookies.get('access') ? true : false;

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const addToCartItem = () => {
    const exists = items.find((i) => i.id === data?.id);
    if (exists) {
      toast("Item is already in your cart!", {
        icon: <FaShoppingBasket className="text-black" />,
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
      icon: <FaShoppingBasket className="text-black" />,
    });
  };

  const handleBuyNow = () => {
    // if (!isAuthenticated && selectedOption === "subscription") {
    //   setShowSignIn(true); // 👈 open sign-in modal
    //   return;
    // }
    // if (!agreed) return;

    router.push(`/checkout?i=${data?.id}&q=${qty}`);
  };


  // DRY: Centralized options config
  // const allOptions = [
  //   {
  //     key: "one-time",
  //     label: "One Time Purchase",
  //     price: data?.productPrice,
  //     discountedPrice: null,
  //     badge: null,
  //   },
  //   {
  //     key: "subscription",
  //     label: "Subscribe and save",
  //     price: data?.productPrice,
  //     discountedPrice: data?.productPrice ? data.productPrice * 0.97 : null,
  //     badge: "SAVE 3%",
  //   },
  // ];

  // const options = isAuthenticated
  //   ? allOptions.filter((opt) => opt.key === "one-time")
  //   : allOptions

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
      {/* <div className="space-y-4">
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
                    {(Number(option.price) * qty).toFixed(2)} {process.env.NEXT_PUBLIC_CURRENCY}
                  </span>{" "}
                  <span className="text-black">
                    {(Number(option.discountedPrice) * qty).toFixed(2)} {process.env.NEXT_PUBLIC_CURRENCY}
                  </span>
                </>
              ) : (
                <span className="text-black">
                  {(Number(option.price) * qty).toFixed(2)} {process.env.NEXT_PUBLIC_CURRENCY}
                </span>
              )}
            </div>


          </label>
        ))}
      </div> */}

      {/* Cart & Terms Section */}
      <div className="space-y-3">
        {/* Add to Cart Button */}
        <button
          className="w-full bg-black mb-8 text-white py-3 rounded-full hover:bg-gray-800 transition"
          onClick={addToCartItem}
        >
          Add to Cart
        </button>
        {/* Terms Checkbox */}
        {/* <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" id="terms-cond" className="accent-black" onChange={(e) => setAgreed(e.target.checked)} />
          <label htmlFor="terms-cond" className="cursor-pointer">
            I agree with <span className="underline">Terms & Conditions</span>
          </label>

        </div> */}

        {/* Buy It Now Button */}
        <button
          // disabled={!agreed}
          onClick={handleBuyNow}
          className={`w-full rounded-full py-3 transition ${"bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"}`}
        >
          Buy It Now
        </button>
      </div>
      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
    </div>
  );
};

export default PurchaseOptions;
