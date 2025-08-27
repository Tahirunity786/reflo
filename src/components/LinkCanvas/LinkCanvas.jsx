"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * Reusable OffCanvas Component
 * - Opens from the left side with smooth animation
 * - Fully responsive (works on all devices)
 * - Click outside (overlay) or close button to dismiss
 * - Uses TailwindCSS + Framer Motion for animations
 */
export default function LinkCanvas() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


  const handleNavigation = url => {
    router.push(url);
    setIsOpen(false);
  }
  return (
    <div>
      {/* === Toggle Button === */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Menu"
        className="p-2 lg:hidden sm:block border-gray-600 border text-white shadow-md 
                   hover:bg-gray-600 hover:text-white transition focus:outline-none rounded-sm"
      >
        <Menu size={24} className="text-black hover:text-white" />
      </button>

      {/* === Overlay & Offcanvas Wrapper === */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* === Background Overlay === */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            {/* === Offcanvas Panel (Left Side) === */}
            <motion.aside
              initial={{ x: "-100%" }} // Start from left (hidden)
              animate={{ x: 0 }}       // Slide into view
              exit={{ x: "-100%" }}    // Slide back out
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed left-0 top-0 h-full w-4/5 sm:w-80 
                         bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* === Header === */}
              <header className="flex items-center justify-between px-4 py-3 border-b">
                <Image
                  src={'/Image/Logo.png'}
                  onClick={() => router.push('/')}
                  className='cursor-pointer'
                  alt='Logo'
                  width={130}
                  height={80}
                  priority
                />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                >
                  <X size={20} />
                </button>
              </header>

              {/* === Content Area === */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-4">

                <span onClick={() => { handleNavigation('/') }} className="block cursor-pointer text-gray-700 hover:text-black">
                  Home
                </span>
                <span onClick={() => { handleNavigation('/shop') }} className="block cursor-pointer text-gray-700 hover:text-black">
                  Shop
                </span>
                <span onClick={() => { handleNavigation('/collection') }} className="block cursor-pointer text-gray-700 hover:text-black">
                  Collection
                </span>
                <span onClick={() => { handleNavigation('/blogs') }} className="block cursor-pointer text-gray-700 hover:text-black">
                  Blogs
                </span>
                <span onClick={() => { handleNavigation('/aboutus') }} className="block cursor-pointer text-gray-700 hover:text-black">
                  About Us
                </span>
              </nav>

              {/* === Footer / CTA === */}
              <footer className="p-4 border-t border-gray-500">
                <p className="text-sm">© 2025 DoorBix. All rights reserved.</p>
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
