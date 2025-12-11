import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoice,
  Revenue,
  RevenueChartItem,
  CardData
} from './definitions';
import { formatCurrency } from './utils';

// =====================
// Revenue Chart
// =====================
export async function fetchRevenueChart(): Promise<RevenueChartItem[]> {
  return [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1500 },
    { month: 'Mar', revenue: 1800 },
    { month: 'Apr', revenue: 1300 },
    { month: 'May', revenue: 2000 },
  ];
}

// =====================
// Latest Invoices
// =====================
export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  return [
    { id: '1', name: 'John Doe', email: 'john@example.com', image_url: '/avatar1.jpg', amount: 1200 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', image_url: '/avatar2.jpg', amount: 2500 },
  ];
}

// =====================
// Card Data
// =====================
export async function fetchCardData(): Promise<CardData> {
  return {
    numberOfInvoices: 12,
    numberOfCustomers: 5,
    totalPaidInvoices: 12300,   // number, format nanti di komponen
    totalPendingInvoices: 1200, // number, format nanti di komponen
  };
}

// =====================
// Invoices (Filter & Paging)
// =====================
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  return [
    { 
      id: '1',
      amount: 1200, 
      date: '2025-01-01', 
      status: 'paid', 
      name: 'John Doe', 
      email: 'john@example.com', 
      image_url: '/avatar1.jpg' 
    }
  ];
}

export async function fetchInvoicesPages(query: string) {
  return 1;
}

export async function fetchInvoiceById(id: string) {
  return { id, customer_id: '1', amount: 1200, status: 'paid' };
}

// =====================
// Customers
// =====================
export async function fetchCustomers(): Promise<CustomerField[]> {
  return [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
  ];
}

export async function fetchFilteredCustomers(query: string): Promise<CustomersTableType[]> {
  return [
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      image_url: '/avatar1.jpg', 
      total_invoices: 3, 
      total_pendingNumber: 1000, 
      total_pending: '$1,000', 
      total_paidNumber: 5000, 
      total_paid: '$5,000' 
    }
  ];
}
