import {
    FiMail, FiPhone, FiMapPin, FiGlobe, FiDollarSign, FiLink // Feather Icons
} from 'react-icons/fi';
import {
    FaFacebook, FaInstagram, FaYoutube, FaTiktok // Font Awesome Icons
} from 'react-icons/fa';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';



export default function Footer() {

    const companyLinks = [
        { name: "Home", link: "/" },
        { name: "Shop", link: "/shop" },
        { name: "Blog", link: "/blogs" },
        { name: "Collection", link: "/collection" },
        { name: "About Us", link: "/aboutus" },
        { name: "Contact Us", link: "/contact" },

    ]
    const quickLinks = [
        { name: 'Privacy Policy', link: "/privacy" },
        { name: 'Terms & Conditions', link: "/terms-conditions" },
        // { name: 'Refund', link: "/refund" },

    ]
    const socialIcons = [
        { icon: <FaFacebook />, label: 'Facebook', url: "https://www.facebook.com/share/1BJdTBv7Yn/" },
        { icon: <FaInstagram />, label: 'Instagram', url: "https://www.instagram.com/doorbix_store?igsh=MWdxeTUxcjJoaGtrZg==" },
        { icon: <FaTiktok />, label: 'TikTok', url: "https://www.tiktok.com/@doorbix.store?_t=ZS-8zEgiMj1cYs&_r=1" },
    ];


    return (
        <footer className="bg-[#F5F4F1] text-gray-700 pt-12 pb-6 px-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
                {/* Logo & Description */}
                <div>
                    <Image
                        src={'/Image/Logo.png'}
                        onClick={() => router.push('/')}
                        className='cursor-pointer'
                        alt='Logo'
                        width={130}
                        height={80}
                        priority
                    />
                    <p className="text-sm leading-6">
                        We only carry designs we believe in ethically and aesthetically – original, authentic pieces that are made to last.{' '}
                        <Link
                            href="/aboutus"
                            aria-label="Learn more about us"
                            prefetch={false}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                        >
                            Learn more →
                        </Link>
                        {/* <a href="#" className="text-black font-semibold underline"></a> */}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <FiMail size={16} /> info@doorbix.com
                        </li>

                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Our Company</h3>
                    <ul className="space-y-2 text-sm">
                        {companyLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.link} className="hover:underline">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.link} className="hover:underline">
                                    {link.name}
                                </Link>
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
                        {socialIcons.map(({ icon, label, url }, index) => (
                            <a
                                key={index}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
                            >
                                {icon}
                            </a>
                        ))}

                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-10 pt-4 border-t border-gray-300 flex flex-col md:flex-row justify-center items-center text-sm text-gray-600 gap-4">

                <div>© 2025 Milano store. All rights reserved.</div>

            </div>
        </footer>
    );
}
