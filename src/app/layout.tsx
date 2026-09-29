import type { Metadata } from "next";
import { Inter, Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import MotionMain from "./MotionMain";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GRAVITA | Eyewear",
  description: "Eyewear shaped for the way you move through the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jost.variable} antialiased min-h-screen flex flex-col`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
        >
          Skip to content
        </a>
        <Header />
        <MotionMain>{children}</MotionMain>
        <Footer />
      </body>
    </html>
  );
}
