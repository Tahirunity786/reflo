// components/FacebookPixel.jsx
'use client';
import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/fpixel';

export default function FacebookPixel() {
  const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const pathname = usePathname();

  // track page views on route change
  useEffect(() => {
    // wait until fbq is ready
    if (typeof window !== 'undefined' && window.fbq) {
      pageview();
    }
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      {/* load the FB events script and initialize */}
      <Script
        id="fb-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
        `,
        }}
      />
      {/* we trigger PageView on route change via useEffect above */}
    </>
  );
}
