import Search from '@/components/Search';
import Table from '@/components/Table/customersTable';
import { CreateCustomer } from '@/components/Buttons';
import { InvoicesTableSkeleton } from '@/ui/skeletons';
import { Suspense } from 'react';

 
export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
    };
  }) {
    const query = searchParams?.query || '';
    return (
        <div className="w-full">
        <div className="flex items-center justify-between gap-2">
            <Search placeholder="Search customers..." />
            <CreateCustomer />
        </div>
        {  <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
            <Table query={query}/>
        </Suspense> }
        </div>
    );
}