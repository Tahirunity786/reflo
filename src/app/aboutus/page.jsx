'use client';
import Header from '@/components/Header/Header';
import Image from 'next/image';

// Stats data array (DRY principle)
const stats = [
    {
        value: '53 k',
        title: 'Products for Sale',
        desc: 'That’s why we strive to offer a diverse range of products that cater to all styles.',
    },
    {
        value: '8.5 k',
        title: 'Happy Customer',
        desc: 'We pride ourselves on creating great products and experiences with our valued customers.',
    },
    {
        value: '13 k',
        title: 'Partner Brand',
        desc: 'Partner with brands that share our values, striving to protect our environment.',
    },
];
const showcaseData = [
    {
        id: 1,
        title: 'Quality You Can Trust in the UAE',
        subtitle: 'Our Factories',
        description:
            `
             At DOORBIX, we carefully select trusted suppliers and manufacturers within the UAE to bring you reliable products with uncompromised quality. Every partner is reviewed to ensure they meet our standards for excellence, safety, and ethical practices. By working closely with local suppliers, we make sure your products are sourced responsibly and delivered to your doorstep with speed and care.`,
        imageUrl: '/Image/about-3.jpeg',
        imageAlt: 'Our Factories',
        reverse: false,
    },
    {
        id: 2,
        title: 'Our Products',
        subtitle: 'Reliable & Essential',
        description:
            "At DOORBIX, we focus on products that truly matter to our customers in the UAE. Instead of chasing trends, we carefully select everyday essentials and high-quality items from trusted local suppliers, delivered right to your doorstep with care and reliability.",
        imageUrl: '/Image/about-4.png',
        imageAlt: 'Our Products',
        reverse: true,
    },
];

const workCultureData = [
    {
        id: 1,
        title: 'The Core of Us',
        description:
            `Built on Trust & Reliability
At DOORBIX, everything we do starts with our customers. We believe in making shopping simple, affordable, and stress-free by delivering quality products right to your doorstep. Our commitment to trust, care, and efficiency is at the heart of every delivery.`,
        // imageUrl: 'https://placehold.co/400x300/f3f4f6/6b7280?text=Team+Meeting',
        imageAlt:
            "Core of us",
    },
    {
        id: 2,
        title: 'Our Products',
        description: `Quality at Your Doorstep
        At DOORBIX, we handpick products that bring value, convenience, and reliability to our customers across the UAE. By working with trusted suppliers, we make sure every item meets our standards of quality—delivered straight to your doorstep with care and speed.`,
        // imageUrl: 'https://placehold.co/400x300/3b82f6/ffffff?text=Delivery+Service',
        // imageAlt:
        //     'Smiling delivery person in blue uniform holding a cardboard package in a warehouse setting',
    },
    {
        id: 3,
        title: 'Our Careers',
        description: `Grow With Us
        At DOORBIX, we believe our people are the driving force behind every successful delivery. We’re building a culture of innovation, teamwork, and growth, where every role makes a real impact. If you’re passionate about shaping the future of doorstep delivery in the UAE, DOORBIX is the place to be.`,
        // imageUrl:
        //     'https://placehold.co/400x300/f3f4f6/6b7280?text=Professional+Team',
        // imageAlt:
        //     'Professional business meeting with people in suits working with laptops and documents in modern office',
    },
];

const metaData = {
    title: `DoorBix || About Us`,
    description: `Discover DoorBix – a trusted platform dedicated to providing quality products, exceptional service, and a seamless shopping experience for our valued customers.`,
    image: `https://www.doorbix.com/Image/Logo.png`,
    pageUrl: `https://www.doorbix.com/shop/aboutus`,
}

export default function AboutHero() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-14 text-center space-y-10">
            <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />

            {/* Welcome Text & Heading */}
            <div className="mb-22">
                <div>
                    <p className="text-sm text-gray-500 font-medium uppercase mb-2">Welcome to DoorBix</p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Best Store <br className="sm:hidden" />
                        <span className="text-black">Available to Everyone!</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
                        With years of expertise in logistics and e-commerce, DOORBIX has built a reliable platform that goes beyond just shipping. We are committed to making doorstep delivery simple, fast, and trustworthy, ensuring every product reaches our customers with care and efficiency.
                    </p>
                </div>

                {/* Team Image */}
                <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-md">
                    <Image
                        src={"/Image/about-1.jpeg"} // Replace with your actual image path
                        alt="Team photo"
                        width={1200}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 text-center">
                    {stats.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <h3 className="text-2xl font-bold text-black">{item.value}</h3>
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-sm text-gray-600 max-w-xs mx-auto">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Commitment to Quality</h2>
                {showcaseData.map(({ id, title, subtitle, description, imageUrl, imageAlt, reverse }) => (
                    <div
                        key={id}
                        className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                            } gap-12 items-center mb-24`}
                    >
                        {/* Image section */}
                        <div className="lg:w-1/2 w-full">
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                className="w-full h-auto rounded-lg shadow-lg"
                                loading="lazy"
                            />
                        </div>

                        {/* Text content */}
                        <div className="lg:w-1/2 w-full text-center lg:text-left">
                            <p className="text-blue-600 text-sm font-medium mb-2">
                                {subtitle}
                            </p>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                {title}
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed ">
                                {description}
                            </p>
                            {/* <button
                                type="button"
                                className="bg-gray-900 text-white hover:bg-gray-800 transition-colors px-8 py-3 rounded-full font-medium"
                            >
                                Learn More
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
            <div className="px-8">
                {/* Section Heading */}
                <div className="text-center mb-16">
                    <p className="text-sm font-medium text-gray-600 mb-4 ">How We Work</p>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 ">From Us to Your Doorstep</h2>
                    <p className="text-lg text-gray-600 mx-auto leading-relaxed max-w-4xl">
                        At DOORBIX, we keep it simple: you choose, we deliver. By working with trusted local suppliers and using fast, reliable logistics, we make sure your products arrive at your doorstep quickly and safely. Our mission is to give you a smooth, stress-free shopping experience, every single time.
                    </p>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {workCultureData.map(({ id, title, description, imageUrl, imageAlt }) => (
                        <div key={id} className="text-center">
                            {/* <div className="mb-6">
                                <img
                                    src={imageUrl}
                                    alt={imageAlt}
                                    className="w-full h-64 object-cover rounded-lg"
                                    loading="lazy"
                                />
                            </div> */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
                            <p className="text-gray-600 leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
