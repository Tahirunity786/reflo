"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import Cookies from "js-cookie";

export default function CouponCollapse({ handleDiscount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const toggleCollapse = () => setIsOpen(!isOpen);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);


    const auth_cookie = Cookies.get('access');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/coupon/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(auth_cookie && { Authorization: `Bearer ${auth_cookie}` }),
        },
        body: JSON.stringify({ code: coupon.trim() }),
      });

      if (res.status === 401) {
        setShowSignIn(true);
        return;
      }
      const data = await res.json();


      if (!res.ok) {
        setMessage({ type: data.status || "error", text: data.message || "Something went wrong!" });
      } else {
        handleDiscount(data);
        setMessage({ type: "success", text: data.message || "Coupon applied successfully!" });
        setCoupon("");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-xl overflow-hidden ">
      {/* Collapse Header */}
      <button
        onClick={toggleCollapse}
        className="w-full flex justify-between items-center px-6 py-4 bg-yellow-500 text-white font-bold text-lg hover:bg-yellow-600 transition-all focus:outline-none"
      >
        {isOpen ? "Hide Coupon Form" : "Have a Coupon? Click to Apply"}
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[1000px] p-6 sm:p-8" : "max-h-0 p-0"
          }`}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Apply Your Coupon 🎟️
        </h2>

        <form onSubmit={handleApplyCoupon} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 w-full text-white font-semibold rounded-lg px-6 py-3 text-sm sm:text-base hover:bg-yellow-600 transition-all disabled:opacity-60"
            aria-busy={loading}
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm sm:text-base ${message.type === "success"
              ? "bg-green-100 text-green-700"
              : message.type === "warning"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {message.text}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-3 text-center">
          Your email is safe with us. No spam, only exclusive deals! ✨
        </p>
      </div>

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
}
