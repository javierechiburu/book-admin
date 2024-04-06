import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import Table from '@/components/Table/invoicesTable';
import { CreateArticle } from '@/components/Buttons';
import { InvoicesTableSkeleton } from '@/ui/skeletons';
import { Suspense } from 'react';
import { fetchArticlesPages } from '@/lib/data';

 
export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchArticlesPages(query);
    return (
        <div className="w-full">
        <div className="flex items-center justify-between gap-2">
            <Search placeholder="Search articles..." />
            <CreateArticle />
        </div>
        {  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
            <Table query={query} currentPage={currentPage} />
        </Suspense> }
        <div className="mt-5 flex w-full justify-center">
            { <Pagination totalPages={totalPages} /> }
        </div>
        </div>
    );
}