"use client";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react"; // icon (comes from lucide-react)

export default function SalesPopup() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  // Static sales data
  const sales = [
    { name: "Ibrahim", location: "Dubai", product: "USB Facial Gun", time: "2 mins ago" },
    { name: "Fatima", location: "Abu Dhabi", product: "Labubu - Wireless Headphone", time: "4 mins ago" },
    { name: "Omar", location: "Sharjah", product: "Vitamin C Body Oil (100ml)", time: "7 mins ago" },
    { name: "Aisha", location: "Ajman", product: "925 Sterling Silver Simple Temperament Clavicle Necklace", time: "10 mins ago" },
    { name: "Mohammed", location: "Ras Al Khaimah", product: "Portable Electric Air Pump", time: "12 mins ago" },
    { name: "Layla", location: "Fujairah", product: "Mini 2.4G Punk Wireless Keyboard", time: "15 mins ago" },
    { name: "Yusuf", location: "Al Ain", product: "Vibe Sphere Headphones", time: "18 mins ago" },
  ];

  // Cycle through sales every 10 seconds
  useEffect(() => {
    if (sales.length === 0) return;

    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000); // hide after 5s
      setCurrent((prev) => (prev + 1) % sales.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const { name, location, product, time } = sales[current];

  return (
    <div
      className={`fixed bottom-6 left-6 w-80 max-w-xs bg-gradient-to-r from-white to-gray-50 shadow-2xl rounded-2xl p-4 border border-gray-200 flex items-start gap-3 transition-all duration-500 transform ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
      }`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
        <ShoppingBag size={20} />
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">
          🎉 {name} from {location}
        </p>
        <p className="text-sm text-gray-600">
          just purchased <span className="font-medium text-gray-900">{product}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}
