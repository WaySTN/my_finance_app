"use client";

import {
    TrendingUp,
    TrendingDown,
    DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    getTotalIncome,
    getTotalExpense,
    getCategoryBreakdown,
    getDailyTrend,
} from "@/lib/dummy-data";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend,
} from "recharts";
import { format } from "date-fns";
import { id } from "date-fns/locale";

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

function formatCompact(amount: number): string {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}jt`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}rb`;
    return amount.toString();
}

export default function ReportsPage() {
    const totalIncome = getTotalIncome();
    const totalExpense = getTotalExpense();
    const net = totalIncome - totalExpense;
    const expenseBreakdown = getCategoryBreakdown("EXPENSE");
    const incomeBreakdown = getCategoryBreakdown("INCOME");
    const trend = getDailyTrend();

    const summaryCards = [
        {
            title: "Total Pemasukan",
            value: totalIncome,
            icon: TrendingUp,
            bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30",
            iconBg: "bg-emerald-500/10",
            textColor: "text-emerald-600 dark:text-emerald-400",
        },
        {
            title: "Total Pengeluaran",
            value: totalExpense,
            icon: TrendingDown,
            bgGradient: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30",
            iconBg: "bg-red-500/10",
            textColor: "text-red-600 dark:text-red-400",
        },
        {
            title: "Selisih Bersih",
            value: net,
            icon: DollarSign,
            bgGradient: net >= 0
                ? "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30"
                : "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30",
            iconBg: net >= 0 ? "bg-blue-500/10" : "bg-orange-500/10",
            textColor: net >= 0
                ? "text-blue-600 dark:text-blue-400"
                : "text-orange-600 dark:text-orange-400",
        },
    ];

    // Monthly data for bar chart (simulate 6 months)
    const monthlyData = [
        { month: "Sep", income: 7500000, expense: 4200000 },
        { month: "Oct", income: 8200000, expense: 5100000 },
        { month: "Nov", income: 7800000, expense: 4800000 },
        { month: "Dec", income: 9100000, expense: 6200000 },
        { month: "Jan", income: 8500000, expense: 5500000 },
        { month: "Feb", income: totalIncome, expense: totalExpense },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Laporan</h1>
                    <p className="text-sm text-muted-foreground">
                        Analisis keuangan {format(new Date(), "MMMM yyyy", { locale: id })}
                    </p>
                </div>
                <Select defaultValue="2026-02">
                    <SelectTrigger className="w-[160px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2026-02">Februari 2026</SelectItem>
                        <SelectItem value="2026-01">Januari 2026</SelectItem>
                        <SelectItem value="2025-12">Desember 2025</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
                {summaryCards.map((card) => (
                    <Card
                        key={card.title}
                        className={`bg-gradient-to-br ${card.bgGradient} border-0 shadow-sm`}
                    >
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                                    <card.icon className={`h-5 w-5 ${card.textColor}`} />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">{card.title}</p>
                                    <p className={`text-xl font-bold ${card.textColor}`}>
                                        {formatCurrency(card.value)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Monthly Trend Chart */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                        Tren Pemasukan vs Pengeluaran (6 Bulan)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={monthlyData}
                                margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                                    axisLine={{ stroke: "var(--border)" }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tickFormatter={(v) => formatCompact(v)}
                                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "var(--card)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    }}
                                    formatter={(value) => [formatCurrency(Number(value))]}
                                />
                                <Legend />
                                <Bar
                                    dataKey="income"
                                    name="Pemasukan"
                                    fill="#22C55E"
                                    radius={[4, 4, 0, 0]}
                                    barSize={24}
                                />
                                <Bar
                                    dataKey="expense"
                                    name="Pengeluaran"
                                    fill="#EF4444"
                                    radius={[4, 4, 0, 0]}
                                    barSize={24}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Category Breakdown + Daily Trend */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Expense by Category */}
                <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold">
                            Pengeluaran per Kategori
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {expenseBreakdown.map((cat) => (
                                <div key={cat.categoryId}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">{cat.categoryIcon}</span>
                                            <span className="text-sm font-medium">{cat.categoryName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold">
                                                {formatCurrency(cat.total)}
                                            </span>
                                            <span className="text-xs text-muted-foreground w-10 text-right">
                                                {cat.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${cat.percentage}%`,
                                                backgroundColor: cat.categoryColor,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Income by Category */}
                <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold">
                            Pemasukan per Kategori
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {incomeBreakdown.map((cat) => (
                                <div key={cat.categoryId}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">{cat.categoryIcon}</span>
                                            <span className="text-sm font-medium">{cat.categoryName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold">
                                                {formatCurrency(cat.total)}
                                            </span>
                                            <span className="text-xs text-muted-foreground w-10 text-right">
                                                {cat.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${cat.percentage}%`,
                                                backgroundColor: cat.categoryColor,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Daily Trend Line Chart */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                        Tren Harian Bulan Ini
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={trend}
                                margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(d) => format(new Date(d), "dd")}
                                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                                    axisLine={{ stroke: "var(--border)" }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tickFormatter={(v) => formatCompact(v)}
                                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "var(--card)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "8px",
                                    }}
                                    labelFormatter={(d) => format(new Date(d), "dd MMMM yyyy", { locale: id })}
                                    formatter={(value) => [formatCurrency(Number(value))]}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    name="Pemasukan"
                                    stroke="#22C55E"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: "#22C55E" }}
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expense"
                                    name="Pengeluaran"
                                    stroke="#EF4444"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: "#EF4444" }}
                                    activeDot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
