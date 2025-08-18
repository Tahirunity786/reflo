import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalWrapper from "@/components/ConditionalWrapper/ConditionalWrapper";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
import ReduxProvider from "./Provider/Provider";


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
      </body>
    </html>
  );
}
