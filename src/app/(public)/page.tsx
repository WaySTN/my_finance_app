import Link from "next/link";
import {
    TrendingUp,
    Shield,
    Zap,
    BarChart3,
    Wallet,
    ArrowRight,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
    {
        icon: Zap,
        title: "Input Super Cepat",
        description:
            "Catat transaksi dalam hitungan detik. Pilih tipe, masukkan nominal, selesai!",
        color: "from-amber-500 to-orange-500",
        bgColor: "bg-amber-500/10",
    },
    {
        icon: BarChart3,
        title: "Dashboard & Grafik",
        description:
            "Lihat ringkasan pemasukan, pengeluaran, dan tren keuangan secara visual.",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-500/10",
    },
    {
        icon: Wallet,
        title: "Multi Akun & Wallet",
        description:
            "Kelola berbagai akun—Cash, Bank, E-wallet—dalam satu tempat.",
        color: "from-violet-500 to-purple-500",
        bgColor: "bg-violet-500/10",
    },
    {
        icon: Shield,
        title: "Aman & Privat",
        description:
            "Data keuangan Anda terenkripsi dan hanya bisa diakses oleh Anda.",
        color: "from-emerald-500 to-green-500",
        bgColor: "bg-emerald-500/10",
    },
];

const benefits = [
    "Pantau pengeluaran harian dengan mudah",
    "Rekap otomatis per kategori & bulan",
    "Grafik tren keuangan yang jelas",
    "Gratis dan tanpa iklan",
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/20">
                            <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            MyFinance
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/auth/login">
                            <Button variant="ghost" size="sm">
                                Masuk
                            </Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25"
                            >
                                Daftar Gratis
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl" />
                    <div className="absolute top-32 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-3xl" />
                </div>

                <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 px-4 py-1.5 text-sm text-blue-600 dark:text-blue-400">
                            <Zap className="h-3.5 w-3.5" />
                            <span>Catat keuanganmu dalam 15 detik</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Kendalikan{" "}
                            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                                Keuangan Pribadimu
                            </span>{" "}
                            dengan Mudah
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                            Tidak perlu ribet! MyFinance membantu kamu mencatat pemasukan &
                            pengeluaran, lalu merangkumnya dalam grafik yang informatif.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link href="/auth/register">
                                <Button
                                    size="lg"
                                    className="h-12 px-8 text-base bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/25"
                                >
                                    Mulai Sekarang — Gratis
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/auth/login">
                                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                                    Sudah punya akun?
                                </Button>
                            </Link>
                        </div>

                        {/* Benefits mini-list */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                            {benefits.map((text) => (
                                <div
                                    key={text}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="border-t border-border bg-muted/30 py-20 sm:py-28">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Semua yang Kamu Butuhkan
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Fitur lengkap untuk mengelola keuangan pribadi, mulai dari
                            pencatatan hingga analisis.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
                            >
                                <div
                                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bgColor}`}
                                >
                                    <f.icon
                                        className={`h-6 w-6 bg-gradient-to-br ${f.color} bg-clip-text`}
                                        style={{
                                            color: f.color.includes("amber")
                                                ? "#f59e0b"
                                                : f.color.includes("blue")
                                                    ? "#3b82f6"
                                                    : f.color.includes("violet")
                                                        ? "#8b5cf6"
                                                        : "#10b981",
                                        }}
                                    />
                                </div>
                                <h3 className="text-lg font-semibold">{f.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 sm:py-28">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 p-8 sm:p-14 text-center">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                Mulai Kelola Keuanganmu Hari Ini
                            </h2>
                            <p className="mx-auto mt-4 max-w-xl text-blue-100 text-lg">
                                Bergabung sekarang dan rasakan kemudahan mencatat keuangan
                                pribadimu. Sepenuhnya gratis!
                            </p>
                            <div className="mt-8">
                                <Link href="/auth/register">
                                    <Button
                                        size="lg"
                                        className="h-12 px-8 text-base bg-white text-blue-600 hover:bg-blue-50 shadow-xl"
                                    >
                                        Daftar Sekarang
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-card py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-blue-600">
                                <TrendingUp className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                                MyFinance
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 MyFinance. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
