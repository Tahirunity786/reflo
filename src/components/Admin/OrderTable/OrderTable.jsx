'use client';

import { useState } from 'react';

// Dummy order data
const ORDER_DATA = [
  {
    id: 'ORD-1001',
    customer: 'Usman Ali',
    status: 'Pending',
    total: '$250.00',
    date: '2025-07-10',
  },
  {
    id: 'ORD-1002',
    customer: 'Ayesha Noor',
    status: 'Shipped',
    total: '$149.99',
    date: '2025-07-09',
  },
  {
    id: 'ORD-1003',
    customer: 'Tahir Zaman',
    status: 'Delivered',
    total: '$89.00',
    date: '2025-07-08',
  },
  {
    id: 'ORD-1004',
    customer: 'Sana Iqbal',
    status: 'Cancelled',
    total: '$55.00',
    date: '2025-07-08',
  },
];

export default function OrdersTable() {
  const [search, setSearch] = useState('');

  // Filtered orders based on search input
  const filteredOrders = ORDER_DATA.filter(order =>
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto ">
      <div className="flex items-center justify-between pb-4">
        
        <input
          type="text"
          placeholder="Search by ID or customer"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 text-sm border border-gray-300 rounded-lg w-72 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Order ID</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{order.id}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                    order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'Shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'Delivered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4">{order.total}</td>
              <td className="px-6 py-4">{order.date}</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
