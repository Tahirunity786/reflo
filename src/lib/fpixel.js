// lib/fpixel.js
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

export const pageview = () => {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'PageView');
};

export const trackEvent = (name, params = {}) => {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', name, params);
};
