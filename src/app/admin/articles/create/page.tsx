import Form from '@/components/CreateArticleForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fetchCustomers } from '@/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Articles', href: '/admin/articles' },
          {
            label: 'Create Article',
            href: '/admin/articles/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}