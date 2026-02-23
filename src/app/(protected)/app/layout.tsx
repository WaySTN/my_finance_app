"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - desktop always visible, mobile conditional */}
            <div className="hidden lg:flex">
                <Sidebar />
            </div>
            {sidebarOpen && (
                <div className="lg:hidden">
                    <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                </div>
            )}

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-7xl p-4 lg:p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
