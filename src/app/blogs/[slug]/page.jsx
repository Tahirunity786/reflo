"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import HtmlContent from "@/components/HtmlContent/HtmlContent";
import Comment from "@/components/Comment/Comment";
import CommentForm from "@/components/CommentForm/CommentForm";

/**
 * Blog Detail Page
 * - Uses dynamic route param [slug]
 * - Fetches blog data from an API (placeholder demo)
 * - Displays a modern, responsive blog layout with TailwindCSS
 */

const comments = [
    {
        id: 1,
        author: "Jean Doe",
        avatar: "https://i.pravatar.cc/100?img=1",
        date: "Jan 9, 2018 at 2:21pm",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        replies: [
            {
                id: 2,
                author: "Jane Smith",
                avatar: "https://i.pravatar.cc/100?img=2",
                date: "Jan 9, 2018 at 3:00pm",
                text: "Replying to Jean’s comment. Nice thoughts!",
                replies: [
                    {
                        id: 3,
                        author: "Alex Johnson",
                        avatar: "https://i.pravatar.cc/100?img=3",
                        date: "Jan 9, 2018 at 3:30pm",
                        text: "Replying to Jane. Fully agree!",
                    },
                ],
            },
        ],
    },
];

const BlogDetailPage = () => {
    const { slug } = useParams(); // Get slug from route
    const [post, setPost] = useState(null);
    const [comment, setComments] = useState([]);




    const fetchPost = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/content/${slug}/`);
            if (res.ok) {
                const data = await res.json();
                setPost(data)
            }

        } catch (e) {
            console.log(e)
        }
    }
    const handleFetchComment = async () => {
        if (!post?.id) return; // Prevent calling API with undefined

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${post.id}/comments/`);
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
    }, []); // empty dependency array

    useEffect(() => {
        handleFetchComment();
    }, [post?.id])



    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            {/* Cover Image */}
            <div className="relative w-full h-72 md:h-96 mb-4 rounded-2xl overflow-hidden shadow-lg">
                <Image
                    src={'/Image/Copilot_20250825_121802.png'}
                    alt={'blogs'}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <h3 className="font-bold text-3xl my-5">Hello world</h3>
            <div className="flex items-center space-x-2 mb-5">
                <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-800">
                    <User style={{ color: "white" }} />
                </div>
                <div className="space-y-0.5">
                    <h6>Posted by Admin</h6>
                    <h6 className="text-sm">Date Posted <span>2/2/2015</span></h6>
                </div>
            </div>

            <article>
                <HtmlContent charLimit={'full'} content={post?.blogDescription} />
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
                <h5>Comments (3)</h5>

                {
                    comment.length > 0 && (
                        comment.map((c) => (
                            <Comment key={c.id} comment={c} />
                        ))
                    )
                }



            </div>
            <CommentForm postId={post?.id} onCommentPost={handleFetchComment} />

        </main>
    );
};

export default BlogDetailPage;
