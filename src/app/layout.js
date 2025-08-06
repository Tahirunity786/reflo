import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalWrapper from "@/components/ConditionalWrapper/ConditionalWrapper";
import Head from "next/head";
import Header from "@/components/Header/Header";


export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <Head>
        <Header />
      </Head>
      <body>
        <ConditionalWrapper>{children}</ConditionalWrapper>
      </body>
    </html>
  );
}
