# PRD — MyFinance (Web App Pencatatan Keuangan Pribadi)

## 1) Ringkasan Produk

**Nama:** MyFinance
**Platform:** Web (Responsive, mobile-first)
**Tujuan:** Membantu pengguna mencatat pemasukan/pengeluaran harian, mengelompokkan kategori, dan melihat ringkasan keuangan (harian/mingguan/bulanan) secara cepat dan jelas.

**Masalah yang diselesaikan**

* Pengguna sering lupa kemana uang keluar
* Sulit rekap total pengeluaran per kategori
* Tidak ada gambaran cashflow bulanan dan kebiasaan belanja

**Solusi**

* Input transaksi super cepat
* Kategori & akun/wallet
* Dashboard ringkasan + grafik + laporan
* Budgeting sederhana + peringatan (opsional)

---

## 2) Target Pengguna & Persona

1. **Mahasiswa / pekerja muda**

   * butuh catat pengeluaran harian, sederhana, cepat
2. **Pengguna yang mulai budgeting**

   * butuh limit per kategori/bulan dan pantauan

---

## 3) Goals & KPI

**Goals (MVP)**

* Pencatatan transaksi lancar & cepat
* Rekap bulanan jelas (total income/expense, saldo)
* Laporan kategori dan tren

**KPI awal**

* Time to add transaction: < 15 detik
* Retensi 7 hari: meningkat (indikator: pengguna input transaksi > 3 hari/minggu)
* Pengguna melihat dashboard minimal 1x per hari (opsional tracking)

---

## 4) Ruang Lingkup Fitur

### 4.1 MVP (Wajib)

1. **Auth** (Daftar, login, logout)
2. **Akun/Wallet** (mis. Cash, BCA, E-wallet)
3. **Kategori** (Makan, Transport, dll) + ikon/warna
4. **Transaksi**

   * pemasukan / pengeluaran
   * nominal (IDR), tanggal, catatan
   * pilih akun + kategori
5. **Dashboard**

   * total pemasukan, pengeluaran, saldo periode
   * grafik ringkas (mis. pengeluaran per kategori, tren harian)
6. **Riwayat transaksi**

   * filter (tanggal, akun, kategori, tipe)
   * search by catatan
7. **Laporan bulanan**

   * ringkasan + pie/bar kategori

### 4.2 Nice-to-have (Setelah MVP)

* **Budget per kategori** + notifikasi saat hampir habis
* **Recurring transaksi** (bulanan: kos, internet)
* **Export/Import CSV**
* **Tags** untuk transaksi
* **Lampiran foto struk**
* **Goals tabungan**
* **Multi-currency** (later)

---

## 5) User Flow Utama

1. **Onboarding**

   * Sign up → buat akun/wallet default (Cash) → kategori default
2. **Tambah Transaksi**

   * tombol “+” → pilih tipe → input nominal → kategori → akun → simpan
3. **Cek Ringkasan**

   * dashboard → filter periode → lihat grafik & total
4. **Cari transaksi**

   * halaman transaksi → filter → edit/hapus

---

# 6) UI/UX Spec

## 6.1 Gaya Visual (Color Palette)

Kamu sebelumnya suka nuansa **Modern Pastel**; kita bikin versi “finance-friendly” yang tetap calm tapi tegas.

**Light Mode**

* **Primary (Brand):** #3B82F6 (blue)
* **Primary Soft:** #DBEAFE
* **Success:** #22C55E
* **Danger:** #EF4444
* **Warning:** #F59E0B
* **Background:** #F8FAFC
* **Surface/Card:** #FFFFFF
* **Text Primary:** #0F172A
* **Text Muted:** #64748B
* **Border:** #E2E8F0

**Dark Mode**

* **Background:** #0B1220
* **Surface:** #0F172A
* **Text Primary:** #E2E8F0
* **Text Muted:** #94A3B8
* **Border:** #1E293B
* Primary tetap #3B82F6 (lebih kontras)

> Catatan: warna kategori bisa dibuat “pastel chips” (mis. cyan/rose/lime/violet soft) biar gampang dibedakan.

