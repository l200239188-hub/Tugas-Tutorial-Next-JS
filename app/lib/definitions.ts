// Tipe untuk Revenue (amount dijadikan string supaya bisa langsung pakai di chart)
export interface Revenue {
  id: string;
  date: string;
  amount: string; // string, sudah diformat
  month: string;
  revenue: number;
}

// Tipe untuk LatestInvoice (amount string supaya sesuai komponen)
export interface LatestInvoice {
  id: string;
  name: string;
  email: string;
  image_url?: string;
  amount: string; // string
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
  amount: number; // dari DB masih number
}

// Tipe untuk CardWrapper
export interface CardData {
  numberOfCustomers: number;
  numberOfInvoices: number;
  totalPaidInvoices: string;
  totalPendingInvoices: string;
}

// Tipe untuk Invoice Table
export interface InvoicesTable {
  id: string;
  amount: string;
  date: string;
  status: string;
  name: string;
  email: string;
  image_url?: string;
}

// Tipe untuk Invoice Form
export interface InvoiceForm {
  id: string;
  customer_id: string;
  amount: number;
  status: string;
}

// Tipe Customer
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
  total_pending: string;      // untuk UI
  total_pendingNumber: number; // untuk kalkulasi
  total_paid: string;         // untuk UI
  total_paidNumber: number;   // untuk kalkulasi
}

