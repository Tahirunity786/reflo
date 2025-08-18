'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Heart, Truck, ShieldCheck, Badge } from 'lucide-react';
import BestSellingProducts from '../BestSellingProducts/BestSellingProducts';
import PurchaseOptions from '../PurchaseOptions/PurchaseOptions';
import ProductInfoTabs from '../ProductInfoTabs/ProductInfoTabs';
import Header from '../Header/Header';

const LoadingState = () => {
    return (
        <section className="max-w-screen-xl mx-auto px-8 py-8 animate-pulse text-gray-800">
            {/* Skeleton Breadcrumb */}
            <div className="h-4 w-40 bg-gray-200 mb-6 rounded" />

            <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
                {/* Left Section Skeleton */}
                <div className="w-full lg:w-[52%]">
                    <div className="flex flex-col-reverse lg:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="lg:w-1/6 flex lg:flex-col gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-20 h-20 bg-gray-200 rounded" />
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="w-full aspect-[4/5] bg-gray-200 rounded" />
                    </div>
                </div>

                {/* Right Section Skeleton */}
                <div className="w-full lg:w-[48%] space-y-5">
                    <div className="space-y-4">
                        <div className="h-6 w-3/4 bg-gray-200 rounded" /> {/* Title */}
                        <div className="h-4 w-1/3 bg-gray-200 rounded" /> {/* Rating */}
                        <div className="h-8 w-1/4 bg-gray-200 rounded" /> {/* Price */}
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-4 w-full bg-gray-100 rounded" />
                            ))}
                        </div>

                        {/* Variant Selectors */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="h-4 w-16 bg-gray-200 rounded" />
                                <div className="flex gap-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-8 h-8 bg-gray-200 rounded" />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-16 bg-gray-200 rounded" />
                                <div className="flex gap-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-gray-200" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                        <div className="h-10 bg-gray-300 rounded" />
                        <div className="h-10 bg-gray-300 rounded" />
                    </div>

                    {/* Extra Info */}
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                    </div>

                    {/* Tabs */}
                    <div>
                        <div className="flex gap-4 mb-2">
                            <div className="h-8 w-20 bg-gray-200 rounded" />
                            <div className="h-8 w-20 bg-gray-200 rounded" />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-8 w-24 bg-gray-100 rounded-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Info Tabs and Related Products Skeleton */}
            <div className="mt-12 space-y-4">
                <div className="h-8 w-32 bg-gray-200 rounded" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-40 bg-gray-200 rounded" />
                    ))}
                </div>
            </div>
        </section>
    );
}