## 6.2 Typography & Layout

* Font: **Inter** (atau system default)
* Layout: **Mobile-first**, max-width dashboard: 1200px
* Spacing: 8px grid (Tailwind default cocok)

## 6.3 Komponen UI (Tailwind + shadcn/ui)

* Navbar/Sidebar responsive
* Card, Badge, Tabs, Dropdown, Dialog, Toast
* Form input: CurrencyInput, DatePicker, Select kategori, Select akun
* Table transaksi + pagination
* Chart (Recharts)

## 6.4 Halaman (IA)

* `/` Landing (opsional)
* `/auth/login`, `/auth/register`
* `/app/dashboard`
* `/app/transactions`
* `/app/accounts`
* `/app/categories`
* `/app/reports`
* `/app/settings`

---

# 7) Tech Stack (Disepakati)

## Frontend

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui** (komponen siap pakai, konsisten)
* **React Hook Form + Zod** (validasi form)
* **Recharts** (grafik)
* State: simple (React state) + server actions; kalau perlu cache list bisa pakai **TanStack Query** (opsional)

## Backend (di dalam Next.js)

* **Route Handlers / Server Actions** (monolith Next fullstack)
* Validasi request: **Zod**
* Auth: **Auth.js (NextAuth) + Prisma Adapter** (atau custom auth jika mau lebih simpel)

## Database

* **PostgreSQL**
* ORM: **Prisma**
* Migration: Prisma migrate

## Deployment

* App: Vercel / Node server
* DB: **Neon** atau **Supabase Postgres**
* Storage (kalau pakai struk): S3 compatible (Cloudflare R2 / Supabase storage)

---

# 8) Arsitektur Sistem

## 8.1 High-level Architecture (Monolith Fullstack Next.js)

**Client (Browser)**
→ Next.js pages/components
→ (Server Actions / API Route Handlers)
→ Service Layer
→ Prisma (Repository)
→ PostgreSQL

**Kenapa monolith?**

* Cepat develop, cocok buat portofolio/tugas
* Satu repo, deployment gampang
* Tetap bisa di-split jadi service nanti

## 8.2 Arsitektur Frontend (FE)

**Prinsip**

* UI components reusable
* Form & validation konsisten
* Data fetching dominan server-side (biar aman & cepat)

**Folder structure yang rapi (rekomendasi)**

* `app/(public)/` landing/auth
* `app/(protected)/app/` semua halaman login-required
* `app/api/` route handlers
* `components/` komponen UI reusable
* `features/` modul per domain (transactions, accounts, categories)
* `lib/` prisma, auth, utils
* `styles/` tailwind, tokens

**State/Data**

* List transaksi: server rendered + filter query params
* Create/edit: server action (lebih aman) + toast status

## 8.3 Arsitektur Backend (BE)

**Layering**

1. **Route Handlers / Server Actions**
2. **Validation (Zod)**
3. **Service Layer**: aturan bisnis (budget check, saldo)
4. **Repository**: Prisma query
5. **DB**: PostgreSQL

**Keamanan**

* Semua query harus scoped by `userId`
* Rate-limit endpoint auth
* Sanitasi input dan error handling konsisten

---

# 9) Desain Database (PostgreSQL + Prisma)

## 9.1 Entity Utama

1. **User**

* id (uuid)
* name, email (unique)
* passwordHash (kalau credentials)
* createdAt, updatedAt

2. **Account (Wallet)**

* id, userId (FK)
* name (Cash/BCA/DANA)
* type (CASH/BANK/EWALLET)
* initialBalance (BigInt)
* createdAt

3. **Category**

* id, userId (FK)
* name
* type (INCOME/EXPENSE)
* icon (string)
* color (string)
* createdAt

4. **Transaction**

* id, userId (FK)
* accountId (FK)
* categoryId (FK)
* type (INCOME/EXPENSE)
* amount (BigInt) **(simpan dalam rupiah tanpa desimal)**
* occurredAt (timestamp)
* note (text)
* createdAt, updatedAt

**Indexing penting**

