import { CardArticles, CardBalanced } from "@/components/Cards";
import LatestArticles from "@/components/LatestArticles";
import { CardSkeleton, LatestInvoicesSkeleton } from "@/ui/skeletons";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main>
      <h1 className={`mb-6 text-gray-800 text-xl md:text-2xl md:ml-2`}>
        Admin Dashboard
      </h1>
      <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="flex flex-col col-span-3 gap-6">
          <Suspense fallback={<CardSkeleton />}>
            <CardBalanced/>  
          </Suspense>
          
          <div className="flex  flex-col gap-6 justify-between">
            <Suspense fallback={<><CardSkeleton /><CardSkeleton /></>}>
              <CardArticles/>
            </Suspense>
            
          </div>
        </div>
        <div className="flex w-full flex-col md:col-span-5">
          <Suspense fallback={<LatestInvoicesSkeleton />}>
            {<LatestArticles />}
          </Suspense>
        </div>
      </div>

    </main>
  );
}
