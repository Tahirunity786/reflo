import Image from "next/image";

const products = [
  {
    title: "Custom Motorcycle",
    price: 1900,
    originalPrice: 2000,
    image: "/bike.png",
  },
  {
    title: "Patek Eleven",
    price: 200,
    originalPrice: null,
    image: "/watch.png",
  },
  {
    title: "Stone Bracelet",
    price: 188,
    originalPrice: 200,
    image: "/bracelet.png",
  },
  {
    title: "Baby Trolley",
    price: 150,
    originalPrice: 200,
    image: "/trolley.png",
  },
];

export default function CompactProductList() {
  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6 px-5">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-5">
        {products.map((item, idx) => (
          <div key={idx} className="bg-white rounded shadow-sm p-4 text-center">
            <Image
              src={item.image}
              alt={item.title}
              width={130}
              height={120}
              className="mx-auto object-contain"
            />
            <h3 className="text-sm font-semibold mt-3">{item.title}</h3>
            <div className="mt-2">
              {item.originalPrice && (
                <span className="line-through text-gray-400 text-sm mr-2">
                  ${item.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-orange-500 font-semibold">
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
