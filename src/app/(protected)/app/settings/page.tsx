"use client";

import { User, Mail, Moon, Sun, Monitor, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const themes = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
    ];

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
                <p className="text-sm text-muted-foreground">
                    Kelola profil dan preferensi akun kamu
                </p>
            </div>

            {/* Profile */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profil
                    </CardTitle>
                    <CardDescription>Informasi akun kamu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" defaultValue="Andi Pratama" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                defaultValue="andi@email.com"
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => toast.success("Profil berhasil disimpan!")}
                    >
                        Simpan Perubahan
                    </Button>
                </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Tampilan
                    </CardTitle>
                    <CardDescription>Atur tema tampilan aplikasi</CardDescription>
                </CardHeader>
                <CardContent>
                    {mounted && (
                        <div className="grid grid-cols-3 gap-3">
                            {themes.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => setTheme(t.value)}
                                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${theme === t.value
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                                            : "border-border hover:border-blue-300 hover:bg-muted/50"
                                        }`}
                                >
                                    <t.icon
                                        className={`h-6 w-6 ${theme === t.value ? "text-blue-500" : "text-muted-foreground"
                                            }`}
                                    />
                                    <span
                                        className={`text-sm font-medium ${theme === t.value ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
                                            }`}
                                    >
                                        {t.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Preferensi
                    </CardTitle>
                    <CardDescription>Pengaturan regional</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">Zona Waktu</p>
                            <p className="text-xs text-muted-foreground">
                                Digunakan untuk tampilan tanggal
                            </p>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Asia/Jakarta (WIB)
                        </p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">Mata Uang</p>
                            <p className="text-xs text-muted-foreground">
                                Format tampilan nominal
                            </p>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                            IDR (Rupiah)
                        </p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">Bahasa</p>
                            <p className="text-xs text-muted-foreground">
                                Bahasa tampilan aplikasi
                            </p>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Bahasa Indonesia
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-900 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base font-semibold text-red-600 dark:text-red-400">
                        Zona Bahaya
                    </CardTitle>
                    <CardDescription>
                        Tindakan ini tidak dapat dibatalkan
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium">Hapus Akun</p>
                        <p className="text-xs text-muted-foreground">
                            Hapus semua data dan tutup akun permanen
                        </p>
                    </div>
                    <Button variant="destructive" size="sm">
                        Hapus Akun
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
