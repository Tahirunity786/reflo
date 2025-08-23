"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react"; // ✅ modern icon
import { motion } from "framer-motion"; // ✅ for smooth animation
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function ThankYouPage() {
  const params = useSearchParams();
  useEffect(() => {
    const orderId = params.get("order");
    const authToken = Cookies.get("access");

    const fetchOrder = async (id) => {
      try {
        const headers = authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {};
         

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/order/orders/${id}/summary/`,
          { headers }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Order summary:", data);
        // ✅ set state here if you want to display order
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    if (orderId) {
      fetchOrder(orderId);
    }
  }, [params]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">

      {/* ✅ Animated checkmark + heading */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <CheckCircle2 className="w-20 h-20 text-green-600 mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Thank You for Your Order!
        </h1>
        <p className="mt-2 text-gray-600 text-base md:text-lg max-w-xl">
          Your order has been successfully placed. A confirmation email will be sent shortly with your order details.
        </p>
      </motion.div>

      {/* ✅ Order summary card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 w-full max-w-lg bg-white shadow-md rounded-2xl p-6 md:p-8"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>

        <div className="space-y-3">
          {/* Example Order Item */}
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">USB Facial Gun</span>
            <span className="font-medium text-gray-900">$125.00</span>
          </div>

          {/* Example shipping */}
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">Shipping</span>
            <span className="font-medium text-gray-900">Free</span>
          </div>

          {/* Example total */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-800 font-semibold">Total</span>
            <span className="font-bold text-green-600">$125.00</span>
          </div>
        </div>
      </motion.div>

      {/* ✅ Action buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row gap-3"
      >
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium shadow hover:bg-green-700 transition text-center"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account/orders"
          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium shadow hover:bg-gray-100 transition text-center"
        >
          View My Orders
        </Link>
      </motion.div>
    </div>
  );
}
