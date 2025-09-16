"use client";

import Link from "next/link";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import ConfettiExplosion from 'react-confetti-explosion';
import * as Tooltip from "@radix-ui/react-tooltip";

export default function ThankYouPage() {
  const params = useSearchParams();
  const router = useRouter()
  const [order, setOrder] = useState(null);
  const [isExploding, setIsExploding] = useState(false);
  const [showAll, setShowAll] = useState(false);

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
        setOrder(data); // ✅ save order
        setIsExploding(true); // ✅ trigger confetti
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    if (orderId) {
      fetchOrder(orderId);
    }
  }, [params]);
  const itemsTotal = order?.items?.reduce(
    (acc, item) => acc + Number(item.total_price || 0),
    0
  );
 useEffect(() => {
    if (!params.get("order")) {
      router.push("/shop");
    }
  }, [params, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {isExploding && <ConfettiExplosion />}

      {/* ✅ Success Heading */}
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
        {order?.msg_info === true &&  params.get("order") ? (
          <p className="mt-2 text-gray-600 text-base md:text-lg max-w-xl">
            Your order has been placed successfully! A confirmation email with your order details will arrive shortly.
          </p>
        ) : (
          <p className="mt-2 text-gray-600 text-base md:text-lg max-w-xl">
            Your order has been placed successfully! Please keep your order number <b>{order?.order_id}</b> for track you order.
          </p>
        )}


      </motion.div>

      {/* ✅ Order Summary */}
      {order && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 w-full max-w-lg bg-white shadow-md rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">
            {/* ✅ Defensive for 1 or many items */}
            {order.items &&
              order.items.slice(0, 2).map((item) => {
                const isLong = item.name.length > 35;
                const displayName = isLong
                  ? item.name.slice(0, 35) + "..."
                  : item.name;
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <Tooltip.Provider delayDuration={200}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <p className="text-sm font-medium text-gray-800 truncate cursor-pointer">
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
                    <span className="font-medium text-gray-900">
                      {item.total_price.toFixed(0)} {process.env.NEXT_PUBLIC_CURRENCY}
                    </span>
                  </div>
                )
              })}

            {/* ✅ Collapse for extra items */}
            <AnimatePresence>
              {showAll &&
                order.items.slice(2).map((item) => {
                  const isLong = item.name.length > 35;
                  const displayName = isLong
                    ? item.name.slice(0, 35) + "..."
                    : item.name;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-between items-center border-b pb-2 overflow-hidden"
                    >
                      <Tooltip.Provider delayDuration={200}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <p className="text-sm font-medium text-gray-800 truncate cursor-pointer">
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
                      <span className="font-medium text-gray-900">
                        ${item.total_price.toFixed(0)}
                      </span>
                    </motion.div>
                  )
                })}
            </AnimatePresence>

            {/* ✅ Toggle Button */}
            {order.items && order.items.length > 2 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center justify-center w-full text-green-600 font-medium mt-2"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            )}

            {/* ✅ Shipping */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Shipping</span>
              <span className="font-medium text-gray-900">Free</span>
            </div>

            {/* ✅ Total */}
            {
              order?.discount_amount > 0 && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-800 font-semibold">Discount</span>
                  <span className="font-bold text-green-600">
                    -{order?.discount_amount.toFixed(0)} {process.env.NEXT_PUBLIC_CURRENCY}
                  </span>
                </div>
              )
            }

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-800 font-semibold">Total</span>
              <span className="font-bold text-green-600">
                {order?.total_amount.toFixed(0)} {process.env.NEXT_PUBLIC_CURRENCY}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ✅ Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row gap-3"
      >
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium shadow hover:bg-green-700 transition text-center"
        >
          Continue Shopping
        </Link>
        {/* <Link
          href="/account/orders"
          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium shadow hover:bg-gray-100 transition text-center"
        >
          View My Orders
        </Link> */}
      </motion.div>
    </div>
  );
}
