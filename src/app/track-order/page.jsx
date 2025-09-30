"use client";
import { useEffect, useState } from "react";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  X,
  Clock,
} from "lucide-react";

export default function OrderTrackPage() {
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState([]);

  // Load recent searches
  useEffect(() => {
    try {
      const raw = localStorage.getItem("recentOrders_v1");
      if (raw) setRecent(JSON.parse(raw));
    } catch {}
  }, []);

  // Save recent searches
  const pushRecent = (id) => {
    if (!id) return;
    const next = [id, ...recent.filter((x) => x !== id)].slice(0, 5);
    setRecent(next);
    localStorage.setItem("recentOrders_v1", JSON.stringify(next));
  };

  // Fetch from Django API
  const fetchOrder = async (id) => {
    setLoading(true);
    setTrackingData(null);
    setNotFound(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/track/?order_number=${id}`);
      if (!res.ok) {
        setNotFound(true);
      } else {
        const data = await res.json();
        setTrackingData(data);
        pushRecent(id);
      }
    } catch {
      setNotFound(true);
    }

    setLoading(false);
  };


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const o = params.get("o");
    if (o) {
      setOrderId(o);
      fetchOrder(o);
    }
  }
  , []);

  
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (orderId.trim()) fetchOrder(orderId.trim());
  };

  const clearInput = () => setOrderId("");
  const handleTryAgain = () => {
    setNotFound(false);
    setOrderId("");
  };

  // Steps
  const steps = [
    { label: "Order Placed", key: "PEN", icon: <Package size={18} /> },
    { label: "Processing", key: "PRO", icon: <Clock size={18} /> },
    { label: "Shipped", key: "SHI", icon: <Truck size={18} /> },
    { label: "Delivered", key: "DEL", icon: <CheckCircle size={18} /> },
  ];

  const getStepIndex = (status) =>
    steps.findIndex((s) => s.key === status) !== -1
      ? steps.findIndex((s) => s.key === status)
      : 0;

  const activeIndex = trackingData
    ? getStepIndex(trackingData.status)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Track Your Order
          </h1>
          <p className="mt-3 text-gray-600 text-base md:text-lg">
            Enter your Order ID to see the current status and courier details.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 relative w-full">
              <input
                className="w-full rounded-xl pl-4 pr-10 py-3 text-gray-800 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Order ID (e.g. DBX-20250904-0001)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              {orderId && (
                <button
                  type="button"
                  onClick={clearInput}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!orderId.trim() || loading}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
                !orderId.trim() || loading
                  ? "bg-blue-200 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading ? "Checking..." : <><Search size={18}/> Track</>}
            </button>
          </form>

          {/* Recent Searches */}
          {recent.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {recent.map((r, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setOrderId(r);
                    fetchOrder(r);
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mt-10">
          {trackingData && (
            <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
              {/* Order Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Order{" "}
                  <span className="text-blue-600">
                    {trackingData.order_number}
                  </span>
                </h2>
                <p className="text-gray-600 mt-1">
                  Status:{" "}
                  <span className="font-medium text-gray-900">
                    {trackingData.status_display}
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  Last update:{" "}
                  {new Date(trackingData.updated_at).toLocaleString()}
                </p>
              </div>

              {/* Courier Info */}
              {trackingData.courier?.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-gray-700">
                    <strong>Courier:</strong>{" "}
                    {trackingData.courier[0].coriour_name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Tracking #:</strong>{" "}
                    {trackingData.courier[0].tracking_id}
                  </p>
                </div>
              )}

              {/* Progress Steps */}
              <div className="relative flex items-center justify-between">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 transition-all duration-700"
                  style={{
                    width: `${(activeIndex / (steps.length - 1)) * 100}%`,
                  }}
                />
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center w-full"
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition ${
                        i <= activeIndex
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-400 border-gray-300"
                      }`}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        i <= activeIndex ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Not Found */}
          {notFound && !loading && (
            <div className="bg-white border border-red-200 rounded-2xl shadow-lg p-8 text-center">
              <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-600">
                Order Not Found
              </h3>
              <p className="text-gray-600 mt-2">
                No order with ID{" "}
                <span className="font-medium text-gray-800">{orderId}</span>{" "}
                was found. Please double-check or try again.
              </p>
              <button
                onClick={handleTryAgain}
                className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
