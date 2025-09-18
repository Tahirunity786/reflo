import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalWrapper from "@/components/ConditionalWrapper/ConditionalWrapper";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
import ReduxProvider from "./Provider/Provider";

import Script from 'next/script';
import FacebookPixel from "@/components/FacebookPixel/FacebookPixel";


export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <Head>
        <Header />
      </Head>
      <body>
        <ReduxProvider>
          <Toaster position="top-right" />

          <ConditionalWrapper>{children}</ConditionalWrapper>
        </ReduxProvider>
        <FacebookPixel />
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function(){
              var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/68aad36ff07f381927fea387/1j3dkjr4a';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `,
          }}
        />
        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive" // ensures it loads after page becomes interactive
        >
          {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "t0gw1glx7b");
        `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KPRFLHJG');
        `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N4KMGR17NW"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N4KMGR17NW');
        `}
        </Script>
      </body>
    </html>
  );
}
