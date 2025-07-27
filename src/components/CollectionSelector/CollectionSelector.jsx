"use client";

import { useEffect, useRef, useState } from "react";
import { PlusCircle, Search, Loader2 } from "lucide-react";
import AddCollectionModal from "../AddCollectionModal/AddCollectionModal";

const CollectionSelector = ({ selectedCollections = [], onChange }) => {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef();

  const toggleCollection = (id) => {
    if (selectedCollections.includes(id)) {
      onChange(selectedCollections.filter((c) => c !== id));
    } else {
      onChange([...selectedCollections, id]);
    }
  };



  // Fetch collections from API
  const fetchCollections = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/collection");

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Expected array but got something else");
      }

      setCollections(data);
      setFilteredCollections(data);
    } catch (err) {
      console.error("❌ Failed to fetch collections:", err);
      setCollections([]);
      setFilteredCollections([]);
    } finally {
      setLoading(false);
    }
  };


  // Initial fetch
  useEffect(() => {
    fetchCollections();
  }, []);

  // Re-filter on search
  useEffect(() => {
    const results = collections.filter((collection) =>
      collection.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCollections(results);
  }, [searchTerm, collections]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
            </div>
          ) : filteredCollections.length > 0 ? (
            filteredCollections.map((item) => (
              <div
                key={item._id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-white cursor-pointer flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id={`collection-${item._id}`}
                  className="accent-blue-600"
                  checked={selectedCollections.includes(item._id)}
                  onChange={() => toggleCollection(item._id)}
                />
                <label htmlFor={`collection-${item._id}`}>{item.name}</label>
              </div>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
              No collections found
            </p>
          )}
        </div>
      )}

      {/* Modal (with refresh on close) */}
      {isModalOpen && (
        <AddCollectionModal
          onClose={() => {
            setModalOpen(false);
            fetchCollections(); // Refresh on close
          }}
        />
      )}
    </div>
  );
};

export default CollectionSelector;
