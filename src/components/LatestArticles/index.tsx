import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { LatestArticle } from '@/lib/definitions';
export default async function LatestArticles({
  latestArticles,
}: {
    latestArticles: LatestArticle[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex grow flex-col justify-between rounded-xl bg-white p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        { <div className="px-6 rounded-xl">
          {latestArticles.map((article, i) => {
            return (
              <div
                key={article.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {article.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {article.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  {article.status}
                </p>
              </div>
            );
          })}
        </div> }
        <div className='flex justify-between items-center'>
          <div className="flex items-center pb-2 pt-6">
            <ArrowPathIcon className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
          </div>
          <h2 className='text-gray-500 pt-6 pb-2 text-sm'>Last Articles</h2>
        </div>
        
      </div>
    </div>
  );
}
