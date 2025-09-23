'use client';
import React, { useState, useEffect, use, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal, removeItem, updateQty } from "@/redux/slices/cartSlice";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import SignInModal from '@/components/SignInModal/SignInModal';
import SignUpModal from '@/components/SignUpModal/SignUpModal';
import Header from '@/components/Header/Header';
import Link from 'next/link';
import CouponForm from '@/components/CouponForm/CouponForm';


// Helper Component: Input Field
const Input = ({ name, type = "text", placeholder, value, onChange, error }) => {
    const inputProps = {
        name,
        type,
        placeholder,
        value: value || "",
        onChange,
        className: `
      w-full px-3 py-2 rounded-md 
      bg-white  
      text-gray-900  
      border ${error ? "border-red-500 mb-1" : "border-gray-300  mb-4"}
      placeholder-gray-500 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    `,
    };

    return (
        <div>
            <input {...inputProps} />
            {error && <p className="text-red-500 text-sm mt-1 mb-4">{error}</p>}
        </div>
    );
};

// Helper Component: Select Dropdown
const UAE_STATES = [
    { value: "AD", label: "Abu Dhabi" },
    { value: "DU", label: "Dubai" },
    { value: "SH", label: "Sharjah" },
    { value: "AJ", label: "Ajman" },
    { value: "UQ", label: "Umm Al-Quwain" },
    { value: "RK", label: "Ras Al-Khaimah" },
    { value: "FJ", label: "Fujairah" },
];

const Select = ({ name, value, options, onChange, error }) => (
    <div>
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                required
                className={`
                    appearance-none w-full px-3 py-2 rounded-md bg-white text-gray-900
                    border ${error ? "border-red-500 mb-1" : "border-gray-300 mb-4"}
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                `}
            >
                <option value="" disabled hidden>
                    Select Emirates
                </option>

                {options.map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <div className="absolute top-3 right-0 flex items-center px-2 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-1 mb-4">{error}</p>}
    </div>
);


const useCartTotal = (items) => {
    return useMemo(() => {
        if (!items) return 0;

        const normalizedItems = Array.isArray(items) ? items : [items];

        return normalizedItems.reduce(
            (sum, { price = 0, qty = 1 }) => sum + price * qty,
            0
        );
    }, [items]);
};

const REQUIRED_FIELDS = [
    "fullName",
    "address",
    "state",
    "phone",
];