* `(userId, occurredAt desc)` untuk list transaksi cepat
* `(userId, categoryId, occurredAt)` untuk laporan kategori
* `(userId, accountId, occurredAt)` untuk saldo akun

## 9.2 Opsional (fase 2)

* **Budget**: userId, categoryId, month, limitAmount
* **RecurringTransaction**: rule, nextRunAt
* **Tag** + pivot `TransactionTag`
* **Attachment**: transactionId, url, mimeType

---

# 10) API/Server Actions Spec (Contoh Kontrak)

## Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* (atau Auth.js default routes)

## Accounts

* `GET /api/accounts`
* `POST /api/accounts`
* `PATCH /api/accounts/:id`
* `DELETE /api/accounts/:id`

## Categories

* `GET /api/categories?type=EXPENSE`
* `POST /api/categories`
* `PATCH /api/categories/:id`
* `DELETE /api/categories/:id`

## Transactions

* `GET /api/transactions?from=...&to=...&accountId=...&categoryId=...&q=...`
* `POST /api/transactions`
* `PATCH /api/transactions/:id`
* `DELETE /api/transactions/:id`

## Reports

* `GET /api/reports/summary?month=2026-02`
* `GET /api/reports/by-category?month=2026-02&type=EXPENSE`
* `GET /api/reports/trend?from=...&to=...`

---

# 11) Aturan Bisnis (Business Rules)

* Nominal harus > 0
* Transaksi wajib punya account & category
* Category tipe harus cocok dengan transaction type
* Semua data selalu milik user (multi-tenant by userId)
* Timezone default: **Asia/Jakarta** untuk tampilan tanggal

---

# 12) Non-Functional Requirements

**Performance**

* List transaksi paginated (cursor/limit)
* Laporan pakai query agregasi + index

**Security**

* Password hash: bcrypt/argon2
* CSRF protection (Auth.js sudah mengatur untuk banyak kasus)
* Input validation Zod
* Log error (Sentry opsional)

**Reliability**

* Backup DB (Neon/Supabase biasanya ada)
* Migration terkontrol

**Accessibility**

* Kontras warna cukup
* Navigasi keyboard untuk form

---

# 13) Testing & Quality

* Unit test: business logic service
* Integration test: route handlers (opsional)
* E2E: Playwright (opsional tapi bagus untuk porto)
* Lint: ESLint + TypeScript strict

---

# 14) Deployment Plan

**Option A (Simple, recommended)**

* Deploy Next.js → Vercel
* DB Postgres → Neon
* Env vars:

  * `DATABASE_URL`
  * `AUTH_SECRET`
  * `NEXTAUTH_URL` (kalau Auth.js)

**CI/CD minimal**

* push → build & lint → deploy

---

# 15) Roadmap Eksekusi (Sprint Plan)

**Sprint 1 (MVP Core)**

* Setup Next.js TS Tailwind shadcn
* Setup Postgres + Prisma schema
* Auth (register/login)
* CRUD Accounts + Categories

**Sprint 2 (Transactions)**

* CRUD Transactions
* Filter & search
* Dashboard ringkasan basic

**Sprint 3 (Reports & Polishing)**

* Reports by category + trend chart
* UX polish (toast, empty states, skeleton)
* Export CSV (opsional)

**Sprint 4 (Nice-to-have)**

* Budgeting / recurring / attachments (pilih 1-2)

---

## 16) Definition of Done (DoD)

* Semua halaman utama responsif mobile & desktop
* Validasi form jelas (error message)
* Query aman (scoped userId)
* Dashboard & reports sesuai data transaksi
* Tidak ada data leakage antar user
* Deploy berjalan (link live) + README

---

Kalau kamu mau, aku bisa lanjutkan **2 output praktis** biar kamu langsung gas development:

1. **ERD + Prisma Schema** (siap copy-paste)
2. **Struktur folder Next.js + daftar komponen UI** (plus wireframe ringkas per halaman)

Kamu mau fokus MVP yang **super simpel** dulu (tanpa budget/recurring), atau langsung include **budget bulanan** sekalian?
