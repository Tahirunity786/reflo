// components/ConditionalWrapper/ConditionalWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
// import Footer from '../Footer/Footer';

export default function ConditionalWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const hideRoutes = [
    '404',
    'login',
    'register',
    'forgot-password',
    'reset-password',
    'dashboard',
  ];

  const showNavbar = !hideRoutes.includes(pathname.split('/')[1]);
  const showFooter = !hideRoutes.includes(pathname.split('/')[1]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="overflow-x-hidden">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
