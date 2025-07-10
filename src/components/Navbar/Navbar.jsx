'use client';
import {
  FaSearch,
  FaUser,
  FaLock,
  FaPhoneAlt,
  FaEnvelope,
  FaShoppingCart,
  FaHeart,
} from 'react-icons/fa';
import { PiBagSimpleBold } from 'react-icons/pi';
import { HiMiniMapPin } from 'react-icons/hi2';
import {
  BiLogoFacebook,
  BiLogoPinterestAlt,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoDribbble,
} from 'react-icons/bi';
import { FiX } from 'react-icons/fi';
import { TbBrandSkype } from 'react-icons/tb';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="border-b border-gray-200 text-sm">
      {/* === Top Header (Contact Info + Social Links) === */}
      <div className="bg-white px-4 py-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-gray-600">
        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
          {/* <span className="flex items-center gap-1"><HiMiniMapPin /> Themefreesia, Abc Building, 5th Floor, Zyz Street</span>
          <span className="flex items-center gap-1"><FaPhoneAlt /> (123) 456-7890</span>
          <span className="flex items-center gap-1"><FaEnvelope /> support@support.com</span>
          <span className="flex items-center gap-1"><TbBrandSkype /> themefreesia</span> */}
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 justify-start md:justify-end">
          <Link href="#" className="flex items-center gap-1 text-sm mb-0"> My Account</Link>
          <Link href="#" className="flex items-center gap-1 text-sm mb-0"> Login</Link>
        </div>
      </div>

      {/* === Main Navbar === */}
      <div className="bg-white py-4 px-4 lg:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo + Tagline */}
        <div className="flex items-center gap-3">
          <PiBagSimpleBold className="text-4xl text-orange-500" />
          <div>
            <h1 className="text-2xl font-bold text-orange-500 leading-tight">Reflo</h1>
            <p className="text-xs tracking-wider text-gray-600">CHOOSE AND PURCHASE</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:max-w-xl">
          <div className="flex border border-orange-400 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 outline-none text-sm"
            />
            <button className="bg-orange-500 p-3 text-white hover:bg-orange-600 transition">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Account Links + Cart */}
        <div className="flex items-center flex-wrap justify-between md:justify-end gap-4 text-sm text-gray-700 w-full md:w-auto">
          
          <Link href="#" className="relative flex items-center gap-1">
            <FaHeart className='h-5 w-5' />
            <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </Link>
          <Link href="#" className="relative flex items-center gap-1">
            <FaShoppingCart className='h-5 w-5' />
            <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">1</span>
        
          </Link>
        </div>
      </div>

      {/* === Bottom Navigation Menu === */}
      <nav className="bg-white border-t border-gray-200 px-4 lg:px-6">
        <ul className="flex flex-wrap items-center gap-6 py-2 text-gray-700 font-medium text-sm">
          <li><Link href="/" className="flex items-center gap-1 text-orange-500 font-bold"> Home</Link></li>
          <li><Link href="/shop" className="flex items-center gap-1"> Shop</Link></li>
          {/* <li><Link href="#" className="flex items-center gap-1"> Blog</Link></li> */}
          <li><Link href="/contact" className="flex items-center gap-1"> Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
