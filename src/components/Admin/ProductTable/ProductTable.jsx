'use client';

import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaClock, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FILTER_OPTIONS = ['Last day', 'Last 7 days', 'Last 30 days', 'Last month', 'Last year'];

export default function ProductTable() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Last 30 days');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Pagination & Sorting
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('dateCreated');
  const [sortOrder, setSortOrder] = useState('desc');

  // 🌐 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/product?page=${page}&limit=${limit}&search=${search}&sort=${sortField}&order=${sortOrder}`
        );
        const json = await res.json();
        setProducts(json?.data || []);
        setTotalPages(json.pagination?.pages || 1);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, limit, search, sortField, sortOrder]);

  // 🧠 Toggle sort field/order
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="relative overflow-x-auto">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center pb-4 gap-4">
        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg text-sm px-3 py-1.5"
          >
            <FaClock className="me-2" /> {selectedFilter}
            <FaChevronDown className="ms-2.5" />
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
              <ul className="p-3 space-y-1 text-sm">
                {FILTER_OPTIONS.map((option) => (
                  <li key={option}>
                    <div
                      onClick={() => {
                        setSelectedFilter(option);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded"
                    >
                      <input type="radio" checked={selectedFilter === option} readOnly className="w-4 h-4" />
                      <label className="ms-2">{option}</label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 p-2 border rounded-lg w-72"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">#</th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => toggleSort('productTitle')}
            >
              Product Name {sortField === 'productTitle' && (sortOrder === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
            </th>
            <th className="px-6 py-3">SKU</th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => toggleSort('productPrice')}
            >
              Price {sortField === 'productPrice' && (sortOrder === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
            </th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-6">Loading...</td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6">No products found.</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">{(page - 1) * limit + index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{product.productTitle}</td>
                <td className="px-6 py-4">{product.productSKU}</td>
                <td className="px-6 py-4">${product.productPrice.toFixed(2)}</td>
                <td className="px-6 py-4">{product.productCountInStock}</td>
                <td className="px-6 py-4 capitalize">{product.productStatus}</td>
                <td className="px-6 py-4">
                  <a href={`/admin/products/edit/${product.slug}`} className="text-blue-600 hover:underline">Edit</a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="flex items-center px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          <FaChevronLeft className="mr-1" /> Prev
        </button>

        <span className="text-sm text-gray-600">
          Page <strong>{page}</strong> of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="flex items-center px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Next <FaChevronRight className="ml-1" />
        </button>
      </div>
    </div>
  );
}
