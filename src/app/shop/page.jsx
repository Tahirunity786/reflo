"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star, LayoutGrid, List } from "lucide-react";
import CollectCard from "@/components/CollectCard/CollectCard";
import ProductCard from "@/components/ProductCard/ProductCard";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const products = [
  {
    id: 1,
    title: "Short studded denim dress",
    price: 400,
    image: '/Image/fs_new_s1.webp',
    rating: 5,
    variants: ["gray", "black"],
  },
  {
    id: 2,
    title: "Basic blazer",
    price: 225,
    image: '/Image/fs_new_s1.webp',
    rating: 4,
    label: "Pre-Order",
    variants: ["black", "white"],
  },
  {
    id: 3,
    title: "Waistcoat with pockets",
    price: 270,
    oldPrice: 300,
    discount: "-10%",
    image: '/Image/fs_new_s1.webp',
    rating: 4,
    variants: ["black", "brown"],
  },
  {
    id: 4,
    title: "Belted blazer dress",
    price: 300,
    oldPrice: 350,
    discount: "-14%",
    countdown: "247D : 09H : 25M : 15S",
    image: '/Image/fs_new_s1.webp',
    rating: 4,
    variants: ["black", "brown"],
  },
  {
    id: 5,
    title: "Short sleeve T-shirt",
    price: 125,
    image: '/Image/fs_new_s1.webp',
    rating: 5,
    variants: ["beige", "white"],
  },
  {
    id: 6,
    title: "Soft-touch vest sweater",
    price: 150,
    image: '/Image/fs_new_s1.webp',
    rating: 5,
    variants: ["brown", "gray"],
  },
];

const cards = [
  { _id: 1, img: "/Image/fs_new_s1.webp", imgAlt: "Collection", Label: "T shirt" },
  { _id: 2, img: "/Image/main_clt4.webp", imgAlt: "Sweater", Label: "Sweater" },
  { _id: 3, img: "/Image/main_clt4.webp", imgAlt: "Sweater", Label: "Sweater" },
  { _id: 4, img: "/Image/main_clt4.webp", imgAlt: "Sweater", Label: "Sweater" },

]

// const ProductCard = ({ product, isList }) => {
//   return (
//     <div
//       className={cn(
//         "group relative overflow-hidden border border-gray-200 rounded-lg bg-white transition-all duration-300 hover:shadow-lg",
//         isList && "flex flex-col md:flex-row gap-4"
//       )}
//     >
//       {/* Discount / Label */}
//       {product.discount && (
//         <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
//           {product.discount}
//         </span>
//       )}
//       {product.label && !product.discount && (
//         <span className="absolute top-3 left-3 z-10 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
//           {product.label}
//         </span>
//       )}

//       {/* Wishlist Icon */}
//       <button className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500">
//         <Heart size={18} />
//       </button>

//       {/* Image */}
//       <div
//         className={cn(
//           "relative bg-gray-100 transition-all duration-300",
//           isList
//             ? "w-full md:w-1/3 aspect-[3/2]"
//             : "w-full aspect-[4/5]" // slightly shorter image in grid view
//         )}
//       >
//         <Image
//           src={product.image}
//           alt={product.title}
//           fill
//           className="object-cover"
//         />
//       </div>


//       {/* Content */}
//       <div className="p-4 text-left flex-1">
//         <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
//           {product.title}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-1 my-1">
//           {[...Array(product.rating)].map((_, i) => (
//             <Star
//               key={i}
//               size={14}
//               className="text-yellow-400 fill-yellow-400"
//             />
//           ))}
//         </div>

//         {/* Price */}
//         <div className="mt-1">
//           <span className="text-sm font-bold text-black">
//             ${product.price.toFixed(2)}
//           </span>
//           {product.oldPrice && (
//             <span className="ml-2 text-xs text-gray-400 line-through">
//               ${product.oldPrice.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* Countdown */}
//         {product.countdown && (
//           <span className="block text-xs text-white text-center bg-red-500 py-1 px-2 mt-2 rounded">
//             {product.countdown}
//           </span>
//         )}

//         {/* Variants */}
//         <div className="flex gap-2 mt-2">
//           {product.variants.map((variant, index) => (
//             <span
//               key={index}
//               className={cn(
//                 "w-4 h-4 rounded-full border",
//                 variant === "gray" && "bg-gray-400 border-gray-400",
//                 variant === "blue" && "bg-blue-500 border-blue-500",
//                 variant === "black" && "bg-black border-black",
//                 variant === "beige" && "bg-yellow-200 border-yellow-200",
//                 variant === "brown" && "bg-yellow-700 border-yellow-700",
//                 variant === "white" && "bg-white border-gray-300"
//               )}
//             ></span>
//           ))}
//         </div>

