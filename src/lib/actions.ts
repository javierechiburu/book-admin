'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  title: z.coerce.string(),
  content: z.coerce.string(),
  year: z.coerce.number(),
  status: z.enum(['pending', 'active']),
  date: z.string(),
});

const FormDonationSchema = z.object({
  id: z.string(),
  status: z.coerce.number(),
  date: z.string(),
  flowOrder: z.string()
});
 
const UpdateDonation = FormDonationSchema.omit({ id: true, date: true });
const CreateArticle = FormSchema.omit({ id: true, date: true });
const UpdateArticle = FormSchema.omit({ id: true, date: true });
 
export async function createArticles(formData: FormData) {
  const { customerId, title, content, year, status } = CreateArticle.parse({
    customerId: formData.get('customerId'),
    title: formData.get('title'),
    content: formData.get('content'),
    year: formData.get('year'),
    status: formData.get('status'),
  });
  const date = new Date().toISOString().split('T')[0];

  await sql`
      INSERT INTO articles (customer_id, title, content, year, status, date)
      VALUES (${customerId}, ${title}, ${content}, ${year}, ${status}, ${date})
  `;

  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}

export async function updateDonation(key : String) {
  try {
      const { flowOrder } = UpdateDonation.parse({
          flowOrder: key
      });
      await sql`UPDATE donations SET status = 12 WHERE flowOrder = ${flowOrder}`;
      return true;
    } catch (error) {
      return error
      //console.error('Database Error:', error);
      //throw new Error('Failed to fetch donations.');
    }
}
 
export async function updateArticle(id: string, formData: FormData) {
  const { customerId, title, content, year, status } = UpdateArticle.parse({
    customerId: formData.get('customerId'),
    title: formData.get('title'),
    content: formData.get('content'),
    year: formData.get('year'),
    status: formData.get('status'),
  });
 
  await sql`
    UPDATE articles
    SET customer_id = ${customerId}, title = ${title}, content = ${content}, year = ${year}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}

export async function deleteArticle(id: string) {
  await sql`DELETE FROM articles WHERE id = ${id}`;
  revalidatePath('/admin/articles');
}