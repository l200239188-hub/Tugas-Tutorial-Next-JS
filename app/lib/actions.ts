'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ===========================
// Schema Validasi Form
// ===========================
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

// Untuk create, id dan date otomatis
const CreateInvoiceSchema = FormSchema.omit({ id: true, date: true });

// Untuk update, date otomatis
const UpdateInvoiceSchema = FormSchema.omit({ id: true, date: true });

// ===========================
// Create Invoice
// ===========================
export async function createInvoice(formData: FormData) {
  try {
    const { customerId, amount, status } = CreateInvoiceSchema.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    // Revalidasi path supaya ISR atau cache di-refresh
    revalidatePath('/dashboard/invoices');

    // Redirect setelah sukses
    redirect('/dashboard/invoices');
  } catch (err) {
    console.error('Failed to create invoice:', err);
    throw new Error('Failed to create invoice'); // akan ditangkap error.tsx
  }
}

// ===========================
// Update Invoice
// ===========================
export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = UpdateInvoiceSchema.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (err) {
    console.error('Failed to update invoice:', err);
    throw new Error('Failed to update invoice');
  }
}

// ===========================
// Delete Invoice
// ===========================
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (err) {
    console.error('Failed to delete invoice:', err);
    throw new Error('Failed to delete invoice');
  }
}