//         {/* Add to Cart */}
//         <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition">
//           <ShoppingCart size={16} /> Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

const Page = () => {
  const [layout, setLayout] = useState("grid");
  const [pData, setPData] = useState();
  const [loading, setLoading] = useState(false);

  const handleLayoutChange = (view) => {
    setLoading(true);
    setTimeout(() => {
      setLayout(view);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(false)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/products`)
        if (response.ok) {
          const data = await response.json();
          setPData(data);
          setLoading(false)
        }
        setLoading(false)

      } catch (e) {
        console.error(e)
        setLoading(false)
      }

    }
    fetchProducts()
  }, [])

  return (
    <section className="bg-white px-4 py-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
      {/* Banner */}
      {/* <div
        className="relative h-[200px] md:h-[300px] w-full mb-10 bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: "url('/images/sweater-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold">Sweaters</h1>
          <p className="text-sm md:text-base mt-2">Cozy and chic for any season.</p>
        </div>
      </div> */}
      {/* Collect card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center mb-6">
        {cards.map((item) => (
          <CollectCard
            key={item._id}
            imageSrc={item.img}
            imageAlt={item.imgAlt}
            buttonLabel={item.Label}
            hSm={true}
            onButtonClick={() => console.log(`Clicked ${item._id}`)}
          />
        ))}
      </div>


      <div className="flex gap-8">
        {/* Sidebar Filter */}
        <aside className="w-full md:w-[250px] flex-shrink-0 hidden md:block">
          <div className="space-y-6 p-4 bg-gray-50 rounded-lg ">
            <div>
              <h4 className="text-base font-semibold mb-3 pb-2">Product Categories</h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li className="cursor-pointer hover:text-black">Crop-top</li>
                <li className="cursor-pointer hover:text-black">Sweaters</li>
                <li className="cursor-pointer hover:text-black">T-Shirts</li>
                <li className="cursor-pointer hover:text-black">Jean</li>
                <li className="cursor-pointer hover:text-black">Coats</li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-3 pb-2">Availability</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <input type="checkbox" className="accent-black" />
                  <span>In stock</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <input type="checkbox" className="accent-black" />
                  <span>Out of stock</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-3 pb-2">Price Range</h4>
              <input type="range" min={0} max={500} className="w-full accent-black" />
              <div className="text-sm text-gray-700 mt-1">0 {process.env.NEXT_PUBLIC_CURRENCY} - 500 {process.env.NEXT_PUBLIC_CURRENCY}</div>
            </div>
          </div>


          {/* Featured Product */}
          <div className="mt-6 bg-gray-50 p-3 rounded-md">
            <h4 className="text-base font-semibold mb-3 pb-2">Featured Product</h4>
            <div className="rounded-lg flex flex-col sm:flex-row overflow-hidden bg-white shadow-sm mb-3">
              {/* Image Section */}
              <div className="relative w-full sm:w-1/2 h-40 sm:h-auto">
                <Image
                  src="/Image/fs_new_s1.webp"
                  alt="Featured Product"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h5 className="text-sm font-medium text-gray-800 mb-1">Stylish Denim Dress</h5>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Price */}
                <p className="text-sm font-bold text-black">$400.00</p>
              </div>
            </div>
            <div className="rounded-lg flex flex-col sm:flex-row overflow-hidden bg-white shadow-sm mb-3">
              {/* Image Section */}
              <div className="relative w-full sm:w-1/2 h-40 sm:h-auto">
                <Image
                  src="/Image/fs_new_s1.webp"
                  alt="Featured Product"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h5 className="text-sm font-medium text-gray-800 mb-1">Stylish Denim Dress</h5>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Price */}
                <p className="text-sm font-bold text-black">$400.00</p>
              </div>
            </div>

          </div>
          {/* 50% OFF Banner */}
          <div className="mt-6 rounded-lg overflow-hidden">
            <Image
              src="/Image/fs_new_s1.webp"
              alt="50% Off Banner"
              width={250}
              height={400}
              className="rounded-lg object-cover h-40"
            />
          </div>

        </aside>

        {/* Main Product Section */}
        <div className="flex-1">
          {/* Product Listing Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <p className="text-sm text-gray-600">There are {products.length} results in total</p>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleLayoutChange("grid")}
                  className={cn("p-2 border rounded", layout === "grid" && "bg-black text-white")}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => handleLayoutChange("list")}
                  className={cn("p-2 border rounded", layout === "list" && "bg-black text-white")}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>

              <div>
                <label className="text-sm font-medium mr-2">Sort by:</label>
                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin h-6 w-6 border-4 border-black border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div
              className={cn(
                "transition-all duration-300",
                layout === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              )}
            >
              {pData?.map((product) => (
                <ProductCard key={product.id} product={product} isList={layout === "list"} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
