"use client";

import { Landmark } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Helper: check if 3 days passed since last close
const hasThreeDaysPassed = (lastClosed) => {
    if (!lastClosed) return true;
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    return Date.now() - new Date(lastClosed).getTime() > threeDays;
};

export default function PromotionModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const prevFocusRef = useRef(null);

    // Open modal if 3 days passed
    useEffect(() => {
        const lastClosed = localStorage.getItem("promoClosedAt");
        if (hasThreeDaysPassed(lastClosed)) {
            setIsOpen(true);
        }
    }, []);

    // Handle scroll lock + Escape close
    useEffect(() => {
        function handleKey(e) {
            if (!isOpen) return;
            if (e.key === "Escape") {
                e.preventDefault();
                handleClose();
            }
        }

        if (isOpen) {
            document.body.style.overflow = "hidden";
            prevFocusRef.current = document.activeElement;
            window.addEventListener("keydown", handleKey);
        } else {
            document.body.style.overflow = "";
            if (prevFocusRef.current?.focus) prevFocusRef.current.focus();
            window.removeEventListener("keydown", handleKey);
        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKey);
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("promoClosedAt", new Date().toISOString());
    };

    // Send email to backend to generate + send coupon
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/subscribe/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                let message = "Something went wrong. Please try again.";
                try {
                    const data = await res.json();
                    if (data.email?.length) {
                        message = "Oops! That email is already subscribed 🚀";
                    } else if (data.detail) {
                        message = data.detail; // backend-friendly message
                    }
                } catch {
                    // ignore parsing errors and keep generic message
                }
                throw new Error(message);
            }

            setSuccess(true);
            setTimeout(() => handleClose(), 2500);
        } catch (err) {
            setError(err.message || "Unexpected error. Try again later.");
        } finally {
            setLoading(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            {/* Modal Card */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ✕
                </button>

                {/* Grid layout: Image Left, Content Right */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: Image */}
                    <div className="h-48 sm:h-64 lg:h-auto">
                        <img
                            src="/Image/photo-1607083206968-13611e3d76db.avif"
                            alt="Shopping Promotion"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="p-6 sm:p-8 flex flex-col justify-center text-center lg:text-left">
                        {!success ? (
                            <>
                                <h2 className="text-2xl sm:text-3xl flex items-center gap-2 font-bold text-gray-900 mb-3">
                                    <Landmark className="w-7 h-7 text-yellow-500" />
                                    <span className="text-yellow-500">UAE Special</span>
                                </h2>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                    Get <span className="text-blue-500">20% OFF</span> 🎉 on each product.
                                </h3>
                                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                                    Enter your email and we’ll send your discount coupon instantly.
                                </p>

                                {/* Email Form */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col sm:flex-row gap-3"
                                >
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-yellow-500 text-white font-semibold rounded-lg px-6 py-3 text-sm sm:text-base hover:bg-yellow-600 transition-all disabled:opacity-60"
                                    >
                                        {loading ? "Sending..." : "Get Coupon"}
                                    </button>
                                </form>

                                {/* Error message */}
                                {error && (
                                    <p className="text-sm text-red-500 mt-3">
                                        {error.includes("already subscribed")
                                            ? "✨ You're already on our list! Stay tuned for more deals."
                                            : error}
                                    </p>
                                )}

                                {/* Footer */}
                                <p className="text-xs text-gray-400 mt-4">
                                    No spam, only exclusive deals ✨
                                </p>
                            </>
                        ) : (
                            <div className="py-6">
                                <h2 className="text-2xl font-bold text-green-600 mb-2">
                                    ✅ Success!
                                </h2>
                                <p className="text-gray-600">
                                    Check your inbox for your <b>20% OFF coupon</b>.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
