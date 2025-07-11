// app/dashboard/products/page.js

import ProductTable from "@/components/Admin/ProductTable/ProductTable";

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <ProductTable />
    </div>
  );
}
