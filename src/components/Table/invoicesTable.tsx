import Image from 'next/image';
import { UpdateArticle } from '@/components/Buttons';
import { DeleteArticle } from '@/components/DeleteButtons';
import ArticlesStatus from '@/components/Status';
import { formatDateToLocal } from '@/lib/utils';
import { fetchFilteredArticles } from '@/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const articles = await fetchFilteredArticles(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-white p-2 md:pt-0">
          <div className="md:hidden">
            {articles?.map((article) => (
              <div
                key={article.id}
                className="mb-2 w-full rounded-md text-gray-800 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{article.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{article.email}</p>
                  </div>
                  <ArticlesStatus status={article.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {"formatCurrency(article.amount)"}
                    </p>
                    <p>{formatDateToLocal(article.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateArticle id={article.id} />
                    <DeleteArticle id={article.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-800 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Article
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {articles?.map((article) => (
                <tr
                  key={article.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{article.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {article.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(article.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ArticlesStatus status={article.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateArticle id={article.id} />
                      <DeleteArticle id={article.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
