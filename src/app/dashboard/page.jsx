"use client";

import LatestOrders from "@/components/Admin/LatestOrders/LatestOrders";
import SalesChart from "@/components/Admin/SalesChart/SalesChart";
import SummaryCard from "@/components/Admin/SummaryCard/SummaryCard";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  PackageCheck,
  Ban,
} from "lucide-react";

const stats = [
  { title: "Total Cost", value: "$18,000", icon: DollarSign, color: "border-blue-500" },
  { title: "Total Profit", value: "$7,200", icon: TrendingUp, color: "border-green-500" },
  { title: "Total Cancellations", value: "12", icon: Ban, color: "border-red-500" },
  { title: "Total Fulfillments", value: "354", icon: PackageCheck, color: "border-emerald-500" },
  { title: "Total Orders", value: "430", icon: ShoppingCart, color: "border-yellow-500" },
];

const recentOrders = [
  { id: "ORD001", customer: "John Doe", amount: "$320", date: "Jul 9" },
  { id: "ORD002", customer: "Jane Smith", amount: "$190", date: "Jul 8" },
  { id: "ORD003", customer: "Alice Brown", amount: "$460", date: "Jul 7" },
];

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => (
          <SummaryCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Sales Chart */}
      <div className="mb-8">
        <SalesChart />
      </div>

      {/* Latest Orders and Top Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LatestOrders orders={recentOrders} />

        {/* Placeholder for another widget (e.g., low stock, top products) */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Top Selling Products</h2>
          <p className="text-gray-500">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}