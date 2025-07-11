"use client";
import Image from "next/image";

export default function LatestOrders({ orders }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Latest Orders</h2>
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.id} className="py-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-800">{order.customer}</p>
                <p className="text-sm text-gray-500">Order ID: {order.id}</p>
              </div>
              <div className="text-sm text-right">
                <p className="font-semibold text-green-600">{order.amount}</p>
                <p className="text-gray-500">{order.date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}