"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ArrowLeftRight,
    Wallet,
    Tags,
    BarChart3,
    Settings,
    X,
    TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
    { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
    { name: "Transaksi", href: "/app/transactions", icon: ArrowLeftRight },
    { name: "Akun", href: "/app/accounts", icon: Wallet },
    { name: "Kategori", href: "/app/categories", icon: Tags },
    { name: "Laporan", href: "/app/reports", icon: BarChart3 },
    { name: "Pengaturan", href: "/app/settings", icon: Settings },
];

interface SidebarProps {
    open?: boolean;
    onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div
            className={cn(
                "flex h-full w-64 flex-col border-r border-border bg-card",
                open !== undefined && "fixed inset-y-0 left-0 z-50 lg:static"
            )}
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
                <Link href="/app/dashboard" className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/20">
                        <TrendingUp className="h-4.5 w-4.5 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        MyFinance
                    </span>
                </Link>
                {onClose && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 lg:hidden"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "h-4.5 w-4.5 flex-shrink-0",
                                        isActive ? "text-blue-500" : ""
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>

            {/* Bottom */}
            <div className="border-t border-border p-3">
                <div className="flex items-center justify-between px-3">
                    <span className="text-xs text-muted-foreground">Mode</span>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
