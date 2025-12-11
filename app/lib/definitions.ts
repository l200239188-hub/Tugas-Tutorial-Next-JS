// =====================
// Revenue
// =====================
// Data chart bisa langsung pakai number, format dilakukan di komponen
export interface Revenue {
  id: string;
  date: string;
  amount: number;  // number, belum diformat
  month: string;
  revenue: number;
}

// =====================
// LatestInvoice
// =====================
// amount tetap number, nanti diformat di komponen
export interface LatestInvoice {
  id: string;
  name: string;
  email: string;
  image_url?: string;
  amount: number; // number, bukan string
}

export type RevenueChartItem = {
  month: string;
  revenue: number;
};

// Tipe mentah dari DB untuk LatestInvoice
export interface LatestInvoiceRaw {
  id: string;
  name: string;
  email: string;
  image_url?: string;
  amount: number;
}

// =====================
// Card Data
// =====================
export interface CardData {
  numberOfCustomers: number;
  numberOfInvoices: number;
  totalPaidInvoices: number;   // number, format di komponen
  totalPendingInvoices: number; // number, format di komponen
}

// =====================
// Invoices Table
// =====================
export interface InvoicesTable {
  id: string;
  amount: number;  // number
  date: string;
  status: string;
  name: string;
  email: string;
  image_url?: string;
}

// =====================
// Invoice Form
// =====================
export interface InvoiceForm {
  id: string;
  customer_id: string;
  amount: number;
  status: string;
}

// =====================
// Customers
// =====================
export interface CustomerField {
  id: string;
  name: string;
}

export interface CustomersTableType {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pendingNumber: number; // untuk kalkulasi
  total_pending: string;       // untuk UI
  total_paidNumber: number;    // untuk kalkulasi
  total_paid: string;          // untuk UI
}
