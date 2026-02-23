"use client";

import {
    TrendingUp,
    TrendingDown,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    getTotalIncome,
    getTotalExpense,
    getBalance,
    getCategoryBreakdown,
    getDailyTrend,
    getRecentTransactions,
    transactions,
} from "@/lib/dummy-data";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { format } from "date-fns";
import { id } from "date-fns/locale";

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatCompact(amount: number): string {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}jt`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}rb`;
    return amount.toString();
}

export default function DashboardPage() {
    const totalIncome = getTotalIncome();
    const totalExpense = getTotalExpense();
    const balance = getBalance();
    const categoryBreakdown = getCategoryBreakdown("EXPENSE");
    const dailyTrend = getDailyTrend();
    const recentTxns = getRecentTransactions(6);

    const summaryCards = [
        {
            title: "Total Pemasukan",
            value: totalIncome,
            icon: TrendingUp,
            trend: "+12.5%",
            trendUp: true,
            gradient: "from-emerald-500 to-green-600",
            bgGradient: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30",
            iconBg: "bg-emerald-500/10",
            textColor: "text-emerald-600 dark:text-emerald-400",
        },
        {
            title: "Total Pengeluaran",
            value: totalExpense,
            icon: TrendingDown,
            trend: "-3.2%",
            trendUp: false,
            gradient: "from-red-500 to-rose-600",
            bgGradient: "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30",
            iconBg: "bg-red-500/10",
            textColor: "text-red-600 dark:text-red-400",
        },
        {
            title: "Saldo",
            value: balance,
            icon: Wallet,
            trend: "+8.1%",
            trendUp: true,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
            iconBg: "bg-blue-500/10",
            textColor: "text-blue-600 dark:text-blue-400",
        },
        {
            title: "Total Transaksi",
            value: transactions.length,
            icon: MoreHorizontal,
            trend: "+5",
            trendUp: true,
            gradient: "from-violet-500 to-purple-600",
            bgGradient: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
            iconBg: "bg-violet-500/10",
            textColor: "text-violet-600 dark:text-violet-400",
            isCount: true,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Ringkasan keuangan bulan {format(new Date(), "MMMM yyyy", { locale: id })}
                    </p>
                </div>
                <Tabs defaultValue="month">
                    <TabsList className="bg-muted/50">
                        <TabsTrigger value="week" className="text-xs">Minggu Ini</TabsTrigger>
                        <TabsTrigger value="month" className="text-xs">Bulan Ini</TabsTrigger>
                        <TabsTrigger value="year" className="text-xs">Tahun Ini</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {summaryCards.map((card) => (
                    <Card
                        key={card.title}
                        className={`${card.bgGradient} border-0 shadow-sm overflow-hidden relative`}
                    >
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </p>
                                    <p className="text-2xl font-bold tracking-tight">
                                        {card.isCount ? card.value : formatCurrency(card.value as number)}
                                    </p>
                                    <div className="flex items-center gap-1">
                                        {card.trendUp ? (
                                            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                                        ) : (
                                            <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                                        )}
                                        <span
                                            className={`text-xs font-medium ${card.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                                                }`}
                                        >
                                            {card.trend} dari bulan lalu
                                        </span>
                                    </div>
                                </div>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                                    <card.icon className={`h-5 w-5 ${card.textColor}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-5">
                {/* Trend Chart */}
                <Card className="lg:col-span-3 border-border/50 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold">
                            Tren Pemasukan vs Pengeluaran
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={dailyTrend}
                                    margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
                                >
                                    <defs>
                                        <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(d) => format(new Date(d), "dd MMM", { locale: id })}
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
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        }}
                                        labelFormatter={(d) => format(new Date(d), "dd MMMM yyyy", { locale: id })}
                                        formatter={(value) => [formatCurrency(Number(value))]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#22C55E"
                                        strokeWidth={2}
                                        fill="url(#incomeGrad)"
                                        name="Pemasukan"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="expense"
                                        stroke="#EF4444"
                                        strokeWidth={2}
                                        fill="url(#expenseGrad)"
                                        name="Pengeluaran"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Category Breakdown */}
                <Card className="lg:col-span-2 border-border/50 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold">
                            Pengeluaran per Kategori
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        dataKey="total"
                                        nameKey="categoryName"
                                        paddingAngle={3}
                                    >
                                        {categoryBreakdown.map((entry) => (
                                            <Cell key={entry.categoryId} fill={entry.categoryColor} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            background: "var(--card)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "8px",
                                        }}
                                        formatter={(value) => [formatCurrency(Number(value))]}
                                    />
                                    <Legend
                                        iconSize={8}
                                        wrapperStyle={{ fontSize: "11px" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Category list */}
                        <div className="mt-4 space-y-2.5">
                            {categoryBreakdown.slice(0, 4).map((cat) => (
                                <div key={cat.categoryId} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: cat.categoryColor }}
                                        />
                                        <span className="text-sm text-muted-foreground">
                                            {cat.categoryIcon} {cat.categoryName}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-medium">
                                            {formatCurrency(cat.total)}
                                        </span>
                                        <span className="ml-1.5 text-xs text-muted-foreground">
                                            ({cat.percentage}%)
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">
                            Transaksi Terbaru
                        </CardTitle>
                        <a
                            href="/app/transactions"
                            className="text-xs text-blue-500 hover:text-blue-600 hover:underline font-medium"
                        >
                            Lihat semua →
                        </a>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recentTxns.map((txn) => (
                            <div
                                key={txn.id}
                                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                                        style={{
                                            backgroundColor: `${txn.category?.color}15`,
                                        }}
                                    >
                                        {txn.category?.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{txn.note}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>
                                                {format(txn.occurredAt, "dd MMM yyyy", { locale: id })}
                                            </span>
                                            <span>•</span>
                                            <span>{txn.account?.name}</span>
                                        </div>
                                    </div>
                                </div>
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
                                    <Badge
                                        variant="outline"
                                        className={`text-[10px] px-1.5 py-0 ${txn.type === "INCOME"
                                            ? "border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400"
                                            : "border-red-200 text-red-600 dark:border-red-800 dark:text-red-400"
                                            }`}
                                    >
                                        {txn.category?.name}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
