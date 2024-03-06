import { Card, CardBalanced } from "@/components/Cards";
import LatestArticles from "@/components/LatestArticles";
import { fetchLatestArticles, fetchCardData } from "@/lib/data";

export default async function Page() {
  const latestArticles = await fetchLatestArticles();
  const { numberOfPublishedArticles, numberOfPendingArticles } =
    await fetchCardData();
  return (
    <main>
      <h1 className={`mb-6 text-gray-800 text-xl md:text-2xl md:ml-2`}>
        Admin Dashboard
      </h1>
      <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="flex flex-col col-span-3 gap-6">
          {<CardBalanced title="Avaliable Balance" value={1} />}
          <div className="flex  flex-col gap-6 justify-between">
            {
              <Card
                title="Pending Articles"
                value={numberOfPendingArticles}
                type="pending"
              />
            }
            {
              <Card
                title="Published Articles"
                value={numberOfPublishedArticles}
                type="invoices"
              />
            }
          </div>
        </div>
        <div className="flex w-full flex-col md:col-span-5">
          {<LatestArticles latestArticles={latestArticles} />}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}
