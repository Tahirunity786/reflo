import Image from "next/image";
import Link from "next/link";
import SortDropdown from "../SortDropdown/SortDropdown";

const products = [
  {
    title: "Oversized V Sweater",
    price: 45,
    originalPrice: null,
    image: "/sweater-1.png",
    isSale: false,
  },
  {
    title: "V-neck Blouse",
    price: 65,
    originalPrice: null,
    image: "/sweater-2.png",
    isSale: false,
  },
  {
    title: "Puffy Sleeves",
    price: 88,
    originalPrice: null,
    image: "/sweater-3.png",
    isSale: false,
  },
  {
    title: "Masculine Blazer",
    price: 65,
    originalPrice: 75,
    image: "/sweater-4.png",
    isSale: true,
  },
  {
    title: "High Rise Shorts",
    price: 55,
    originalPrice: 77,
    image: "/sweater-5.png",
    isSale: true,
  },
];

export default function BestSellingProducts({ title, isSortShow = false }) {
  return (
    <section className="py-10 bg-gray-50">
      <div className="flex justify-between items-center px-5 mb-6">
        <h2 className="text-xl font-semibold ">{title ? title : `Best Selling Products`}</h2>
        {
          isSortShow && (<SortDropdown/>)
        }
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5">
        {products.map((product, idx) => (
          <div key={idx} className="bg-white rounded shadow-sm overflow-hidden relative group">
            {/* Sale Ribbon */}
            {product.isSale && (
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 font-bold">
                SALE!
              </div>
            )}

            {/* Product Image */}
            <div className="p-4 flex justify-center items-center">
              <Image
                src={product.image}
                alt={product.title}
                width={150}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="px-4 text-start pb-4 pt-2 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-800">{product.title}</h3>
              <div className="mt-2">
                <span className="text-orange-500 font-semibold text-md">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm ml-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-2 mt-4">
                <button className="border cursor-pointer border-gray-300 px-3 py-1 text-sm rounded flex items-center gap-1 hover:border-orange-500 hover:text-orange-500 transition">
                  🛒 ADD TO CART
                </button>
                <button className="border cursor-pointer border-gray-300 p-2 rounded hover:border-orange-500 hover:text-orange-500 transition">
                  🤍
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
