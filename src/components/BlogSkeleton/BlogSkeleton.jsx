"use client";

import React from "react";

/**
 * Blog Skeleton Loader
 * - Modern skeleton UI with shimmer effect
 * - Mimics the layout of BlogDetailPage
 */
const BlogSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6 max-w-6xl mx-auto px-4 py-10">
      {/* Cover Image Skeleton */}
      <div className="w-full h-72 md:h-96 bg-gray-300 rounded-2xl" />

      {/* Title */}
      <div className="h-8 w-2/3 bg-gray-300 rounded-md" />

      {/* Author Section */}
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-300 rounded" />
          <div className="h-3 w-24 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Content Paragraphs */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-11/12 bg-gray-300 rounded" />
        <div className="h-4 w-10/12 bg-gray-300 rounded" />
        <div className="h-4 w-9/12 bg-gray-300 rounded" />
      </div>

      {/* Category Tag */}
      <div className="h-6 w-28 bg-gray-300 rounded-full" />

      {/* Comments Heading */}
      <div className="h-6 w-40 bg-gray-300 rounded" />

      {/* Comment Skeletons */}
      <div className="space-y-4 mt-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-start space-x-4">
            <div className="h-10 w-10 bg-gray-300 rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/3 bg-gray-300 rounded" />
              <div className="h-3 w-2/3 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;
