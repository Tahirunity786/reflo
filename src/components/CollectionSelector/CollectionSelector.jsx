"use client";

import { useEffect, useRef, useState } from "react";
import { PlusCircle, Search, X } from "lucide-react";
import AddCollectionModal from "../AddCollectionModal/AddCollectionModal";

const CollectionSelector = ({ collections }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredCollections, setFilteredCollections] = useState(collections || []);
  const dropdownRef = useRef();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter logic
  useEffect(() => {
    const results = collections.filter((collection) =>
      collection.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCollections(results);
  }, [searchTerm, collections]);

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      {/* Label */}
      <label
        htmlFor="product-collection"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Collection
      </label>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          id="product-collection"
          placeholder="Search"
          value={searchTerm}
          onFocus={() => setDropdownOpen(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 max-h-60 overflow-y-auto">
          {/* Add New Collection Option */}
          <div
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setDropdownOpen(false);
              setModalOpen(true);
            }}
          >
            <PlusCircle className="w-4 h-4 text-gray-500" />
            Add new collection
          </div>

          <hr className="my-1 border-gray-200 dark:border-gray-600" />

          {/* Filtered Collections */}
          {filteredCollections.length > 0 ? (
            filteredCollections.map((item, idx) => (
              <div
                key={idx}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-white cursor-pointer flex items-center gap-2"
              >
                <input type="checkbox" className="accent-blue-600" id={`collection-${idx}`} />
                <label htmlFor={`collection-${idx}`}>{item}</label>
              </div>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
              No collections found
            </p>
          )}
        </div>
      )}

      {/* Modal Component */}
      {isModalOpen && <AddCollectionModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default CollectionSelector;
