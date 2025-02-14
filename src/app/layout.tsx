import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Alert System",
  description: "Track crypto token prices across multiple chains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <div className="flex h-screen bg-background">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* <ToastProvider> */}
            {/* Other components */}
            {/* <ToastViewport className="fixed top-0 right-0 p-4" /> */}
            {/* </ToastProvider> */}
            <Header />
            <Toaster />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
