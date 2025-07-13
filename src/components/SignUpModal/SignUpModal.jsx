'use client';
import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

// ✅ Reusable input field
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

const SignUpModal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔐 You can integrate API call or validation logic here
    console.log({ firstName, lastName, email, password });
    onClose(); // close modal after signup
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-lg animate-fadeIn">
        {/* ❌ Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <X size={20} />
        </button>

        {/* 📝 Modal Title */}
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please fill the fields below to register.
        </p>

        {/* 🔒 Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            placeholder="First name*"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            placeholder="Last name*"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputField
            type="email"
            placeholder="Email*"
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
              className="absolute right-5 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400 hover:text-black"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full bg-black cursor-pointer text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
