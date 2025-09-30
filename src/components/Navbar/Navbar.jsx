"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiLogOut, FiGift, FiPackage, FiStar } from "react-icons/fi";

import CartSidebar from "../CartSidebar/CartSidebar";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import SearchModal from "../SearchModal/SearchModal";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/redux/slices/cartSlice";
import { selectWishlistCount } from "@/redux/slices/wishSlice";
import Image from "next/image";
import LinkCanvas from "../LinkCanvas/LinkCanvas";
import { User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const socialIcons = [
  { icon: <FaFacebookF />, label: "Facebook", url: "https://www.facebook.com/share/1BJdTBv7Yn/" },
  { icon: <FaInstagram />, label: "Instagram", url: "https://www.instagram.com/doorbix_store?igsh=MWdxeTUxcjJoaGtrZg==" },
  { icon: <FaTiktok />, label: "TikTok", url: "https://www.tiktok.com/@doorbix.store?_t=ZS-8zEgiMj1cYs&_r=1" },
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

  // UI state
  const [isCartOpen, setCartOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // refs + measurement state
  const topBarRef = useRef(null);     // optional announcement/top bar
  const mainNavRef = useRef(null);    // the navbar we toggle fixed/static
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [navTop, setNavTop] = useState(Infinity);
  const [navHeight, setNavHeight] = useState(0);

  // whether nav is fixed (pinned to viewport)
  const [isMainFixed, setIsMainFixed] = useState(false);
  const [isTopBarFixed, setIsTopBarFixed] = useState(false);

  // redux selectors
  const cartLength = useSelector(selectCartCount);
  const wishLength = useSelector(selectWishlistCount);

  // load user from cookie once on mount
  useEffect(() => {
    const user = Cookies.get("user");
    const access = Cookies.get("access");
    if (user && access) {
      try {
        setAuthUser(JSON.parse(user));
      } catch {
        setAuthUser(user);
      }
    }
  }, []);

  // measure topBar and main nav positions/heights (run on mount + resize)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const topEl = topBarRef.current;
      const navEl = mainNavRef.current;

      // detect if topBar is actually fixed (sometimes you style it fixed).
      const topFixed = topEl ? window.getComputedStyle(topEl).position === "fixed" : false;
      setIsTopBarFixed(topFixed);
      const topH = topFixed ? (topEl?.offsetHeight ?? 0) : 0;
      setTopBarHeight(topH);

      if (navEl) {
        const rect = navEl.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        // When top bar is fixed we offset navTop by topH, otherwise no offset (top:0)
        setNavTop(absoluteTop - (topFixed ? topH : 0));
        setNavHeight(navEl.offsetHeight);
      }
    };

    // initial compute and on resize
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // toggle fixed state on scroll (rAF throttled)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const currentY = window.scrollY || window.pageYOffset;
        if (currentY >= navTop && !isMainFixed) {
          setIsMainFixed(true);
        } else if (currentY < navTop && isMainFixed) {
          setIsMainFixed(false);
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [navTop, isMainFixed]);

  // close dropdown when clicking outside
  // useEffect(() => {
  //   function handleClickOutside(e) {
  //     const dd = document.getElementById("nav-user-dropdown");
  //     if (dd && !dd.contains(e.target)) {
  //       setIsDropdownOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const logoutHandler = () => {
    Cookies.remove("user");
    Cookies.remove("access");
    setAuthUser(null);
    setIsDropdownOpen(false);
    if (typeof window !== "undefined") window.location.reload();
  };

  return (
    <>
      <header className="w-full">
        {/* Announcement / Top Bar (static by default; if you style as fixed it will be detected) */}
        <div
          ref={topBarRef}
          className="w-full bg-black text-white text-sm flex justify-between items-center px-4 lg:px-8 py-2"
        >
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Welcome To DoorBix</span>
            <div className="flex space-x-2 text-white">
              {socialIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="cursor-pointer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <a href="/contact" className="hover:text-white">
              Help Center
            </a>
          </div>
        </div>

        {/* spacer to preserve layout when nav becomes fixed */}
        <div style={{ height: isMainFixed ? navHeight : 0 }} aria-hidden="true" />

        {/* Main Navbar — toggles fixed/relative */}
        <div
          ref={mainNavRef}
          className={`bg-white transition-all ${isMainFixed ? "fixed left-0 right-0 z-[100] shadow-sm" : "relative"}`}
          style={isMainFixed ? { top: isTopBarFixed ? topBarHeight : 0 } : {}}
        >
          <div className="flex justify-between items-center px-4 lg:px-8 py-4">
            <div className="text-3xl font-bold tracking-tight flex items-center space-x-2.5">
              <Image
                src={"/Image/Logo.png"}
                onClick={() => router.push("/")}
                className="cursor-pointer"
                alt="Logo"
                width={130}
                height={80}
                priority
              />
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
              <div className="relative" id="nav-user-dropdown">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (authUser) setIsDropdownOpen((p) => !p);
                    else setShowSignIn(true);
                  }}
                >
                  <FiUser className="w-5 h-5" />
                </div>

                <AnimatePresence>
                  {isDropdownOpen && authUser && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                    >
                      <ul className="py-2 text-sm text-gray-700">
                        {/* <li>
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
                        </li> */}
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

              <NavIcon icon={<FiHeart />} onClick={() => router.push("/wishlist")} badge={`${wishLength}`} />
              <NavIcon icon={<FiShoppingCart />} badge={`${cartLength}`} onClick={() => setCartOpen(true)} />
            </div>
          </div>

          {/* mobile LinkCanvas area */}
          <div className="px-4 pb-2 sm:px-4 sm:pb-4 lg:hidden">
            <LinkCanvas />
          </div>
        </div>
      </header>

      {/* Cart Sidebar & Modals */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

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
