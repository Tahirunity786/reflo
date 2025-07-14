'use client';
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
        title: 'The Best Product',
        subtitle: 'Our Factories',
        description:
            'We spend a lot of time finding the best factories around the world—the same factories that make your favorite designer brands. We visit them regularly and build strong personal relationships with the owners. Each factory is audited for compliance to ensure factors such as fair wages.',
        imageUrl: 'https://placehold.co/600x400/4a5568/ffffff?text=Team+Meeting',
        imageAlt: 'Professional team meeting in modern office...',
        reverse: false,
    },
    {
        id: 2,
        title: 'Timeless Products',
        subtitle: 'Our Products',
        description:
            "At Mijome, we are not big on trends. We want you to wear our pieces for years, even decades, to come. That's why we source the finest materials and factories for our timeless products—like our Grade-A cashmere sweaters, Italian shoes, and Peruvian Pima tees.",
        imageUrl: 'https://placehold.co/600x400/4a5568/ffffff?text=Study+Group',
        imageAlt: 'Students studying together in a library setting...',
        reverse: true,
    },
];

const workCultureData = [
    {
        id: 1,
        title: 'The Core of Us',
        description:
            'Adipiscing elit sed do eiusmod tempor labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageUrl: 'https://placehold.co/400x300/f3f4f6/6b7280?text=Team+Meeting',
        imageAlt:
            'Team meeting with diverse group of people collaborating around a table with laptops and documents',
    },
    {
        id: 2,
        title: 'Our Products',
        description:
            'Adipiscing elit sed do eiusmod tempor labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageUrl: 'https://placehold.co/400x300/3b82f6/ffffff?text=Delivery+Service',
        imageAlt:
            'Smiling delivery person in blue uniform holding a cardboard package in a warehouse setting',
    },
    {
        id: 3,
        title: 'Our Careers',
        description:
            'Adipiscing elit sed do eiusmod tempor labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageUrl:
            'https://placehold.co/400x300/f3f4f6/6b7280?text=Professional+Team',
        imageAlt:
            'Professional business meeting with people in suits working with laptops and documents in modern office',
    },
];
export default function AboutHero() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-14 text-center space-y-10">

            {/* Welcome Text & Heading */}
            <div className="mb-22">
                <div>
                    <p className="text-sm text-gray-500 font-medium uppercase mb-2">Welcome to Milano</p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Best Store <br className="sm:hidden" />
                        <span className="text-black">Available to Everyone!</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
                        Over 15 years of experience, we have meticulously curated collections that transcend fleeting trends,
                        embodying a timeless elegance that resonates with our discerning clientele.
                    </p>
                </div>

                {/* Team Image */}
                <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-md">
                    <Image
                        src="/team.jpg" // Replace with your actual image path
                        alt="Team photo"
                        width={1200}
                        height={600}
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
                            <p className="text-blue-600 text-sm font-medium mb-2 dark:text-blue-400">
                                {subtitle}
                            </p>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 dark:text-white">
                                {title}
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed dark:text-gray-300">
                                {description}
                            </p>
                            <button
                                type="button"
                                className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors px-8 py-3 rounded-full font-medium"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="px-8">
            {/* Section Heading */}
            <div className="text-center mb-16">
                <p className="text-sm font-medium text-gray-600 mb-4 dark:text-gray-400">How We Work</p>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 dark:text-white">Expanding Horizons</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mx-auto leading-relaxed max-w-4xl">
                    At Millers, our work culture is deeply rooted in collaboration, innovation and passion.
                    We believe that a positive and inclusive work environment is the foundation for creativity and success.
                </p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {workCultureData.map(({ id, title, description, imageUrl, imageAlt }) => (
                    <div key={id} className="text-center">
                        <div className="mb-6">
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                className="w-full h-64 object-cover rounded-lg"
                                loading="lazy"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">{title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
                    </div>
                ))}
            </div>
            </div>
        </section>
    );
}
