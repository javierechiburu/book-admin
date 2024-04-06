import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  CreditCardIcon
} from "@heroicons/react/24/outline";
import { robotoMono, montserrat } from "@/ui/fonts";
import { formatCurrency } from "@/lib/utils";
import { fetchBalanceData, fetchCardData } from "@/lib/data"

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="w-full rounded-xl bg-white p-2 shadow-sm">
      <div className="flex p-4 justify-between">
        {Icon ? <Icon className="w-16 text-gray-800 m-auto" /> : null}
        <div>
          <h3 className="ml-2 text-gray-800 text-xs font-medium">{title}</h3>
          <p
            className={`${montserrat.className}
                  truncate rounded-xl bg-white p-4 text-2xl text-center`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}


export async function CardArticles() {

  const { numberOfPublishedArticles, numberOfPendingArticles } =
    await fetchCardData();

  return (
    <>
    <Card
      title="Pending Articles"
      value={numberOfPendingArticles}
      type="pending"
    />


    <Card
      title="Published Articles"
      value={numberOfPublishedArticles}
      type="invoices"
    />
    </>
  );
}

export async function CardBalanced() {

  const value = await fetchBalanceData();

  return (
    <div className="relative rounded-xl p-6 shadow-sm text-white flex flex-col justify-between bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-52 lg:h-52">
      
      <div className="flex justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.09em"
          height="1em"
          viewBox="0 0 256 83"
        >
          <defs>
            <linearGradient
              id="logosVisa0"
              x1="45.974%"
              x2="54.877%"
              y1="-2.006%"
              y2="100%"
            >
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="100%" stop-color="#FFFFFF" />
            </linearGradient>
          </defs>
          <path
            fill="url(#logosVisa0)"
            d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963zm3.037-21.601l6.265-30.027h-17.158zm-118.599 21.6L88.964 1.246h20.687l17.104 79.963zm-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963z"
            transform="matrix(1 0 0 -1 0 82.668)"
          />
        </svg>

        <CreditCardIcon className="h-6 w-6" />
        
        
      </div>
      
      <div className="flex flex-col justify-between">
          <p
            className={`${robotoMono.className}
            truncate rounded-xl pt-0 text-3xl font-semibold tracking-wider`}
          >
            {formatCurrency(value.totalDonation)}
          </p>
          <div className="flex justify-between items-center mt-2">
            <p className={`${robotoMono.className} text-xs font-semibold`}>**** **** **** 0042</p>
            <p className="uppercase text-[.5rem]">Total Donations</p>
          </div>
      </div>

      
    </div>
  );
}
