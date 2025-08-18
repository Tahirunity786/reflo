"use client";

import { PenIcon, X } from "lucide-react";

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'wc-toast';
import MediaUploader from "../Admin/MediaUploader/MediaUploader";
const ReactQuill = dynamic(
    () => import('react-quill-new'),
    { ssr: false }
);


const AddCollectionModal = ({ onClose }) => {
    const [collectionName, setCollectionName] = useState("");
    const [isEditing, setEditing] = useState(false);
    const [loading, setLoafing] = useState(false);
    const [tagInput, setTagInput] = useState('');


    const quillRef2 = useRef(null);

    const [formValues, setFormValues] = useState({
        collectionTitle: '',
        collectionStatus: 'draft',
        collectionDescription: '',
        collectionTags: [],
        collectionImage: {
            url: '',
            alt: '',
            public_id: '',
            size: 0,
        },
        pageTitle: '',
        pageDesc: '',
    });


    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (newTag && !formValues.collectionTags.includes(newTag)) {
                setFormValues((prev) => ({
                    ...prev,
                    collectionTags: [...prev.collectionTags, newTag],
                }));
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        setFormValues((prev) => ({
            ...prev,
            collectionTags: prev.collectionTags.filter((_, i) => i !== indexToRemove),
        }));
    };




    // Prepare FormData object for submission
    const buildFormData = () => {
        const data = new FormData();
        data.append('collectionTitle', formValues.collectionTitle);
        data.append('collectionStatus', formValues.collectionStatus);
        data.append('collectionDescription', formValues.collectionDescription);
        data.append('collectionTags', JSON.stringify(formValues.collectionTags));
        data.append('pageTitle', formValues.pageTitle);
        data.append('pageDesc', formValues.pageDesc);

        // Make sure collectionImage is an array or single file
        if (Array.isArray(formValues.collectionImage)) {
            formValues.collectionImage.forEach((file) => {
                data.append('images', file);
            });
        } else {
            data.append('images', formValues.collectionImage); // single file fallback
        }

        return data;
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));


    };

    const handleSubmit = async () => {
        const formData = buildFormData();

        try {
            setLoafing(true);

            const response = await fetch('/api/collection', {
                method: 'POST',
                body: formData,
            });

            let result;
            try {
                result = await response.json(); // Parse JSON safely
            } catch (jsonError) {
                throw new Error('Invalid server response. Please try again later.');
            }

            if (!response.ok) {
                throw new Error(result?.error || 'Failed to add collection');
            }

            toast.success('Collection added successfully!');
            onClose(); // Close modal on success
        } catch (error) {
            console.error('❌ Error adding collection:', error);
            toast.error(error.message || 'An error occurred while adding the collection');
        } finally {
            setLoafing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-30 backdrop-blur-sm">
            {/* Modal Container */}
            <div className="bg-white h-[500px] overflow-auto dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-[880px] p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                    <X size={20} />
                </button>

                {/* Modal Title */}
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Add New Collection
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Title */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="mb-4">

                            <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Title</label>
                            <input
                                type="text"
                                placeholder="Fashion"
                                value={formValues.collectionTitle}
                                name='collectionTitle'
                                onChange={handleChange}
                                className="border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-900 bg-white dark:bg-gray-700"
                            />

                        </div>
                        <div className="mb-4 rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
                            <ReactQuill
                                ref={quillRef2}
                                value={formValues.collectionDescription}
                                onChange={(value) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        collectionDescription: value,
                                    }))
                                }
                                theme="snow"
                                placeholder="Write product description..."
                                className="dark:[&_.ql-toolbar]:bg-gray-700 dark:[&_.ql-container]:bg-gray-800 dark:[&_.ql-editor]:text-white"
                            />

                        </div>
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
                                        <input
                                            type="text"
                                            id="page_title"
                                            name="pageTitle"
                                            value={formValues.pageTitle}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="meta_desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Page Description</label>
                                        <textarea
                                            id="meta_desc"
                                            name="pageDesc"
                                            value={formValues.pageDesc}
                                            onChange={handleChange}
                                        />                                    </div>
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

                    {/* <Image */}
                    <div className="lg:col-span-1">
                        <div className="mb-3">

                            <MediaUploader
                                mode="single"
                                onImagesChange={(newImages) => {
                                    setFormValues(prev => ({
                                        ...prev,
                                        collectionImage: newImages,
                                    }));
                                }}
                            />

                        </div>
                        {/* Tags */}
                        <div className="mb-3">
                            <label htmlFor="product-tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>

                            <div className="flex flex-wrap gap-2 mb-2">
                                {formValues.collectionTags.map((tag, index) => (
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
                <button
                    className="bg-sky-600 text-white py-2.5 px-5 rounded-lg my-2 float-right"
                    onClick={handleSubmit}
                >
                    {loading ? "Adding Collection" : "Add Collection"}
                </button>
            </div>
        </div>
    );
};

export default AddCollectionModal;
