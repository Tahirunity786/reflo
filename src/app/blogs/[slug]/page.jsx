"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import HtmlContent from "@/components/HtmlContent/HtmlContent";
import Comment from "@/components/Comment/Comment";
import CommentForm from "@/components/CommentForm/CommentForm";
import BlogSkeleton from "@/components/BlogSkeleton/BlogSkeleton"; // 👈 import skeleton loader

/**
 * Blog Detail Page
 * - Uses dynamic route param [slug]
 * - Fetches blog data from an API
 * - Displays a modern, responsive blog layout with TailwindCSS
 */

const BlogDetailPage = () => {
  const { slug } = useParams(); // Get slug from route
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // default: loading
  const [comments, setComments] = useState([]);

  const fetchPost = async () => {
    try {
      setLoading(true); // start loading
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/content/${slug}/`
      );
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      }
    } catch (e) {
      console.error("Error fetching post:", e);
    } finally {
      setLoading(false); // end loading
    }
  };

  const handleFetchComment = async () => {
    if (!post?.id) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${post.id}/comments/`
      );
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (e) {
      console.error("Error fetching comments:", e);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]); // ✅ add slug as dependency

  useEffect(() => {
    handleFetchComment();
  }, [post?.id]);

  // ✅ Show loader while fetching post
  if (loading) return <BlogSkeleton />;


  const metaData = {
    title: `DoorBix || ${post?.metaTitle}`,
    description: `${post?.metaDescription}`,
    image: `${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${post?.blogImage}`,
    pageUrl: `https://wwww.doorbix.com/shop/${post?.slug}`,
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />

      {/* Cover Image */}
      <div className="relative w-full h-72 md:h-96 mb-4 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${post?.blogImage}`}
          alt={post?.blogTitle}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h3 className="font-bold text-3xl my-5">{post?.blogTitle}</h3>
      <div className="flex items-center space-x-2 mb-5">
        <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-800">
          <User style={{ color: "white" }} />
        </div>
        <div className="space-y-0.5">
          <h6>Posted by Admin</h6>
          <h6 className="text-sm">
            Date Posted <span>2/2/2015</span>
          </h6>
        </div>
      </div>

      <article>
        <HtmlContent charLimit={"full"} content={post?.blogDescription} />
      </article>

      {post?.blogCategory && (
        <div className="mt-10 mb-10">
          <p className="mb-3">Category: </p>
          <span
            key={post.blogCategory.id}
            className="inline-block bg-yellow-400 text-black text-sm px-3 py-1 rounded-full mb-3 "
          >
            {post.blogCategory.name}
          </span>
        </div>
      )}

      <div className="mt-10 mb-10">
        <h5>Comments ({comments?.length})</h5>
        {comments.length > 0 &&
          comments.map((c) => <Comment key={c.id} comment={c} postId={post?.id} onCommentPost={handleFetchComment} />)}
      </div>

      <CommentForm postId={post?.id} onCommentPost={handleFetchComment} />
    </main>
  );
};

export default BlogDetailPage;
