'use client';
import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


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

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }) => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);



  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Example form data object
      const formData = {
        first_name: firstName, // replace with your state variables
        last_name: lastName, // replace with your state variables
        email: email,
        password: password
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/users/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      Cookies.set("access", data.tokens.access, { expires: 1 }); // 1 day
      Cookies.set("refresh", data.tokens.refresh, { expires: 7 }); // 7 days
      Cookies.set('user', JSON.stringify(data.user), { secure: true, sameSite: 'Strict' });

      onClose();
      router.refresh()


    } catch (err) {
      console.error("Error registering user:", err);
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-lg animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <X size={20} />
        </button>

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
            disabled={loading}
          >
            {loading ? "Submit..." : "Create Account"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-black font-semibold cursor-pointer hover:underline"
            onClick={onSwitchToSignIn}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
