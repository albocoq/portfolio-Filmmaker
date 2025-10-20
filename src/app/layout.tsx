import type { Metadata } from "next";
import "./globals.css";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { Suspense } from "react";
import SmoothScroller from "@/hook/Lenis";

export const metadata: Metadata = {
  title: "sacha FILMS - Cinematography studio based in Amsterdam",
  description: "Unleashing the power of visual storytelling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <Suspense fallback={null}>
          <SmoothScroller />
        </Suspense>
      </body>
    </html>
  );
}
