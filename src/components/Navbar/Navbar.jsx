
'use client';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

const socialIcons = [
  { icon: <FaFacebookF />, label: 'Facebook' },
  { icon: <FaInstagram />, label: 'Instagram' },
  { icon: <FaTiktok />, label: 'TikTok' },
  { icon: <FaYoutube />, label: 'YouTube' },
  { icon: <FaPinterestP />, label: 'Pinterest' },
];

const navLinks = ['Home', 'Shop', 'Products', 'Blog', 'About us'];

export default function Navbar() {
  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm flex justify-between items-center px-4 lg:px-8 py-2">
        {/* Left: Welcome + Social Icons */}
        <div className="flex items-center space-x-4">
          <span className="font-semibold">Welcome Milano store!</span>
          <div className="flex space-x-2 text-white">
            {socialIcons.map((item, index) => (
              <span key={index} className="cursor-pointer hover:text-pink-400" aria-label={item.label}>
                {item.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Center: Promotion */}
        <div className="hidden md:flex items-center space-x-1">
          <span>Coats—every friday 75% Off .</span>
          <span className="font-semibold underline cursor-pointer hover:text-pink-400">Shop Sale</span>
        </div>

        {/* Right: Language & Help */}
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-white">Help Center</a>
          {/* <div className="flex items-center space-x-1 cursor-pointer">
            <img src="https://flagcdn.com/us.svg" alt="US Flag" className="w-5 h-5 rounded-full" />
            <span>United States (USD $)</span>
            <IoIosArrowDown />
          </div> */}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-4 lg:px-8 py-4 bg-white shadow-sm">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-tight">milano</div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-8 font-dm font-bold">
          {navLinks.map((link, index) => (
            <a key={index} href="#" className="hover:text-black">
              {link}
            </a>
          ))}
        </nav>

        {/* Actions: Search, Profile, Wishlist, Cart */}
        <div className="flex items-center space-x-4 text-black">
          <NavIcon icon={<FiSearch />} />
          <NavIcon icon={<FiUser />} />
          <NavIcon icon={<FiHeart />} badge="0" />
          <NavIcon icon={<FiShoppingCart />} badge="0" />
        </div>
      </div>
    </header>
  );
}

// Reusable NavIcon Component with optional badge
function NavIcon({ icon, badge }) {
  return (
    <div className="relative">
      <span className="text-xl cursor-pointer hover:text-pink-500">{icon}</span>
      {badge && (
        <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
  );
}
