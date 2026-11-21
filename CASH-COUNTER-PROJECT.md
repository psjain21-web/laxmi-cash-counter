# Laxmi Mega Mart – Cash Counter App
Final Production Package Documentation

Sister concerns handled at this counter: **Anil Plastics** and **Anil Glass Agency**.

---

## 1. What This Is
A single-file POS & Cash Counter web application that runs on your counter PC, tablet, and owner's mobile phone. It works offline first and syncs automatically to Google Sheets whenever internet is available.

## 2. Key Features
- **Zero-Scroll Split POS Entry Screen:** Add single or multiple bills to one settlement, view skipped/pending bills automatically, apply discounts without PIN delays, and collect via **Cash**, **UPI**, **Card**, or **50/50 Split** (Cash + UPI).
- **Other Receipts (No Bill):** Record small sales, system/power failure receipts, advances, and old outstandings directly from the Entry tab.
- **Unified Register & Full Edit Support (`Bills` Tab):** Filter and search across **Bills**, **Other Receipts**, and **Expenses / Cash Drawings**, and click **Edit** on any entry to adjust amounts or payment modes with automatic Dashboard recalculation and Audit Log tracking.
- **Cash Drawings (`Cash` Tab):** Dedicated to drawer cash outflows (Store Expenses with Voucher No and Owner Cash Withdrawals).
- **Two-Stage Shift Handover & Night Close (`Close / Shift` Tab):**
  1. **Staff Shift Handover (Early Leave):** Staff counts physical cash, verifies any shortage/excess, hands cash to the owner, and transfers terminal control to the owner mid-day.
  2. **Night Day-End Close (Owner):** Final store reconciliation at night.
- **Independent Morning Opening & Monthly Bill Series (`More` Tab):** Set each morning's opening cash float independently; bill series resets cleanly at the start of every month.

## 3. Package Files Included
| File | Purpose |
|---|---|
| `cash-counter.html` | Standalone app for Counter PC (use with `Open-Cash-Counter.bat` or browser). |
| `Index.html` | Google Apps Script mobile/web version (paste into Apps Script as `Index`). |
| `Code.gs` | Google Apps Script cloud sync backend (paste into `Code.gs`). |
| `Open-Cash-Counter.bat` | One-click Windows desktop app launcher. |
| `SETUP.md` | Non-technical step-by-step setup guide for PC, Google Sheet, and Mobile. |
| `SHEET-LAYOUT.md` | Complete reference of all Google Sheet tabs and columns. |
| `CASH-COUNTER-PROJECT.md` | This overview document. |
