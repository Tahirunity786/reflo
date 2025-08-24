import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalWrapper from "@/components/ConditionalWrapper/ConditionalWrapper";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
import ReduxProvider from "./Provider/Provider";

import Script from 'next/script';


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
      </body>
    </html>
  );
}
