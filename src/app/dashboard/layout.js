// app/admin/layout.js

import Link from "next/link";
import "@/app/globals.css"; // if needed
import { UserCircleIcon, ShoppingBagIcon, ClipboardListIcon, HomeIcon } from "lucide-react";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <HomeIcon className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/dashboard/products" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <ShoppingBagIcon className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link href="/dashboard/orders" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <ClipboardListIcon className="w-5 h-5 mr-3" />
            Orders
          </Link>
          <Link href="/dashboard/promotion" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <ClipboardListIcon className="w-5 h-5 mr-3" />
            Promotion
          </Link>
          <Link href="/dashboard/users" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <UserCircleIcon className="w-5 h-5 mr-3" />
            Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <div className="text-lg font-semibold text-gray-700">Admin Dashboard</div>
          <div className="flex items-center gap-4">
            {/* Replace with user avatar / name / logout */}
            <span className="text-gray-600">Admin</span>
            <UserCircleIcon className="w-6 h-6 text-gray-500" />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
