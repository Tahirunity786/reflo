'use client';

import { useState, useRef, useCallback } from 'react';

export default function MediaUploader() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const acceptedFormats = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg'];

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file =>
      acceptedFormats.includes(file.type)
    );
    const newImages = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const handlePaste = useCallback((e) => {
    const items = e.clipboardData.items;
    const files = [];
    for (const item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }
    handleFiles(files);
  }, []);

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={handlePaste}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <label className="text-sm font-medium text-gray-700 mb-4 block dark:text-gray-300">Media</label>

      {/* Upload Box */}
      <div
        onClick={triggerFileInput}
        className="rounded-lg text-center border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/jpg"
          multiple
          onChange={handleFileInputChange}
          hidden
        />
        <div className="space-y-2">
          <div className="text-gray-400 dark:text-gray-500">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Drag & drop, paste, or click to upload</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">Accepted: .png, .jpeg, .webp, .jpg</p>
        </div>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.url}
                alt={`preview-${index}`}
                className="rounded-md border border-gray-300 dark:border-gray-600 object-cover h-32 w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
