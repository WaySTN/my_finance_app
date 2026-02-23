"use client";

import { useState } from "react";
import {
    Search,
    Plus,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Pencil,
    Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { transactions, accounts, categories } from "@/lib/dummy-data";
import { Transaction } from "@/lib/types";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { toast } from "sonner";

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

const ITEMS_PER_PAGE = 8;

export default function TransactionsPage() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("ALL");
    const [accountFilter, setAccountFilter] = useState<string>("ALL");
    const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter
    const filtered = transactions.filter((txn) => {
        if (typeFilter !== "ALL" && txn.type !== typeFilter) return false;
        if (accountFilter !== "ALL" && txn.accountId !== accountFilter) return false;
        if (categoryFilter !== "ALL" && txn.categoryId !== categoryFilter)
            return false;
        if (
            search &&
            !txn.note.toLowerCase().includes(search.toLowerCase())
        )
            return false;
        return true;
    });

    const sorted = [...filtered].sort(
        (a, b) => b.occurredAt.getTime() - a.occurredAt.getTime()
    );

    const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
    const paginated = sorted.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalIncome = filtered
        .filter((t) => t.type === "INCOME")
        .reduce((s, t) => s + t.amount, 0);
    const totalExpense = filtered
        .filter((t) => t.type === "EXPENSE")
        .reduce((s, t) => s + t.amount, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Transaksi</h1>
                    <p className="text-sm text-muted-foreground">
                        {filtered.length} transaksi ditemukan
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Transaksi
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Tambah Transaksi Baru</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Tipe</Label>
                                <Select defaultValue="EXPENSE">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="INCOME">Pemasukan</SelectItem>
                                        <SelectItem value="EXPENSE">Pengeluaran</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Nominal (Rp)</Label>
                                <Input type="number" placeholder="0" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label>Kategori</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.icon} {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Akun</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {accounts.map((acc) => (
                                                <SelectItem key={acc.id} value={acc.id}>
                                                    {acc.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal</Label>
                                <Input type="date" defaultValue={format(new Date(), "yyyy-MM-dd")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Catatan</Label>
                                <Input placeholder="Deskripsi singkat" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => toast.success("Transaksi berhasil ditambahkan!")}
                            >
                                Simpan
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Quick Summary */}
            <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-0 shadow-sm">
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                            <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Total Pemasukan</p>
                            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                {formatCurrency(totalIncome)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-0 shadow-sm">
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                            <ArrowDownRight className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Total Pengeluaran</p>
                            <p className="text-lg font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(totalExpense)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="border-border/50 shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari catatan transaksi..."
                                className="pl-10"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Select
                                value={typeFilter}
                                onValueChange={(v) => {
                                    setTypeFilter(v);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-[130px]">
                                    <Filter className="mr-2 h-3.5 w-3.5" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Semua Tipe</SelectItem>
                                    <SelectItem value="INCOME">Pemasukan</SelectItem>
                                    <SelectItem value="EXPENSE">Pengeluaran</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={accountFilter}
                                onValueChange={(v) => {
                                    setAccountFilter(v);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-[130px]">
                                    <SelectValue placeholder="Akun" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Semua Akun</SelectItem>
                                    {accounts.map((acc) => (
                                        <SelectItem key={acc.id} value={acc.id}>
                                            {acc.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={categoryFilter}
                                onValueChange={(v) => {
                                    setCategoryFilter(v);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Semua Kategori</SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.icon} {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Transaction List */}
            <Card className="border-border/50 shadow-sm">
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {paginated.map((txn) => (
                            <div
                                key={txn.id}
                                className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                                        style={{ backgroundColor: `${txn.category?.color}15` }}
                                    >
                                        {txn.category?.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{txn.note}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>
                                                {format(txn.occurredAt, "dd MMM yyyy", {
                                                    locale: localeId,
                                                })}
                                            </span>
                                            <span>•</span>
                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                                {txn.account?.name}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p
                                            className={`text-sm font-semibold ${txn.type === "INCOME"
                                                    ? "text-emerald-600 dark:text-emerald-400"
                                                    : "text-red-600 dark:text-red-400"
                                                }`}
                                        >
                                            {txn.type === "INCOME" ? "+" : "-"}
                                            {formatCurrency(txn.amount)}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                            {txn.category?.name}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() =>
                                                toast.success("Transaksi berhasil dihapus!")
                                            }
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {paginated.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <Search className="h-10 w-10 text-muted-foreground/50 mb-3" />
                            <p className="text-sm font-medium text-muted-foreground">
                                Tidak ada transaksi ditemukan
                            </p>
                            <p className="text-xs text-muted-foreground/60">
                                Coba ubah filter atau cari dengan kata kunci lain
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-border p-4">
                            <p className="text-xs text-muted-foreground">
                                Halaman {currentPage} dari {totalPages}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                >
                                    Sebelumnya
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                >
                                    Selanjutnya
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
