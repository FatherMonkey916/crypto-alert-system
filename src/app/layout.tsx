import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header"


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
    <body className="antialiased" suppressHydrationWarning>
        <div className="flex h-screen bg-background">
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">{children}</main>
          </div>
        </div>
    </body>
  </html>
  );
}
