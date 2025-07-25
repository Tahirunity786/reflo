'use client';
import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import SignUpModal from '../SignUpModal/SignUpModal';

// Reusable Input Field Component
const InputField = ({ type = 'text', placeholder, value, onChange, ...rest }) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
        {...rest}
    />
);

const SignInModal = ({ isOpen, onClose, onSwitchToSignUp }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-lg animate-fadeIn">
                {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <X size={20} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Please enter your details below to sign in.
                </p>

                {/* Form */}
                <div className="space-y-4">
                    <InputField
                        type="email"
                        placeholder="Your email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="relative">
                        <InputField
                            type={showPass ? 'text' : 'password'}
                            placeholder="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                        >
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="text-sm text-left text-gray-600 underline hover:text-black cursor-pointer">
                        Forgot your password?
                    </div>

                    {/* Login Button */}
                    <button className="w-full bg-black cursor-pointer text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                        Login
                    </button>

                    {/* Create Account Button */}
                    <button
                        onClick={onSwitchToSignUp}
                        className="w-full border cursor-pointer border-black py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                        Create Account
                    </button>
                </div>
            </div>
            <SignUpModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} />
        </div>
    );
};

export default SignInModal;
