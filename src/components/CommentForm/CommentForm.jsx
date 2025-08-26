"use client";

import { useState } from "react";
// import * as Tooltip from "@radix-ui/react-tooltip";
import toast from "react-hot-toast";

/**
 * Top-level Comment Form Component
 * - Posts new root comments on a blog post
 * - Matches Django backend fields: name, email, comment
 */
export default function CommentForm({ postId,onCommentPost }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !comment.trim()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${postId}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            comment, // ✅ matches Django model
          }),
        }
      );

      if (res.ok) {
        // Clear form
        setName("");
        setEmail("");
        setComment("");
        toast.success("Thanks for your feedback!");
        onCommentPost();
      } else {
        const data = await res.json();
        setError("Failed to submit comment. Please try again.");
        toast.error("Something went wrong!")
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full p-4 bg-white border rounded-xl shadow-sm"
    >
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
      />

      {/* Email */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
      />

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        rows={4}
        className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