const ProductState = ({
    data,
    productImages,
    selectedImage,
    handleThumbnailClick,
    fade,
    activeTab,
    setActiveTab,
}) => {

    const metaData = {
        title: `DoorBix || ${data?.productName}`,
        description: "Shop our premium red t-shirt made from 100% cotton. Unisex fit, soft, breathable, and perfect for casual wear. Available in all sizes.",
        image: `${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${productImages[0]?.image}`,
        pageUrl: `https://wwww.doorbix.com/shop/${data?.productSlug}`,
    }


    return (
        <section className="max-w-screen-xl mx-auto px-8 py-8 bg-white text-gray-800">
            <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-400 mb-4">Home / Shop/ {data?.productName}</nav>

            <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
                {/* ================= Left Section (Sticky Images) ================= */}
                <div className="w-full lg:w-[52%] h-[100vh]">
                    <div className="flex flex-col-reverse lg:flex-row gap-4">
                        {/* ================= Thumbnails (Only show if 2 or more images) ================= */}
                        {productImages.length > 1 && (
                            <div className="lg:w-1/6 md:w-full overflow-hidden">
                                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[500px] pr-1">
                                    {productImages.map((img, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleThumbnailClick(img.image)}
                                            className={`min-w-[3rem] w-20 h-20 rounded shadow-sm overflow-hidden flex-shrink-0 cursor-pointer  ${selectedImage === img.image ? 'shadow-xl' : ''
                                                }`}
                                        >
                                            <Image
                                                loading="lazy"
                                                src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${img.image}`}
                                                alt={`Thumbnail ${i + 1}`}
                                                width={96}
                                                height={80}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ================= Main Image (Hero Image) ================= */}
                        <div className="relative w-full aspect-[4/5] bg-gray-100 rounded overflow-hidden">
                            {productImages?.length > 0 && (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${selectedImage || productImages[0].image}`}
                                    alt="Product Preview"
                                    height={700}
                                    width={700}
                                    loading="lazy"
                                    className={`rounded h-full w-full object-cover transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'
                                        }`}
                                />
                            )}

                            <button
                                type="button"
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                aria-label="Add to wishlist"
                            >
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= Right Section (Product Info) ================= */}
                <div className="w-full lg:w-[48%] space-y-5">
                    {/* Info Card */}
                    <div className="bg-white z-10 pb-2">
                        {/* Top Label */}
                        {/* <div className="flex items-center justify-between mb-2">
                            <span className="bg-yellow-300 text-xs px-2 py-1 rounded font-semibold">
                                Subscription
                            </span>
                        </div> */}

                        {/* Title */}
                        <h1 className="text-2xl font-semibold mb-2">{data?.productName}</h1>

                        {/* Rating */}

                        {/* <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-yellow-400" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">1 review</span>
                            <div className="text-red-500 text-md">22 added in last 24 hours</div>
                        </div> */}

                        {/* Price */}
                        <div className="mb-4 flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-black">
                                {data?.productPrice} {process.env.NEXT_PUBLIC_CURRENCY}
                            </span>
                            {data?.productComparePrice && (
                                <del className="text-gray-500">
                                    {data.productComparePrice} {process.env.NEXT_PUBLIC_CURRENCY}
                                </del>
                            )}
                        </div>

                        {/* Benefits */}
                        <ul className="text-sm space-y-2 border rounded-lg p-5 mb-3">
                            <li className="flex items-center gap-2 text-gray-600 text-md">
                                <Truck size={20} /> Estimate delivery times: 3-5 days International.
                            </li>
                            <li className="flex items-center gap-2 text-gray-600 text-md">
                                <Badge size={20} /> Use code <b>WELCOME15</b> for 15% off your first order.
                            </li>
                            <li className="flex items-center gap-2 text-gray-600 text-md">
                                <ShieldCheck size={20} /> Secure checkout guarantee
                            </li>
                        </ul>

                        {/* Variant Selectors */}

                        {/* {
                            data?.productVariant && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Size</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    className="shadow-sm cursor-pointer px-4 py-1 rounded hover:bg-black hover:text-white text-sm"
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                  
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Color</h4>
                                        <div className="flex gap-2">
                                            {colors.map((color) => (
                                                <span
                                                    key={color}
                                                    className={`w-5 h-5 rounded-full border cursor-pointer ${color === 'black'
                                                        ? 'bg-black border-black'
                                                        : color === 'gray'
                                                            ? 'bg-gray-400 border-gray-400'
                                                            : 'bg-yellow-700 border-yellow-700'
                                                        }`}
                                                ></span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        } */}

                    </div>

                    {/* Purchase Actions */}
                    <div className="mb-3">
                        <PurchaseOptions data={data} />
                    </div>

                    {/* Extra Info */}
                    <div className="space-y-3 text-sm text-gray-700">
                        <p>
                            <b>SKU</b>: {data?.productSKU}
                        </p>
                        <p>
                            <b>Available</b>: {data?.stock <= 0 ? (<span className='text-red-600'>Out of Stock</span>) : (<span className='text-green-700'>In of Stock</span>)}
                        </p>
                    </div>

                    <div className="w-full">
                        {/* Tab Headers */}
                        <div className="flex  mb-4">
                            <button
                                className={`px-4 py-2 font-semibold text-sm transition-all duration-200 ${activeTab === "category"
                                    ? "border-b-2 border-blue-600 text-blue-700"
                                    : "text-gray-500 hover:text-blue-600"
                                    }`}
                                onClick={() => setActiveTab("category")}
                            >
                                Categories
                            </button>
                            <button
                                className={`px-4 py-2 font-semibold text-sm transition-all duration-200 ${activeTab === "tag"
                                    ? "border-b-2 border-green-600 text-green-700"
                                    : "text-gray-500 hover:text-green-600"
                                    }`}
                                onClick={() => setActiveTab("tag")}
                            >
                                Tags
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === "category" && (
                            <div className="flex flex-wrap gap-2">
                                {data?.productCategory?.map((cat) => (
                                    <button
                                        key={cat.id}
                                        className="px-4 py-1.5 text-sm rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-all duration-200"
                                        onClick={() =>
                                            router.push(`/shop/category/${cat.categoryName.toLowerCase()}`)
                                        }
                                    >
                                        {cat.categoryName}
                                    </button>
                                ))}
                            </div>
                        )}

                        {activeTab === "tag" && (
                            <div className="flex flex-wrap gap-2">
                                {data?.productTags?.map((tag) => (
                                    <button
                                        key={tag.id}
                                        className="px-4 py-1.5 text-sm rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-all duration-200"
                                        onClick={() =>
                                            router.push(`/shop/tag/${tag.name.toLowerCase()}`)
                                        }
                                    >
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <ProductInfoTabs data={data} />

            {/* ================= More Products ================= */}
            <BestSellingProducts title={"Best Selling"} type={"bestSelling"} />
        </section >
    );
}

const ProductDetailPage = ({ slug }) => {
    const [activeTab, setActiveTab] = useState("category");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Start with true
    const [selectedImage, setSelectedImage] = useState(null);
    const [fade, setFade] = useState(false);
    

    const handleThumbnailClick = (image) => {
        if (image === selectedImage) return;
        setFade(true);
        setTimeout(() => {
            setSelectedImage(image);
            setFade(false);
        }, 200);
    };

   

    useEffect(() => {
        const retrieveProduct = async () => {
            if (!slug) return;

            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/products/${slug}`);
                if (!res.ok) throw new Error("Failed to fetch product");

                const resData = await res.json();
                setData(resData);

                // Set default selected image from response
                if (resData?.productImages?.[0]?.image) {
                    setSelectedImage(resData.productImages[0].image);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        retrieveProduct();
    }, [slug]);

    const productImages = data?.productImages?.filter((img) => img?.image) || [];

    // ✅ Safe rendering logic
    if (loading || !data) {
        return <LoadingState />;
    }

    return (
        <ProductState
            data={data}
            productImages={productImages}
            selectedImage={selectedImage}
            handleThumbnailClick={handleThumbnailClick}
            fade={fade}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
    );
};

export default ProductDetailPage;