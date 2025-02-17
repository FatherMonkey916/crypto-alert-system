"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="h-screen bg-background">
            {pathname !== "/" && <Header />}
            <div className="flex overflow-hidden">
                {pathname !== "/" && <Sidebar />}
                <Toaster />
                <main className="grow overflow-x-hidden overflow-y-auto bg-background">{children}</main>
            </div>
        </div>
    );
}