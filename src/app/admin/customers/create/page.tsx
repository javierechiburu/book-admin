import Form from '@/components/Forms/CreateCustomerForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fetchCustomers } from '@/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/admin/customers' },
          {
            label: 'Create Customers',
            href: '/admin/customers/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}