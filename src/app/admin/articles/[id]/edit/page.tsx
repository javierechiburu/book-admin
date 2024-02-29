import Form from '@/components/EditArticleForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fetchArticleById, fetchCustomers } from '@/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [article, customers] = await Promise.all([
        fetchArticleById(id),
        fetchCustomers(),
      ]);
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form article={article} customers={customers} />
        </main>
    );
}