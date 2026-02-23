"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { categories } from "@/lib/dummy-data";
import { toast } from "sonner";

const iconOptions = ["🍔", "🚗", "🛒", "🎮", "📄", "💊", "📚", "💰", "💻", "📈", "✨", "🏠", "👕", "🎵", "✈️", "🎂"];

export default function CategoriesPage() {
    const [activeTab, setActiveTab] = useState<string>("EXPENSE");

    const filtered = categories.filter((cat) => cat.type === activeTab);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Kategori</h1>
                    <p className="text-sm text-muted-foreground">
                        Kelola kategori pemasukan dan pengeluaran
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Kategori
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Tambah Kategori Baru</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Nama Kategori</Label>
                                <Input placeholder="Contoh: Olahraga" />
                            </div>
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
                                <Label>Ikon</Label>
                                <div className="grid grid-cols-8 gap-2">
                                    {iconOptions.map((icon) => (
                                        <button
                                            key={icon}
                                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-accent transition-colors text-lg"
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Warna</Label>
                                <div className="flex gap-2 flex-wrap">
                                    {[
                                        "#F97316", "#3B82F6", "#8B5CF6", "#EC4899",
                                        "#EF4444", "#10B981", "#06B6D4", "#22C55E",
                                        "#F59E0B", "#6366F1",
                                    ].map((color) => (
                                        <button
                                            key={color}
                                            className="h-8 w-8 rounded-full border-2 border-transparent hover:border-foreground transition-colors"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => toast.success("Kategori berhasil ditambahkan!")}
                            >
                                Simpan
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-muted/50">
                    <TabsTrigger value="EXPENSE">
                        Pengeluaran ({categories.filter((c) => c.type === "EXPENSE").length})
                    </TabsTrigger>
                    <TabsTrigger value="INCOME">
                        Pemasukan ({categories.filter((c) => c.type === "INCOME").length})
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Category Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((cat) => (
                    <Card
                        key={cat.id}
                        className="border-border/50 shadow-sm group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                                        style={{ backgroundColor: `${cat.color}15` }}
                                    >
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">{cat.name}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div
                                                className="h-2.5 w-2.5 rounded-full"
                                                style={{ backgroundColor: cat.color }}
                                            />
                                            <span className="text-xs text-muted-foreground">
                                                {cat.type === "INCOME" ? "Pemasukan" : "Pengeluaran"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <Pencil className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 hover:text-destructive"
                                        onClick={() => toast.success("Kategori berhasil dihapus!")}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
