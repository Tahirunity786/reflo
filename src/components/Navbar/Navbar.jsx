'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPinterestP,
} from 'react-icons/fa';
import {
  FiSearch, FiUser, FiHeart, FiShoppingCart,
  FiStar,
  FiPackage,
  FiGift,
  FiLogOut,
} from 'react-icons/fi';

import CartSidebar from '../CartSidebar/CartSidebar';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import SearchModal from '../SearchModal/SearchModal';
import { ShoppingBasketIcon } from 'lucide-react';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const socialIcons = [
  { icon: <FaFacebookF />, label: 'Facebook' },
  { icon: <FaInstagram />, label: 'Instagram' },
  { icon: <FaTiktok />, label: 'TikTok' },
  { icon: <FaYoutube />, label: 'YouTube' },
  { icon: <FaPinterestP />, label: 'Pinterest' },
];

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "Collection", link: "/collection" },
  { name: "Blogs", link: "/blogs" },
  { name: "About us", link: "/aboutus" },
];

export default function Navbar() {
  const router = useRouter();
  const [isCartOpen, setCartOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      try {
        setAuthUser(JSON.parse(user));
      } catch {
        setAuthUser(user);
      }
    }
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle user icon click
  const handleUserClick = () => {
    if (authUser) {
      setDropdownOpen((prev) => !prev);
    } else {
      setShowSignIn(true);   // 👈 instead of setShowSignUp(true)
    }
  };

  const logoutHandler = () => {
    Cookies.remove('user');
    setAuthUser(null);
    setDropdownOpen(false);
    window.location.reload()
  };

  return (
    <>
      <header className="w-full">
        {/* Top Bar */}
        <div className="bg-black text-white text-sm flex justify-between items-center px-4 lg:px-8 py-2">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Welcome DoorBix store!</span>
            <div className="flex space-x-2 text-white">
              {socialIcons.map((item, index) => (
                <span
                  key={index}
                  className="cursor-pointer hover:text-pink-400"
                  aria-label={item.label}
                >
                  {item.icon}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <span>Coats—every Friday 75% Off.</span>
            <span className="font-semibold underline cursor-pointer hover:text-pink-400">
              Shop Sale
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/contact" className="hover:text-white">Help Center</a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 lg:px-8 py-4">
            <div className="text-3xl font-bold tracking-tight flex items-center space-x-2.5">
              <div><ShoppingBasketIcon width={32} height={32} /></div>
              <div>DoorBix</div>
            </div>

            <nav className="hidden lg:flex space-x-8 font-dm font-bold">
              {navLinks.map((link, index) => (
                <a key={index} href={link.link} className="hover:text-black">
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4 text-black relative">
              <NavIcon icon={<FiSearch />} onClick={() => setIsSearchOpen(true)} />
              {/* User Icon */}
              <div ref={dropdownRef} className="relative">
                <NavIcon icon={<FiUser />} onClick={handleUserClick} />
                {/* Dropdown for Auth User */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                    >
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <a href="/my-reviews" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                            <FiStar className="text-gray-500" /> My Reviews
                          </a>
                        </li>
                        <li>
                          <a href="/my-orders" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                            <FiPackage className="text-gray-500" /> My Orders
                          </a>
                        </li>
                        <li>
                          <a href="/vouchers" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                            <FiGift className="text-gray-500" /> Vouchers
                          </a>
                        </li>
                        <li>
                          <a href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                            <FiUser className="text-gray-500" /> Profile
                          </a>
                        </li>
                        <li>
                          <button
                            onClick={logoutHandler}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            <FiLogOut className="text-gray-500" /> Logout
                          </button>
                        </li>
                      </ul>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <NavIcon icon={<FiHeart />} onClick={() => router.push("/wishlist")} badge="0" />
              <NavIcon icon={<FiShoppingCart />} badge="1" onClick={() => setCartOpen(true)} />
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

// Reusable NavIcon Component
function NavIcon({ icon, badge, onClick }) {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <span className="text-xl hover:text-pink-500">{icon}</span>
      {badge && (
        <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
  );
}
