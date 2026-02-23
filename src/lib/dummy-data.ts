import { Account, Category, Transaction, DailyTrend, CategoryBreakdown } from "./types";

// ========== ACCOUNTS ==========
export const accounts: Account[] = [
    {
        id: "acc-1",
        userId: "user-1",
        name: "Cash",
        type: "CASH",
        initialBalance: 500000,
        balance: 1250000,
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "acc-2",
        userId: "user-1",
        name: "BCA",
        type: "BANK",
        initialBalance: 5000000,
        balance: 8750000,
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "acc-3",
        userId: "user-1",
        name: "DANA",
        type: "EWALLET",
        initialBalance: 200000,
        balance: 450000,
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "acc-4",
        userId: "user-1",
        name: "GoPay",
        type: "EWALLET",
        initialBalance: 100000,
        balance: 320000,
        createdAt: new Date("2026-01-15"),
    },
];

// ========== CATEGORIES ==========
export const categories: Category[] = [
    // Expense categories
    {
        id: "cat-1",
        userId: "user-1",
        name: "Makan & Minum",
        type: "EXPENSE",
        icon: "🍔",
        color: "#F97316",
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "cat-2",
        userId: "user-1",
        name: "Transport",
        type: "EXPENSE",
        icon: "🚗",
        color: "#3B82F6",
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "cat-3",
        userId: "user-1",
        name: "Belanja",
        type: "EXPENSE",
        icon: "🛒",
        color: "#8B5CF6",
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "cat-4",
        userId: "user-1",
        name: "Hiburan",
        type: "EXPENSE",
        icon: "🎮",
        color: "#EC4899",
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "cat-5",
        userId: "user-1",
        name: "Tagihan",
        type: "EXPENSE",
        icon: "📄",
        color: "#EF4444",
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "cat-6",
        userId: "user-1",
        name: "Kesehatan",
        type: "EXPENSE",
        icon: "💊",
        color: "#10B981",
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "cat-7",
        userId: "user-1",
        name: "Pendidikan",
        type: "EXPENSE",
        icon: "📚",
        color: "#06B6D4",
        createdAt: new Date("2026-01-01"),
    },
    // Income categories
    {
        id: "cat-8",
        userId: "user-1",
        name: "Gaji",
        type: "INCOME",
        icon: "💰",
        color: "#22C55E",
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "cat-9",
        userId: "user-1",
        name: "Freelance",
        type: "INCOME",
        icon: "💻",
        color: "#3B82F6",
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "cat-10",
        userId: "user-1",
        name: "Investasi",
        type: "INCOME",
        icon: "📈",
        color: "#F59E0B",
        createdAt: new Date("2026-01-01"),
    },
    {
        id: "cat-11",
        userId: "user-1",
        name: "Lainnya",
        type: "INCOME",
        icon: "✨",
        color: "#6366F1",
        createdAt: new Date("2026-01-01"),
    },
];

// ========== TRANSACTIONS ==========
function makeTransaction(
    id: string,
    accountId: string,
    categoryId: string,
    type: "INCOME" | "EXPENSE",
    amount: number,
    occurredAt: string,
    note: string
): Transaction {
    return {
        id,
        userId: "user-1",
        accountId,
        categoryId,
        type,
        amount,
        occurredAt: new Date(occurredAt),
        note,
        createdAt: new Date(occurredAt),
        updatedAt: new Date(occurredAt),
        account: accounts.find((a) => a.id === accountId),
        category: categories.find((c) => c.id === categoryId),
    };
}

