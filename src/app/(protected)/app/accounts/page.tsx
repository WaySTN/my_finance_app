"use client";

import {
    Plus,
    Wallet,
    Landmark,
    Smartphone,
    Pencil,
    Trash2,
    TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { accounts } from "@/lib/dummy-data";
import { toast } from "sonner";

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

const typeIcons: Record<string, React.ElementType> = {
    CASH: Wallet,
    BANK: Landmark,
    EWALLET: Smartphone,
};

const typeLabels: Record<string, string> = {
    CASH: "Cash",
    BANK: "Bank",
    EWALLET: "E-Wallet",
};

const typeGradients: Record<string, string> = {
    CASH: "from-emerald-500 to-green-600",
    BANK: "from-blue-500 to-indigo-600",
    EWALLET: "from-violet-500 to-purple-600",
};

const typeBgGradients: Record<string, string> = {
    CASH: "from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30",
    BANK: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
    EWALLET: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
};

export default function AccountsPage() {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Akun & Wallet</h1>
                    <p className="text-sm text-muted-foreground">
                        Kelola semua akun keuangan kamu
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Akun
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Tambah Akun Baru</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Nama Akun</Label>
                                <Input placeholder="Contoh: BRI, ShopeePay" />
                            </div>
                            <div className="space-y-2">
                                <Label>Tipe</Label>
                                <Select defaultValue="BANK">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CASH">Cash</SelectItem>
                                        <SelectItem value="BANK">Bank</SelectItem>
                                        <SelectItem value="EWALLET">E-Wallet</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Saldo Awal (Rp)</Label>
                                <Input type="number" placeholder="0" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => toast.success("Akun berhasil ditambahkan!")}
                            >
                                Simpan
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Total Balance Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-0 shadow-xl shadow-blue-500/20 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
                <CardContent className="relative z-10 p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-100">Total Saldo Semua Akun</p>
                            <p className="text-3xl font-bold tracking-tight">
                                {formatCurrency(totalBalance)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Account Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {accounts.map((account) => {
                    const Icon = typeIcons[account.type];
                    const gradient = typeGradients[account.type];
                    const bgGradient = typeBgGradients[account.type];

                    return (
                        <Card
                            key={account.id}
                            className={`bg-gradient-to-br ${bgGradient} border-0 shadow-sm group hover:shadow-md transition-all duration-300`}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-md`}
                                        >
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{account.name}</p>
                                            <Badge
                                                variant="outline"
                                                className="mt-0.5 text-[10px] px-1.5 py-0"
                                            >
                                                {typeLabels[account.type]}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:text-destructive"
                                            onClick={() => toast.success("Akun berhasil dihapus!")}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-border/50">
                                    <p className="text-xs text-muted-foreground">Saldo Saat Ini</p>
                                    <p className="text-xl font-bold tracking-tight mt-0.5">
                                        {formatCurrency(account.balance)}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-1">
                                        Saldo awal: {formatCurrency(account.initialBalance)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
