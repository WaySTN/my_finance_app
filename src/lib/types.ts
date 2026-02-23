export type AccountType = "CASH" | "BANK" | "EWALLET";
export type TransactionType = "INCOME" | "EXPENSE";

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export interface Account {
    id: string;
    userId: string;
    name: string;
    type: AccountType;
    initialBalance: number;
    balance: number;
    createdAt: Date;
}

export interface Category {
    id: string;
    userId: string;
    name: string;
    type: TransactionType;
    icon: string;
    color: string;
    createdAt: Date;
}

export interface Transaction {
    id: string;
    userId: string;
    accountId: string;
    categoryId: string;
    type: TransactionType;
    amount: number;
    occurredAt: Date;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    // Joined fields for display
    account?: Account;
    category?: Category;
}

export interface DashboardSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionCount: number;
}

export interface CategoryBreakdown {
    categoryId: string;
    categoryName: string;
    categoryColor: string;
    categoryIcon: string;
    total: number;
    percentage: number;
    count: number;
}

export interface DailyTrend {
    date: string;
    income: number;
    expense: number;
}
