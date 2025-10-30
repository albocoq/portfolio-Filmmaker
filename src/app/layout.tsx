import type { Metadata } from "next";
import "./globals.css";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { Suspense } from "react";
import SmoothScroller from "@/hook/Lenis";
import CustomCursor from "@/components/CustomCursor";
import GlobalCursorEvents from "@/components/GlobalCursorEvents";

export const metadata: Metadata = {
  title: "sacha FILMS - Creative film maker born in Málaga",
  description: "Bringing stories to life through motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <GlobalCursorEvents />
          <CustomCursor />
          <SmoothScroller />
        </Suspense>

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
