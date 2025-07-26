// app/dashboard/products/page.js

import ProductTable from "@/components/Admin/ProductTable/ProductTable";

export default function ProductsPage() {
  return (
    <div>
      <div className="flex item-center justify-between mb-4">

        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="flex item-center justify-between gap-2">
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Export as CSV</button>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Import Data</button>

        </div>
      </div>

      <ProductTable />
    </div>
  );
}
