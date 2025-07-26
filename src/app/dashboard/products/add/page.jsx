'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import MediaUploader from '@/components/Admin/MediaUploader/MediaUploader';
import CategorySelector from '@/components/Admin/CategorySelector/CategorySelector';
import AddVariant from '@/components/Admin/AddVariant/AddVariant';
import { toast } from 'wc-toast';
import CollectionSelector from '@/components/CollectionSelector/CollectionSelector';
import { PenIcon } from 'lucide-react';
const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false }
);

export default function AddProductPage() {
  const [isOnline, setIsOnline] = useState(true);
  const quillRef = useRef(null);
  const [formValues, setFormValues] = useState({
    productTitle: '',
    productStatus: 'draft',
    productDescription: '',
    productSKU: '',
    productBarcode: '',
    productPrice: 0.00,
    productComparePrice: 0.00,
    productCostPrice: 0.00,
    productProfitPrice: 0.00,
    productQuantity: 0,
    productCategories: [],
    productTags: [],
    productShipping: { weight: 0.0, weightUnit: '' },
    productVariants: {},
    productOrganization: {},
    productTrackQuantity: false,
    productoutOfStock: false,
    images: [],
  });


  const [openSKUBARCode, setOpenSKUBARCode] = useState(false);
  const [openWeight, setOpenWeight] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const totalProfit = formValues.productPrice - formValues.productCostPrice;

  const grossMargin = +(((formValues.productPrice - formValues.productCostPrice) / formValues.productPrice) * 100).toFixed(1) || 0;


  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));


  };



  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formValues.productTags.includes(newTag)) {
        setFormValues((prev) => ({
          ...prev,
          productTags: [...prev.productTags, newTag],
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setFormValues((prev) => ({
      ...prev,
      productTags: prev.productTags.filter((_, i) => i !== indexToRemove),
    }));
  };


  // Prepare FormData object for submission
  const buildFormData = () => {
    const data = new FormData();
    data.append('productTitle', formValues.productTitle);
    data.append('productStatus', formValues.productStatus);
    data.append('productDescription', formValues.productDescription);
    data.append('productSKU', formValues.productSKU);
    data.append('productBarcode', formValues.productBarcode);
    data.append('productPrice', formValues.productPrice);
    data.append('productComparePrice', formValues.productComparePrice);
    data.append('productCostPrice', formValues.productCostPrice);
    data.append('productProfitPrice', formValues.productProfitPrice);
    data.append('productQuantity', formValues.productQuantity);
    data.append('productTrackQuantity', formValues.productTrackQuantity);
    data.append('productoutOfStock', formValues.productoutOfStock);

    data.append(
      'productCategories',
      JSON.stringify(formValues.productCategories)
    );
    data.append('productTags', JSON.stringify(formValues.productTags));

    // Shipping
    data.append('shippingInfo', JSON.stringify(formValues.productShipping));

    // Organization
    data.append(
      'productOrganization',
      JSON.stringify(formValues.productOrganization)
    );

    formValues.images.forEach((file) => {
      data.append('images', file);
    });

    return data;
  };




  const submitProduct = async () => {
    const data = buildFormData();

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Server error:', result);
        throw new Error(result.error || 'Unknown server error');
      }

      setFormValues({
        productTitle: '',
        productStatus: 'draft',
        productDescription: '',
        productSKU: '',
        productBarcode: '',
        productPrice: 0.00,
        productComparePrice: 0.00,
        productCostPrice: 0.00,
        productProfitPrice: 0.00,
        productQuantity: 0,
        productCategories: [],
        productTags: [],
        productShipping: { weight: 0.0, weightUnit: '' },
        productVariants: {},
        productOrganization: {},
        productTrackQuantity: false,
        productoutOfStock: false,
        images: [],
      });


      toast('Product Saved', {
        icon: {
          type: 'svg',
          content: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                    </svg>`,
        },
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };



  const toggleOpenSKUBARCode = (value) => {
    setOpenSKUBARCode(value);
    if (!value) {
      setFormValues((prev) => ({
        ...prev,
        productSKU: '',
        productBarcode: '',
      }));
    }
  };
  const toggleWeight = (value) => {
    setOpenWeight(value);
    if (!value) {
      setFormValues((prev) => ({
        ...prev,
        productShipping: '',
      }));
    }
  };




  useEffect(() => {
    if (totalProfit < 0) {
      setFormValues((prev) => ({ ...prev, productProfitPrice: 0 }));
    } else {
      setFormValues((prev) => ({ ...prev, productProfitPrice: totalProfit }));
    }
  }, [totalProfit]);


  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="items-center mb-4 flex">
          <button
            type="button"
            className="dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-gray-500 mr-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p className="text-xl font-medium text-gray-900 dark:text-white">Add product</p>
        </div>
        <div className='flex items-center justify-between'>
          <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Discard</button>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => { submitProduct() }}>Save</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section (Main Form) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Title</label>
            <input
              type="text"
              placeholder="Short sleeve t-shirt"
              value={formValues.productTitle}
              name='productTitle'
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-900 bg-white dark:bg-gray-700"
            />
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg  shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>

            <div className="rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
              <ReactQuill
                ref={quillRef}
                value={formValues.productDescription}
                onChange={(value) =>
                  setFormValues((prev) => ({
                    ...prev,
                    productDescription: value,
                  }))
                }
                theme="snow"
                placeholder="Write product description..."
                className="dark:[&_.ql-toolbar]:bg-gray-700 dark:[&_.ql-container]:bg-gray-800 dark:[&_.ql-editor]:text-white"
              />

            </div>
          </div>

          {/* Media */}
          <MediaUploader onImagesChange={(newImages) => {
            setFormValues(prev => ({
              ...prev,
              images: newImages,
            }));
          }} />


          {/* Pricing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Pricing</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Price</label>
                <div className="flex">
                  <span className="items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-500 text-sm rounded-l-md inline-flex border border-r-0 border-gray-300 dark:border-gray-600 dark:text-gray-400">
                    Rs
                  </span>
                  <input
                    type="number"
                    placeholder={formValues.productPrice}
                    name='productPrice'
                    required={true}
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2 rounded-r-md text-gray-900 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              {/* Compare-at Price */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Compare-at price</label>
                <div className="flex">
                  <span className="items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-500 text-sm rounded-l-md inline-flex border border-r-0 border-gray-300 dark:border-gray-600 dark:text-gray-400">
                    Rs
                  </span>
                  <input
                    type="number"
                    placeholder={formValues.productComparePrice}
                    onChange={handleChange}
                    name='productComparePrice'
                    className="flex-1 border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2 rounded-r-md text-gray-900 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Charge Tax */}
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"

                  className="border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600 w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Charge tax on this product</span>
              </label>
            </div>

            {/* Cost/Profit/Margin */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Cost Per Item</label>
                <input
                  type="text"
                  name={'productCostPrice'}
                  value={formValues.productCostPrice}
                  onChange={handleChange}
                  placeholder='RS 0.00'
                  className="border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-900 bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Profit</label>
                <input
                  type="text"
                  disabled
                  value={totalProfit}
                  placeholder='RS 0.00'
                  className="border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-900 bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Margin</label>
                <input
                  type="text"
                  disabled
                  placeholder='--'
                  value={`${grossMargin}%` || "--"}
                  className="border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-900 bg-white dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <CategorySelector
            onSelectCategory={(category) => {
              setFormValues((prev) => ({
                ...prev,
                productCategories: [category], // Reset everything on category change
              }));
            }}
            onSelectSubcategory={(subcategory) => {
              setFormValues((prev) => {
                const updated = [...prev.productCategories];
                updated[1] = subcategory;
                return { ...prev, productCategories: updated };
              });
            }}
          // onSelectSubSubcategory={(subSub) => {
          //   setFormValues((prev) => {
          //     const updated = [...prev.productCategories];
          //     updated[2] = subSub;
          //     return { ...prev, productCategories: updated };
          //   });
          // }}
          />

          {/* Variants of product */}
          <AddVariant />

          {/* Inventory Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Inventory</p>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Track quantity</span>
              </label>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Quantity</label>
                <input
                  type="number"
                  value={formValues.productQuantity}
                  onChange={(e) => setFormValues(prev => ({ ...prev, productQuantity: e.target.value }))}
                  placeholder="0"
                  className="w-32 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Continue selling when out of stock</span>
              </label>

              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={formValues.productSKU !== '' || formValues.productBarcode !== ''}
                  onChange={() => toggleOpenSKUBARCode(!openSKUBARCode)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">This product has a SKU or barcode</span>
              </label>

              {openSKUBARCode && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product SKU</label>
                    <input
                      type="text"
                      value={formValues.productSKU}
                      onChange={(e) => setFormValues(prev => ({ ...prev, productSKU: e.target.value }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                      placeholder="Enter product SKU"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Barcode</label>
                    <input
                      type="text"
                      value={formValues.productBarcode}
                      onChange={(e) => setFormValues(prev => ({ ...prev, productBarcode: e.target.value }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                      placeholder="Enter product barcode"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Shipping Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Shipping</p>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => toggleWeight(!openWeight)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">This is a physical product</span>
              </label>
              {openWeight && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Weight</label>
                  <div className="flex">
                    <input
                      type="number"
                      placeholder="0.0"
                      value={formValues.productShipping.weight || ''}
                      onChange={(e) => {
                        const weightValue = e.target.value;
                        setFormValues((prev) => ({
                          ...prev,
                          productShipping: {
                            weight: weightValue,
                            weightUnit: prev.productShipping.weightUnit || 'kg', // Set default only if not already selected
                          },
                        }));
                      }}
                      className="flex-1 border border-r-0 border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-l-md text-gray-900 bg-white dark:bg-gray-700"
                    />

                    <select
                      value={formValues.productShipping?.weightUnit || 'kg'}
                      className="border border-gray-300 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-r-md text-gray-900 bg-white dark:bg-gray-700"
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          productShipping: {
                            ...prev.productShipping,
                            weightUnit: e.target.value,
                          },
                        }))
                      }
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="lb">lb</option>
                    </select>

                  </div>
                </div>
              )}

            </div>
          </div>
          {/* SEO Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex item-center justify-between">
              <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Search engine listing</p>
              <div>
                <PenIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer" onClick={() => setEditing(!isEditing)} />
              </div>
            </div>
            <p className="text-xs font-medium text-gray-900 mb-4 dark:text-white">Add a title and description to see how this product might appear in a search engine listing</p>
            {
              isEditing ? (<div className='space-y-4'>
                <div>
                  <label htmlFor="page_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Page Title</label>
                  <input type="text" id="page_title" name='pageTitle' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <div>
                  <label htmlFor="meta_desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Page Description</label>
                  <textarea id="meta_desc" rows={5} name='pageDesc' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Url handle</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                   shop/
                  </span>
                  <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
              </div>) : null
            }
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Product Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Status</p>
            <select
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.productStatus}
              onChange={(e) => setFormValues(prev => ({ ...prev, productStatus: e.target.value }))}
              required
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>


          </div>

          {/* Publishing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Publishing</p>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2 dark:text-gray-400">Online Store</span>
                <input
                  type="checkbox"
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600"
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Point of Sale</div>
            </div>
          </div>

          {/* Product Organization */}

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Product Organization</p>

            {/* Type */}
            <div className="mb-3">
              <label htmlFor="product-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
              <input
                type="text"
                id="product-type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. Shirt"
                required
                value={formValues.productOrganization.type || ''}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    productOrganization: {
                      ...prev.productOrganization,
                      type: e.target.value,
                    },
                  }))
                }
              />
            </div>

            {/* Vendor */}
            <div className="mb-3">
              <label htmlFor="product-vendor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vendor</label>
              <input
                type="text"
                id="product-vendor"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. Nike"
                required
                value={formValues.productOrganization.vendor || ''}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    productOrganization: {
                      ...prev.productOrganization,
                      vendor: e.target.value,
                    },
                  }))
                }
              />
            </div>

            {/* Collection */}
            <CollectionSelector collections={['Home page', 'Summer Collection', 'Men’s Wear']} />

            {/* Tags */}
            <div className="mb-3">
              <label htmlFor="product-tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>

              <div className="flex flex-wrap gap-2 mb-2">
                {formValues.productTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-800 dark:text-white"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="ml-2 text-blue-800 dark:text-white hover:text-red-600"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <input
                type="text"
                id="product-tags"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
