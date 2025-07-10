import Image from "next/image";
import Link from "next/link";

export default function ProductWidget() {
  return (
    <div className="flex w-full rounded shadow overflow-hidden p-5">
      {/* Sidebar for All Products */}
      <aside className="w-[260px] border-r border-gray-200 p-4 bg-white">
        {/* Sidebar Title */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl font-semibold">☰ All Products</span>
        </div>

        {/* Product Categories List */}
        <ul className="space-y-4 text-sm text-gray-700">
          <li className="flex justify-between items-center">
            <Link href="#" className="hover:text-black">Deals of the Day</Link>
            <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded">HOT</span>
          </li>
          <li className="flex justify-between items-center">
            <Link href="#" className="hover:text-black">Consumer Electronics</Link>
            <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded">NEW</span>
          </li>
          <li><Link href="#" className="hover:text-black">Sports & Health</Link></li>
          <li><Link href="#" className="hover:text-black">Babies & Toys</Link></li>
          <li><Link href="#" className="hover:text-black">Groceries & Pets</Link></li>
          <li><Link href="#" className="hover:text-black">Home & Lifestyle</Link></li>
          <li><Link href="#" className="hover:text-black">Women’s Fashion</Link></li>
          <li><Link href="#" className="hover:text-black">Men’s Fashion</Link></li>
          <li><Link href="#" className="hover:text-black">Watches & Accessories</Link></li>
          <li><Link href="#" className="hover:text-black">Automotive & Motorbike</Link></li>
        </ul>
      </aside>

      {/* Main Content: Left Hero + Right Vertical Ads */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4">
        {/* Hero Banner */}
        <div className="col-span-2 relative rounded overflow-hidden">
          <Image
            src="/headphones.jpg" // Place this image in your /public folder
            alt="Pro DJ Headphones"
            fill
            className="object-cover rounded"
          />
          {/* Overlay Text */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100/70 via-white/10 to-transparent p-6 flex flex-col justify-center">
            <h1 className="text-6xl font-extrabold text-pink-500 leading-none">360°</h1>
            <h2 className="text-2xl font-bold text-purple-800 mt-2">PRO DJ HEADPHONES</h2>
            <p className="text-md text-gray-800 font-light mt-1">NEW STYLE</p>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-600 font-semibold tracking-wider">
              DIGITAL WORLD
            </span>
          </div>
        </div>

        {/* Vertical Right Banners */}
        <div className="flex flex-col gap-4">
          {/* Apparel & Textiles */}
          <Link href="#" className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded p-4 flex items-center justify-between overflow-hidden">
            <div>
              <h3 className="text-lg font-semibold">Apparel & Textiles</h3>
              <button className="text-sm bg-white text-red-500 mt-2 px-3 py-1 rounded">SHOP NOW</button>
            </div>
            <Image src="/apparel.png" alt="Apparel" width={70} height={90} />
          </Link>

          {/* Jewellery */}
          <Link href="#" className="bg-teal-500 text-white rounded p-4 flex items-center justify-between overflow-hidden">
            <div>
              <h3 className="text-lg font-semibold">Jewellery</h3>
              <button className="text-sm bg-white text-teal-500 mt-2 px-3 py-1 rounded">SHOP NOW</button>
            </div>
            <Image src="/jewellery.png" alt="Jewellery" width={70} height={90} />
          </Link>

          {/* Men's Fashion */}
          <Link href="#" className="bg-blue-500 text-white rounded p-4 flex items-center justify-between overflow-hidden">
            <div>
              <h3 className="text-lg font-semibold">Men's Fashion</h3>
              <button className="text-sm bg-white text-blue-500 mt-2 px-3 py-1 rounded">SHOP NOW</button>
            </div>
            <Image src="/men-fashion.png" alt="Men Fashion" width={70} height={90} />
          </Link>
        </div>
      </div>
    </div>
  );
}
