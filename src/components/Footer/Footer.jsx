import {
    FiMail, FiPhone, FiMapPin, FiGlobe, FiDollarSign, FiLink // Feather Icons
} from 'react-icons/fi';
import {
    FaFacebook, FaInstagram, FaYoutube, FaTiktok // Font Awesome Icons
} from 'react-icons/fa';
import { Globe } from 'lucide-react';



export default function Footer() {
    const companyLinks = ['About Us', 'Contact Us', 'Our Store', 'Store Location', 'FAQ'];
    const quickLinks = ['Privacy Policy', 'Terms & Conditions', 'Sale', 'Size guide', 'Wishlist', 'Compare'];
    const socialIcons = [
        { icon: <FaFacebook />, label: 'Facebook' },
        { icon: <FaInstagram />, label: 'Instagram' },
        { icon: <FaTiktok />, label: 'TikTok' },
        { icon: <FaYoutube />, label: 'YouTube' },
        { icon: <FiLink />, label: 'More' }, // or rename the label
    ];


    return (
        <footer className="bg-[#F5F4F1] text-gray-700 pt-12 pb-6 px-4">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
                {/* Logo & Description */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">milano</h1>
                    <p className="text-sm leading-6">
                        We only carry designs we believe in ethically and aesthetically – original, authentic pieces that are made to last.{' '}
                        <a href="#" className="text-black font-semibold underline">Learn more</a>
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <FiMapPin size={16} /> Street Address 2571 Oakridge
                        </li>
                        <li className="flex items-center gap-2">
                            <FiPhone size={16} /> +1 (973) 435-3638
                        </li>
                        <li className="flex items-center gap-2">
                            <FiMail size={16} /> info@fashionwomen.com
                        </li>

                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Our Company</h3>
                    <ul className="space-y-2 text-sm">
                        {companyLinks.map(link => (
                            <li key={link}>
                                <a href="#" className="hover:underline">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick links</h3>
                    <ul className="space-y-2 text-sm">
                        {quickLinks.map(link => (
                            <li key={link}>
                                <a href="#" className="hover:underline">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter Signup */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Sign Up to Newsletter</h3>
                    <p className="text-sm mb-4">Subscribe for store updates and discounts.</p>
                    <div className="flex mb-3">
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            className="flex-grow px-4 py-2 rounded-l-full bg-white border border-gray-300 focus:outline-none text-sm"
                        />
                        <button className="px-4 py-2 bg-black text-white rounded-r-full text-sm font-medium hover:bg-gray-900 transition">
                            Sign Up
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">
                        ***By entering the e-mail you accept the{' '}
                        <span className="font-semibold underline">terms and conditions</span> and the{' '}
                        <span className="font-semibold underline">privacy policy</span>.
                    </p>
                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4">
                        {socialIcons.map(({ icon, label }, index) => (
                            <button
                                key={index}
                                aria-label={label}
                                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-10 pt-4 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
                <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>United States (USD $)</span>
                </div>
                <div>© 2025 Milano store. All rights reserved.</div>
                <div className="flex items-center gap-1">
                    {/* Dummy payment logos (replace with images if needed) */}
                    <img src="/visa.svg" alt="Visa" className="h-4" />
                    <img src="/mastercard.svg" alt="Mastercard" className="h-4" />
                    <img src="/paypal.svg" alt="PayPal" className="h-4" />
                    <img src="/amex.svg" alt="Amex" className="h-4" />
                    <img src="/discover.svg" alt="Discover" className="h-4" />
                </div>
            </div>
        </footer>
    );
}