export const transactions: Transaction[] = [
    makeTransaction("txn-1", "acc-2", "cat-8", "INCOME", 8500000, "2026-02-01", "Gaji Februari"),
    makeTransaction("txn-2", "acc-1", "cat-1", "EXPENSE", 35000, "2026-02-02", "Nasi Padang siang"),
    makeTransaction("txn-3", "acc-3", "cat-2", "EXPENSE", 15000, "2026-02-02", "Grab ke kampus"),
    makeTransaction("txn-4", "acc-1", "cat-1", "EXPENSE", 28000, "2026-02-03", "Ayam Geprek malam"),
    makeTransaction("txn-5", "acc-2", "cat-5", "EXPENSE", 150000, "2026-02-03", "Listrik bulanan"),
    makeTransaction("txn-6", "acc-2", "cat-5", "EXPENSE", 99000, "2026-02-03", "Internet IndiHome"),
    makeTransaction("txn-7", "acc-1", "cat-4", "EXPENSE", 50000, "2026-02-04", "Nonton bioskop"),
    makeTransaction("txn-8", "acc-3", "cat-1", "EXPENSE", 42000, "2026-02-05", "Coffee shop"),
    makeTransaction("txn-9", "acc-1", "cat-3", "EXPENSE", 185000, "2026-02-06", "Beli kaos baru"),
    makeTransaction("txn-10", "acc-2", "cat-9", "INCOME", 1500000, "2026-02-07", "Proyek website klien"),
    makeTransaction("txn-11", "acc-1", "cat-1", "EXPENSE", 25000, "2026-02-07", "Mie Ayam siang"),
    makeTransaction("txn-12", "acc-4", "cat-2", "EXPENSE", 22000, "2026-02-08", "Gojek pulang"),
    makeTransaction("txn-13", "acc-1", "cat-6", "EXPENSE", 75000, "2026-02-09", "Obat flu"),
    makeTransaction("txn-14", "acc-2", "cat-7", "EXPENSE", 350000, "2026-02-10", "Buku kuliah"),
    makeTransaction("txn-15", "acc-1", "cat-1", "EXPENSE", 30000, "2026-02-10", "Bakso malam"),
    makeTransaction("txn-16", "acc-3", "cat-4", "EXPENSE", 65000, "2026-02-11", "Top up game"),
    makeTransaction("txn-17", "acc-1", "cat-1", "EXPENSE", 40000, "2026-02-12", "Sushi take away"),
    makeTransaction("txn-18", "acc-2", "cat-3", "EXPENSE", 275000, "2026-02-13", "Sepatu olahraga"),
    makeTransaction("txn-19", "acc-2", "cat-10", "INCOME", 200000, "2026-02-14", "Dividen saham"),
    makeTransaction("txn-20", "acc-1", "cat-2", "EXPENSE", 18000, "2026-02-14", "Angkot kampus"),
    makeTransaction("txn-21", "acc-1", "cat-1", "EXPENSE", 32000, "2026-02-15", "Warteg siang"),
    makeTransaction("txn-22", "acc-4", "cat-1", "EXPENSE", 55000, "2026-02-16", "Pizza delivery"),
    makeTransaction("txn-23", "acc-2", "cat-5", "EXPENSE", 50000, "2026-02-17", "Pulsa HP"),
    makeTransaction("txn-24", "acc-1", "cat-4", "EXPENSE", 80000, "2026-02-18", "Karaoke bareng"),
    makeTransaction("txn-25", "acc-2", "cat-9", "INCOME", 750000, "2026-02-19", "Desain logo"),
    makeTransaction("txn-26", "acc-3", "cat-2", "EXPENSE", 20000, "2026-02-19", "Maxim ke mall"),
    makeTransaction("txn-27", "acc-1", "cat-1", "EXPENSE", 45000, "2026-02-20", "Steak malam"),
    makeTransaction("txn-28", "acc-1", "cat-3", "EXPENSE", 120000, "2026-02-21", "Skincare"),
    makeTransaction("txn-29", "acc-2", "cat-6", "EXPENSE", 150000, "2026-02-22", "Check-up dokter"),
    makeTransaction("txn-30", "acc-1", "cat-1", "EXPENSE", 22000, "2026-02-23", "Nasi goreng pagi"),
    makeTransaction("txn-31", "acc-2", "cat-11", "INCOME", 100000, "2026-02-23", "Transfer dari teman"),
    makeTransaction("txn-32", "acc-4", "cat-2", "EXPENSE", 25000, "2026-02-23", "Grab ke kantor"),
];

// ========== HELPERS ==========
export function getTotalIncome(): number {
    return transactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpense(): number {
    return transactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(): number {
    return getTotalIncome() - getTotalExpense();
}

export function getCategoryBreakdown(type: "INCOME" | "EXPENSE"): CategoryBreakdown[] {
    const filtered = transactions.filter((t) => t.type === type);
    const total = filtered.reduce((sum, t) => sum + t.amount, 0);
    const grouped: Record<string, { amount: number; count: number }> = {};

    filtered.forEach((t) => {
        if (!grouped[t.categoryId]) {
            grouped[t.categoryId] = { amount: 0, count: 0 };
        }
        grouped[t.categoryId].amount += t.amount;
        grouped[t.categoryId].count += 1;
    });

    return Object.entries(grouped)
        .map(([catId, data]) => {
            const cat = categories.find((c) => c.id === catId)!;
            return {
                categoryId: catId,
                categoryName: cat.name,
                categoryColor: cat.color,
                categoryIcon: cat.icon,
                total: data.amount,
                percentage: Math.round((data.amount / total) * 100),
                count: data.count,
            };
        })
        .sort((a, b) => b.total - a.total);
}

export function getDailyTrend(): DailyTrend[] {
    const dayMap: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((t) => {
        const dateKey = t.occurredAt.toISOString().split("T")[0];
        if (!dayMap[dateKey]) {
            dayMap[dateKey] = { income: 0, expense: 0 };
        }
        if (t.type === "INCOME") {
            dayMap[dateKey].income += t.amount;
        } else {
            dayMap[dateKey].expense += t.amount;
        }
    });

    return Object.entries(dayMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, data]) => ({
            date,
            income: data.income,
            expense: data.expense,
        }));
}

export function getRecentTransactions(limit = 5): Transaction[] {
    return [...transactions]
        .sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime())
        .slice(0, limit);
}
