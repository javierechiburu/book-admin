import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { fetchLatestArticles } from "@/lib/data";

export default async function LatestArticles() {

  const latestArticles = await fetchLatestArticles();
  return (
    <div className="flex grow flex-col justify-between rounded-xl bg-white p-4">
      {/* NOTE: comment in this code when you get to this point in the course */}

      {
        <div className="px-6 rounded-xl h-full">
          {latestArticles.length > 0 ? latestArticles.map((article, i) => {
            return (
              <div
                key={article.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
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
                <p className="hidden text-sm text-gray-500 sm:block">
                  {article.year}
                </p>
                <p
                  className={`truncate text-sm font-medium md:text-base ${
                    article.status === "pending"
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
                >
                  {article.status}
                </p>
              </div>
            );
          }): <div className="flex justify-center items-center flex-col h-full">
              <Image src={'/cat_no_files.png'} alt="" width={200} height={200} />
              <span className="text-gray-800 text-[.7rem] mt-2 uppercase ">No se han creado artículos</span>
            </div>}
        </div>
      }
      <div className="flex justify-between items-center">
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
        <h2 className="text-gray-500 pt-6 pb-2 text-sm">Last Articles</h2>
      </div>
    </div>
  );
}
