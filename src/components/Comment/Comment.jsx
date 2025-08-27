"use client";

import { User, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Comment = ({ comment , postId, onCommentPost }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComment] = useState("");


  const handleReplySubmit = async (parentCommentId) => {
  if (!comments.trim()) return; // prevent empty reply

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
          comment: comments,
          comment_on_comment: parentCommentId, // attach reply to parent
        }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log("Reply posted:", data);

      // ✅ clear form after submit
      setName("");
      setEmail("");
      setComment("");
      setShowReplyBox(false);

      // refresh comment list
      onCommentPost && onCommentPost();
    } else {
      console.error("Failed to post reply:", await res.json());
    }
  } catch (error) {
    console.error("Error posting reply:", error);
  }
};



  // ✅ Ensure replies is always an array
  const replies = Array.isArray(comment?.replies) ? comment.replies : [];

  return (
    <div className="flex gap-4 mt-6">
      {/* Avatar */}
      <div className="w-12 h-12 flex-shrink-0">
        <div className="h-12 w-12 flex justify-center items-center rounded-full bg-gray-800">
          <User className="text-white" size={20} />
        </div>
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        {/* Author & Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <span className="font-semibold text-gray-900">{comment?.name}</span>
          <span className="text-sm text-gray-500">
            {comment?.created_at
              ? new Date(comment.created_at).toLocaleDateString()
              : ""}
          </span>
        </div>

        {/* Comment Text */}
        <p className="mt-2 text-gray-700 leading-relaxed">{comment?.comment}</p>

        {/* Actions */}
        <div className="mt-3 flex gap-4 items-center text-sm">
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="px-3 py-1 border rounded-md hover:bg-gray-100 transition"
          >
            Reply
          </button>

          {/* Toggle replies button if replies exist */}
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition"
            >
              {showReplies ? (
                <>
                  <ChevronUp size={16} /> Hide Replies
                </>
              ) : (
                <>
                  <ChevronDown size={16} /> Show Replies ({replies.length})
                </>
              )}
            </button>
          )}
        </div>

        {/* Reply Input Box */}
        {showReplyBox && (
          <div className="mt-3 lg:w-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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
            </div>

            <textarea
              value={comments}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your reply..."
              className="w-full p-2 border rounded-md text-sm focus:ring focus:ring-blue-200"
            />
            <div className="mt-2 flex gap-2">
              <button onClick={()=>{handleReplySubmit(comment?.id)}} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Post Reply
              </button>
              <button
                onClick={() => setShowReplyBox(false)}
                className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Nested Replies (animated) */}
        <AnimatePresence>
          {showReplies && replies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-6 space-y-6 border-l pl-6"
            >
              {replies.map((reply) => (
                <Comment key={reply.id} comment={reply} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Comment;
