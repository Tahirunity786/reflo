'use client';

import { useState } from 'react';
import Link from "next/link";
import "@/app/globals.css";

import {
  UserCircleIcon,
  ShoppingBagIcon,
  ClipboardListIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  Computer,
  BadgePercent,
  User,
} from "lucide-react";
import { useRouter } from 'next/navigation';


export default function AdminLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [contentDropdownOpen, setContentDropdownOpen] = useState(false);
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-60' : 'w-16'} 
          hidden md:flex flex-col`}
      >
        <div className="p-6 border-b">
          <h2 className={`text-xl font-bold text-gray-800 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            Admin Panel
          </h2>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-2">
          {/* Products Dropdown */}
          <Link href="/dashboard" className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <HomeIcon className="w-5 h-5 mr-3" />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <div>
            <button
              onClick={() => {
                setProductDropdownOpen(!productDropdownOpen); // open dropdown
                router.push("/dashboard/products"); // navigate
              }}
              className="w-full flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <span className="flex items-center">
                <ShoppingBagIcon className="w-5 h-5 mr-3" />
                {sidebarOpen && <span>Products</span>}
              </span>
              {sidebarOpen && (
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform duration-200 ${productDropdownOpen ? 'rotate-180' : ''}`}
                />
              )}
            </button>

            {productDropdownOpen && sidebarOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <Link href="/dashboard/products/add" className="block text-sm text-gray-600 hover:bg-gray-500 hover:text-white p-1 px-3 rounded-md">Add Product</Link>
                <Link href="/dashboard/products/inventory" className="block text-sm text-gray-600 hover:bg-gray-500 hover:text-white p-1 px-3 rounded-md">Inventory</Link>
                <Link href="/dashboard/products/collection" className="block text-sm text-gray-600 hover:bg-gray-500 hover:text-white p-1 px-3 rounded-md">Collection</Link>
              </div>
            )}
          </div>
          {/* Order Dropdown */}
          <div>
            <button
              onClick={() => {
                setOrderDropdownOpen(!orderDropdownOpen); // open dropdown
                router.push("/dashboard/orders"); // navigate
              }}
              className="w-full flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <span className="flex items-center">
                <ClipboardListIcon className="w-5 h-5 mr-3" />
                {sidebarOpen && <span>Orders</span>}
              </span>
              {sidebarOpen && (
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform duration-200 ${orderDropdownOpen ? 'rotate-180' : ''}`}
                />
              )}
            </button>

            {orderDropdownOpen && sidebarOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <Link href="/dashboard/orders/draft" className="block text-sm text-gray-600 hover:bg-gray-500 hover:text-white p-1 px-3 rounded-md">Draft</Link>
                <Link href="/dashboard/orders/abandoned-orders" className="block text-sm text-gray-600 hover:bg-gray-500 hover:text-white p-1 px-3 rounded-md">Abandoned Orders</Link>
              </div>
            )}
          </div>
          {/* Order Dropdown */}
          <div>
            <button
              onClick={() => {
                setCustomerDropdownOpen(!customerDropdownOpen); // open dropdown
                router.push("/dashboard/customers"); // navigate
              }}
              className="w-full flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <span className="flex items-center">
                <User className="w-5 h-5 mr-3" />
                {sidebarOpen && <span>Customers</span>}
              </span>
              {sidebarOpen && (
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform duration-200 ${customerDropdownOpen ? 'rotate-180' : ''}`}
                />
              )}
            </button>

            {customerDropdownOpen && sidebarOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <Link href="/dashboard/customers/segments" className="block text-sm text-gray-600 hover:bg-gray-500 hover:text-white p-1 px-3 rounded-md">Segments</Link>
              </div>
            )}
          </div>
          <Link href="/dashboard/discounts" className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <BadgePercent className="w-5 h-5 mr-3" />
            {sidebarOpen && <span>Discounts</span>}
          </Link>
          <div>
            <button
              onClick={() => {
                setContentDropdownOpen(!contentDropdownOpen); // open dropdown
                router.push("/dashboard/content"); // navigate
              }}
              className="w-full flex items-center justify-between px-2 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <span className="flex items-center">
                <ShoppingBagIcon className="w-5 h-5 mr-3" />
                {sidebarOpen && <span>Content</span>}
              </span>
              {sidebarOpen && (
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform duration-200 ${contentDropdownOpen ? 'rotate-180' : ''}`}
                />
              )}
            </button>

            {contentDropdownOpen && sidebarOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <Link href="/dashboard/content/blog" className="block text-sm text-gray-600 hover:bg-gray-500 hover:text-white p-1 px-3 rounded-md">Blog Post</Link>
               
              </div>
            )}
          </div>

          
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">

        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:block hidden text-gray-600 focus:outline-none"
            >
              {sidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
            <div className="text-lg font-semibold text-gray-700">Admin Dashboard</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Admin</span>
            <UserCircleIcon className="w-6 h-6 text-gray-500" />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <wc-toast></wc-toast>

          {children}
          </main>
      </div>
    </div>
  );
}
