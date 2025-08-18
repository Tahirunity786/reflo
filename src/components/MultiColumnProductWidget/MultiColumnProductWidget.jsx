import Image from "next/image";

// Dummy product data for each section
const sections = [
  {
    title: "Featured Products",
    products: [
      { title: "Stylish Heels Formal", price: 50, original: 77, image: "/heels.png" },
      { title: "Latex Rubber Lingerie", price: 25, image: "/lingerie.png" },
      { title: "Stone Bracelet", price: 188, original: 200, image: "/bracelet.png" },
      { title: "Custom Motorcycle", price: 1900, original: 2000, image: "/bike.png" },
      { title: "Raw Oak Shelf", price: 15, original: 20, image: "/shelf.png" },
    ],
  },
  {
    title: "On Sale Products",
    products: [
      { title: "Dumbbell", price: 77, original: 99, image: "/dumbbell.png" },
      { title: "Flare Skirts", price: 89, image: "/skirt.png" },
      { title: "Stylish Heels Formal", price: 50, original: 77, image: "/heels.png" },
      { title: "Patek Eleven", price: 200, image: "/watch.png" },
      { title: "Baby Trolley", price: 150, original: 200, image: "/trolley.png" },
    ],
  },
  {
    title: "All Products",
    products: [
      { title: "High Rise Shorts", price: 55, original: 77, image: "/shorts.png" },
      { title: "Masculine Blazer", price: 65, original: 75, image: "/blazer.png" },
      { title: "Puffy Sleeves", price: 88, image: "/puffy.png" },
      { title: "V-neck Blouse", price: 65, image: "/vneck.png" },
      { title: "Oversized V Sweater", price: 45, image: "/sweater.png" },
    ],
  },
  {
    title: "Products",
    products: [
      { title: "Golden party Purse", price: 30, image: "/purse.png" },
      { title: "Raw Oak Shelf", price: 15, original: 20, image: "/shelf.png" },
      { title: "Custom Motorcycle", price: 1900, original: 2000, image: "/bike.png" },
      { title: "Stone Bracelet", price: 188, original: 200, image: "/bracelet.png" },
      { title: "Latex Rubber Lingerie", price: 25, image: "/lingerie.png" },
    ],
  },
];

export default function MultiColumnProductWidget() {
  return (
    <section className="py-10 bg-white px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section, index) => (
          <div key={index}>
            {/* Section Title */}
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>

            {/* Product List */}
            <div className="space-y-6">
              {section.products.map((product, i) => (
                <div key={i} className="flex items-start gap-3">
                  {/* Product Image */}
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={60}
                    height={60}
                    className="object-contain rounded"
                  />
                  
                  {/* Product Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 leading-snug">
                      {product.title}
                    </h4>
                    <div className="text-sm mt-1">
                      <span className="text-orange-500 font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.original && (
                        <span className="text-gray-400 line-through text-sm ml-2">
                          ${product.original.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
