import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Generadora San Felipe | 470MW Combined Cycle Power Plant",
  description:
    "Generadora San Felipe is building a 470MW combined cycle power plant in the Dominican Republic, strengthening energy security and sustainable development with world-class GE Vernova 7HA.02 technology.",
  keywords: [
    "Generadora San Felipe",
    "power generation",
    "Dominican Republic",
    "combined cycle",
    "470MW",
    "GE Vernova 7HA.02",
    "energy",
    "sustainability",
  ],
  openGraph: {
    title: "Generadora San Felipe | 470MW Combined Cycle Power Plant",
    description:
      "Building the future of energy in the Dominican Republic with 470MW of efficient, reliable power generation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
