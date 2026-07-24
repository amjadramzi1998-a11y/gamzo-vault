import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "@/components/Footer";
import VisitorTracker from "@/components/VisitorTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GAMZO | Gaming Store",
  description: "GAMZO - Play To Win",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#18181b",
              color: "#fff",
              border: "1px solid #2563eb",
              borderRadius: "12px",
            },
          }}
        />
<VisitorTracker />
        {children}

        <Footer />

      </body>
    </html>
  );
}