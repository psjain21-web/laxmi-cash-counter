# Google Sheet Tab & Column Reference

Running `setup()` in Apps Script automatically creates all required tabs with formatted headers. Do not rename columns or edit `_u` and `json` columns manually.

| Tab Name | Columns | Purpose |
|---|---|---|
| **Invoices** | `id`, `no`, `date`, `cust`, `amt`, `_u`, `json` | Every billed invoice settled or partially credited at the counter. |
| **Payments** | `id`, `date`, `no`, `mode`, `amt`, `_u`, `json` | Payment settlements per bill and mode (`Cash`, `UPI`, `Card`). |
| **Discounts** | `id`, `date`, `no`, `amt`, `by`, `_u`, `json` | Discounts granted per bill. |
| **NoBillReceipts** | `id`, `date`, `cust`, `purpose`, `mode`, `amt`, `_u`, `json` | Receipts collected without an invoice (`Small sale`, `Advance`, etc.). |
| **CashMovements** | `id`, `date`, `type`, `vno`, `party`, `reason`, `amt`, `_u`, `json` | Drawer cash outflows (`expense`, `withdrawal`, and shift handovers). |
| **ShiftHandover** | `id`, `date`, `time`, `expected`, `counted`, `diff`, `handed`, `remainingForOwner`, `remark`, `_u`, `json` | Mid-day physical cash tally when staff leaves early and hands over to owner. |
| **DayClosing** | `id`, `opening`, `expected`, `counted`, `diff`, `handed`, `next`, `remark`, `_u`, `json` | Night-end final store closing reconciliation. |
| **Openings** | `id`, `opening`, `_u`, `json` | Independent morning opening cash float per date (`yyyy-mm-dd`). |
| **AuditLog** | `id`, `ts`, `by`, `a`, `d`, `_u`, `json` | Complete audit trail of all edits to bills, receipts, and cash drawings. |
| **BankReceipts** | `date`, `customer`, `amount`, `invoice no`, `remark` | Manual tab for the accountant to enter direct bank transfers. |
