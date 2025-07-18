'use client';
import React, { useState } from 'react';
import {
  FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPinterestP,
} from 'react-icons/fa';
import {
  FiSearch, FiUser, FiHeart, FiShoppingCart,
} from 'react-icons/fi';

import CartSidebar from '../CartSidebar/CartSidebar';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import SearchModal from '../SearchModal/SearchModal';

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
  const [isCartOpen, setCartOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  // Open SignIn and ensure SignUp is closed
  const openSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  // Switch from SignIn to SignUp
  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  return (
    <>
      <header className="w-full">
        {/* Top Bar */}
        <div className="bg-black text-white text-sm flex justify-between items-center px-4 lg:px-8 py-2">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Welcome Milano store!</span>
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
            <a href="/contact" className="hover:text-white">
              Help Center
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 lg:px-8 py-4">

            <div className="text-3xl font-bold tracking-tight">milano</div>

            <nav className="hidden lg:flex space-x-8 font-dm font-bold">
              {navLinks.map((link, index) => (
                <a key={index} href={link.link} className="hover:text-black">
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4 text-black">
              <NavIcon icon={<FiSearch />} onClick={() => setIsSearchOpen(true)} />
              <NavIcon icon={<FiUser />} onClick={openSignIn} />
              <NavIcon icon={<FiHeart />} badge="0" />
              <NavIcon
                icon={<FiShoppingCart />} badge="1"
                onClick={() => setCartOpen(true)}
              />
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
        onSwitchToSignUp={switchToSignUp}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
      />

      {/* Search Model */}
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