export default function CheckoutForm() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [slug, setSlug] = useState(searchParams.get("i") || "");
    const [variant, setVariant] = useState(searchParams.get("v") || "");
    const items = useSelector(selectCartItems);
    const [item, setItems] = useState([]);
    const [discount, setDiscount] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isPending, setIsPending] = useState(false); // ⏳ waiting before order
    const [secondsLeft, setSecondsLeft] = useState(5);
    const abortController = useRef(null); // keep AbortController instance
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [qty, setQty] = useState(1); // quantity state

    const [copied, setCopied] = useState(false);
    const coupon = "UAESPECIAL20";

    const handleCopy = () => {
        navigator.clipboard.writeText(coupon);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // hide tooltip after 2s
    };


    // const isAuthenticated = typeof window !== 'undefined' && Cookies.get('access') ? true : false;

    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        address: "",
        apartment: "",
        phone: "",
        state: "",
        emailOffers: false,
        saveInfo: false,
        delivery: "Ship",
        method: "Home delivery",
        items: [], // ✅ hold product ids here
    });

    // ✅ update formData.email when authUser is loaded
    useEffect(() => {
        if (authUser?.email) {
            setFormData((prev) => ({
                ...prev,
                email: authUser.email,
            }));
        }
    }, [authUser]);



    useEffect(() => {
        const user = Cookies.get('user');
        if (user) {
            try {
                setAuthUser(JSON.parse(user));
            } catch {
                setAuthUser(user);
            }
        }
    }, []);


    useEffect(() => {
        if (!item) return;

        // normalize to array
        const normalizedItems = Array.isArray(item) ? item : [item];
        const ids = normalizedItems.map((p) => p.id);

        setFormData((prev) => ({
            ...prev,
            productIds: ids,
        }));
    }, [item]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };
    // 🛒 Always compute cart total at hook level
    const cartTotal = useCartTotal(items);

    // ✅ Now compute final total
    const total = useMemo(() => {
        if (slug === "cart") {
            return cartTotal;
        } else {
            return item?.price ? item.price * qty : 0;
        }
    }, [slug, cartTotal, item, qty]);



    const maxLength = 20;

    // ✅ Keep slug in sync with searchParams
    useEffect(() => {
        const newSlug = searchParams.get("i") || "";
        if (newSlug !== slug) {
            setSlug(newSlug);
        }
    }, [searchParams, slug]);

    useEffect(() => {
        if (slug !== "cart" && searchParams.get("q")) {
            const q = parseInt(searchParams.get("q"), 10);
            setQty(!isNaN(q) && q > 0 ? q : 1);
        }
    }, [searchParams, slug]);


    useEffect(() => {
        if (!slug || slug === "cart") {
            setItems(items);
            return;
        }

        const controller = new AbortController();

        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/product/products/${slug}?view=mini&variant=${variant}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                const normalizedItem = { ...data, qty }; // now qty is guaranteed to be latest
                setItems(normalizedItem);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("⚠️ Fetch aborted due to slug change or component unmount.");
                } else {
                    console.error("❌ Error fetching product:", error);
                }
            } finally {
                controller.abort();
            }
        };

        fetchProduct();

        return () => controller.abort();
    }, [slug, qty]); // ✅ include qty here


    // ⏳ Countdown effect
    useEffect(() => {
        if (!isPending) return;

        if (secondsLeft === 0) {
            setIsPending(false);
            setStatus("confirm"); // ✅ show confirm widget instead of auto place
            placeOrder();
            return;
        }

        const timer = setTimeout(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [isPending, secondsLeft]);

    const startOrderCountdown = () => {
        setIsPending(true);
        setStatus("pending");
        setSecondsLeft(5);
    };

    const cancelOrder = () => {
        setIsPending(false);
        setStatus("cancelled");
        setSecondsLeft(5);

        if (abortController.current) {
            abortController.current.abort();
        }
    };
    const validate = () => {
        let newErrors = {};
        REQUIRED_FIELDS.forEach((field) => {
            if (!formData[field]?.trim()) {
                newErrors[field] = "This field is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const placeOrder = async () => {
        if (!validate()) {
            setIsPending(false);
            setStatus("idle");
            return;
        }

        const authToken = Cookies.get("access");
        setIsPending(true);
        abortController.current = new AbortController();

        // 🛒 Build items array
        const orderItems = Array.isArray(item) ? item : [item];
        const itemsPayload = orderItems
            .map((p) => {
                const product_id = p?.id ?? null;
                const variant_id = p?.variant?.id ?? null; // null if no variant
                const name = p?.name ?? "";
                const quantity = Number(p?.qty ?? qty ?? 1);

                // Round price to whole number (avoid decimals)
                const unit_price = Math.round(Number(p?.price ?? p?.unit_price ?? 0));

                if (!product_id) return null; // skip invalid item

                return {
                    product_id,
                    variant_id,
                    name,
                    quantity,
                    unit_price,
                };
            })
            .filter(Boolean);

        const addressesPayload = [
            {
                address_type: "SHP",
                fullName: formData.fullName,
                email: formData.email || "",
                phone: formData.phone || "",
                line1: formData.address,
                line2: formData.apartment,
                state: formData.state,
                country: (formData.country || "UAE").toUpperCase(),
            },
        ];

        const payload = {
            delivery: formData.delivery,
            method: formData.method,
            items: itemsPayload,
            addresses: addressesPayload,
            code: discount?.data?.code || null,
        };

        try {
            const headers = { "Content-Type": "application/json" };
            if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/order/place-order/`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify(payload),
                    signal: abortController.current.signal,
                }
            );

            const data = await response.json().catch(() => ({}));

            if (response.status === 201 && data?.success) {
                // ✅ Success
                router.push(`/thankyou?order=${data.order_id}`);
                return;
            }

            // ❌ Non-201 → handle standardized error
            let errMsg = "Something went wrong. Please try again.";

            if (data?.message) {
                errMsg = data.message;

                // Replace "contact support" with clickable link
                errMsg = errMsg.replace(
                    /contact support/gi,
                    `<a href="/contact" class="underline text-blue-600 hover:text-blue-800">contact support</a>`
                );
            } else if (data?.errors) {
                errMsg = Object.entries(data.errors)
                    .map(
                        ([field, msgs]) =>
                            `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`
                    )
                    .join(" | ");
            } else if (response.status >= 400) {
                errMsg = `Error: ${response.status} ${response.statusText}`;
            }

            setErrorMessage(errMsg);
            setStatus("error");

        } catch (error) {
            if (error.name === "AbortError") {
                console.log("⚠️ Order request cancelled by user.");
            } else {
                console.error("❌ Failed to place order:", error);
                setErrorMessage(error.message || "Unexpected error occurred.");
                setStatus("error");
            }
        } finally {
            setIsPending(false);
        }
    };

    const handleDiscount = (data) => {
        if (data) {
            setDiscount(data);
        } else {
            setDiscount(null);

        }

    }

    const metaData = {
        title: `DoorBix || Checkout`,
        description: `Secure and seamless checkout process on DoorBix. Review your order details and complete your purchase with confidence.`,
        image: `https://www.doorbix.com/Image/Logo.png`,
        pageUrl: `https://www.doorbix.com/shop/checkout`,
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-8 lg:py-8 sm:px-2 sm:py-2 ">
                {/* Left Side: Form */}
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
                    {/* Contact Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
                        {
                            !authUser && (
                                <p className="text-sm text-gray-600 mb-4">
                                    <span className='cursor-pointer font-bold' onClick={() => setShowSignIn(true)}>Login</span> or <span className='cursor-pointer font-bold' onClick={() => setShowSignUp(true)}>create</span> an account for a faster checkout experience.
                                </p>
                            )
                        }
                        <Input
                            name="email"
                            placeholder="Email (Optional)"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <p className="text-green-700 text-sm">
                            Email is optional, but it helps us share your order updates faster.
                        </p>


                        {/* <div className="flex items-center">
                            <input
                                id="emailOffers"
                                name="emailOffers"
                                type="checkbox"
                                checked={formData.emailOffers}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="emailOffers" className="ml-2 text-sm text-gray-600 ">
                                Email me with news and offers
                            </label>
                        </div> */}
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Location (UAE)</h2>

                        <div className="w-full mb-2">
                            <Input name="fullName" error={errors.fullName} placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
                        </div>

                        <Input name="address" error={errors.address} placeholder="Address" value={formData.address} onChange={handleChange} />

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 '>
                            <Input name="apartment" placeholder="Apartment, suite, etc. (optional)" value={formData.apartment} onChange={handleChange} />
                            <Input name="phone" placeholder="Your phone no" value={formData.phone} onChange={handleChange} error={errors.phone} />
                        </div>

                        <div className="w-full ">
                            <Select
                                name="state"
                                value={formData.state}
                                options={UAE_STATES}
                                onChange={handleChange}
                                error={errors.state}
                            />
                        </div>

                        {/* <div className="flex items-center">
                            <input
                                id="saveInfo"
                                name="saveInfo"
                                type="checkbox"
                                checked={formData.saveInfo}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600 ">
                                Save this information for next time
                            </label>
                        </div> */}
                    </section>
                    {/* Shipping Method */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900  mb-4">Shipping</h2>
                        <div className="border border-gray-300  rounded-md bg-gray-50  p-4">
                            <p className="text-sm text-gray-600 ">
                                Your parcel is expected to arrive within 1–2 business days.
                            </p>


                        </div>
                    </section>

                    {/* Payment Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900  mb-4">Payment</h2>
                        <p className="text-sm text-gray-600  mb-4">
                            At Doorbix, we prioritize your comfort and trust — that’s why we offer a convenient and secure Cash on Delivery (COD) option, allowing you to pay only when your order arrives at your doorstep.</p>

                    </section>

                    <div className="w-full">
                        {status === "idle" && (
                            <button
                                onClick={startOrderCountdown}
                                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Place Order
                            </button>
                        )}
                        {status === "pending" && isPending && (
                            <div className="flex items-center justify-between gap-2">
                                <button
                                    onClick={cancelOrder}
                                    className="flex-1 bg-red-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Cancel ({secondsLeft}s)
                                </button>
                            </div>
                        )}
                        {status === "cancelled" && (
                            <button
                                onClick={startOrderCountdown}
                                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Place Order
                            </button>
                        )}
                        {status === "confirm" && (
                            <div className="p-4 bg-green-50 rounded-md text-center border border-green-200 text-green-800 font-semibold">
                                Order Confirmed
                            </div>
                        )}
                        {status === "error" && (
                            <div
                                className="p-4 bg-red-50 rounded-md text-center border border-red-200 text-red-800 font-semibold"
                                dangerouslySetInnerHTML={{ __html: errorMessage }}
                            />
                        )}
                    </div>
                    <div className="mt-8 pt-4 border-t border-gray-200  flex space-x-4 text-sm">
                        <div className="flex space-x-4">
                            <Link
                                href="/privacy"
                                className="text-blue-600 hover:underline transition-colors duration-200"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms-conditions"
                                className="text-blue-600 hover:underline transition-colors duration-200"
                            >
                                Terms & Conditions
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Right Side: Cart Summary */}
                <div className="space-y-6 ">

                    <div className="bg-white shadow-sm p-6 rounded-lg">
                        {Array.isArray(item) ? (
                            item.map((item) => {
                                const isLong = item.name.length > maxLength;
                                const displayName = isLong
                                    ? item.name.slice(0, maxLength) + "..."
                                    : item.name;

                                return (
                                    <div className="flex items-center space-x-4 space-y-4" key={item.id}>
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                className="w-15 h-15 object-cover rounded-md"
                                                alt={item.name}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Tooltip.Provider delayDuration={200}>
                                                <Tooltip.Root>
                                                    <Tooltip.Trigger asChild>
                                                        <p className="text-sm font-medium text-gray-800 truncate cursor-pointer">
                                                            {displayName}
                                                        </p>
                                                    </Tooltip.Trigger>
                                                    {isLong && (
                                                        <Tooltip.Portal>
                                                            <Tooltip.Content
                                                                side="top"
                                                                align="center"
                                                                className="z-[9999] bg-gray-900 text-white px-3 py-1 rounded-md text-xs shadow-lg"
                                                            >
                                                                {item.name}
                                                                <Tooltip.Arrow className="fill-gray-900" />
                                                            </Tooltip.Content>
                                                        </Tooltip.Portal>
                                                    )}
                                                </Tooltip.Root>
                                            </Tooltip.Provider>

                                            <p className="text-sm text-gray-500 ">
                                                Qty: {item.qty}
                                            </p>
                                        </div>

                                        <div className="text-sm font-medium text-gray-900 ">
                                            {(item.price * item.qty).toFixed(0)} {process.env.NEXT_PUBLIC_CURRENCY}
                                        </div>
                                    </div>
                                );
                            })
                        ) : item ? (
                            (() => {
                                const isLong = item.name.length > maxLength;
                                const displayName = isLong
                                    ? item.name.slice(0, maxLength) + "..."
                                    : item.name;

                                return (
                                    <div className="flex items-center space-x-4 space-y-4" key={item.id}>
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                className="w-15 h-15 object-cover rounded-md"
                                                alt={item.name}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Tooltip.Provider delayDuration={200}>
                                                <Tooltip.Root>
                                                    <Tooltip.Trigger asChild>
                                                        <p className="text-sm font-medium text-gray-800 truncate cursor-pointer">
                                                            {displayName}
                                                        </p>
                                                    </Tooltip.Trigger>
                                                    {isLong && (
                                                        <Tooltip.Portal>
                                                            <Tooltip.Content
                                                                side="top"
                                                                align="center"
                                                                className="z-[9999] bg-gray-900 text-white px-3 py-1 rounded-md text-xs shadow-lg"
                                                            >
                                                                {item.name}
                                                                <Tooltip.Arrow className="fill-gray-900" />
                                                            </Tooltip.Content>
                                                        </Tooltip.Portal>
                                                    )}
                                                </Tooltip.Root>
                                            </Tooltip.Provider>

                                            <p className="text-sm text-gray-500 ">
                                                Qty: {qty}
                                            </p>
                                        </div>

                                        <div className="text-sm font-medium text-gray-900 ">
                                            {(item.price * qty).toFixed(0)} {process.env.NEXT_PUBLIC_CURRENCY}
                                        </div>
                                    </div>
                                );
                            })()
                        ) : null}



                        <div className="pt-4 border-t border-gray-200  space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 ">Subtotal</span>
                                <span className="text-gray-900 ">{total.toFixed(0)} {process.env.NEXT_PUBLIC_CURRENCY}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 ">Shipping</span>
                                <span className="text-gray-500 ">Free</span>
                            </div>
                            {discount ? (
                                <div className="flex justify-between">
                                    <span className="text-gray-600 ">Discount</span>
                                    <span className="text-gray-500">
                                        - {discount.data.discount_value}{" "}
                                        {discount.data.discount_type === "percentage"
                                            ? "%"
                                            : process.env.NEXT_PUBLIC_CURRENCY}
                                    </span>

                                </div>
                            ) : null}

                        </div>

                        <div className="pt-4 border-t border-gray-200  flex justify-between text-lg font-semibold">
                            <span className="text-gray-900 ">Total</span>
                            <div className="text-right">
                                <>
                                    {discount && discount.data ? (
                                        <>
                                            <span className="line-through text-gray-500 mr-2">
                                                {total} {process.env.NEXT_PUBLIC_CURRENCY}
                                            </span>
                                            <span className="text-gray-900">
                                                {Math.round(
                                                    discount.data.discount_type === "percentage"
                                                        ? (total - (total * discount.data.discount_value) / 100).toFixed(0)
                                                        : total - discount.data.discount_value
                                                )}{" "}
                                                {process.env.NEXT_PUBLIC_CURRENCY}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-gray-900">
                                            {total.toFixed(0)} {process.env.NEXT_PUBLIC_CURRENCY}
                                        </span>
                                    )}
                                </>



                            </div>
                        </div>

                    </div>
                    <div className='px-2'>
                        <div className="px-2 text-center sm:text-left">
                            <p className="text-sm sm:text-base text-gray-700 mt-1 mb-4">
                                Use coupon code{" "}
                                <span className="relative">
                                    <span
                                        className="font-mono font-bold text-indigo-600 cursor-pointer"
                                        onClick={handleCopy}
                                    >
                                        {coupon}
                                    </span>

                                    {copied && (
                                        <span
                                            className="absolute left-1/2 -translate-x-1/2 -top-7 
                                                bg-gray-800 text-white text-xs px-2 py-1 
                                                rounded-md shadow-md whitespace-nowrap"
                                        >
                                            Code is copied!
                                        </span>

                                    )}
                                </span>{" "}
                                to get <span className="font-semibold text-green-600">20% OFF</span> your order.
                            </p>
                        </div>


                        <CouponForm email={formData.email} handleDiscount={handleDiscount} />
                    </div>
                </div>
            </div>
            {/* Sign In Modal */}
            <SignInModal
                isOpen={showSignIn}
                onClose={() => setShowSignIn(false)}
                onSwitchToSignUp={() => {
                    setShowSignIn(false);
                    setShowSignUp(true);
                }}
            />

            <SignUpModal
                isOpen={showSignUp}
                onClose={() => setShowSignUp(false)}
                onSwitchToSignIn={() => {
                    setShowSignUp(false);
                    setShowSignIn(true);
                }}
            />
        </div>
    );
}
