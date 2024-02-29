import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { montserrat } from "@/ui/fonts";

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
                  truncate rounded-xl bg-white p-4 text-2xl text-end`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CardBalanced({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="relative rounded-xl p-6 shadow-sm text-white flex flex-col justify-between bg-gradient-to-r from-cyan-500 to-blue-400 h-56 lg:h-60">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm font-normal">{title}</h3>
          <p
            className={`${montserrat.className}
            truncate rounded-xl pt-0 text-2xl font-semibold`}
          >
            USD: {value}
          </p>
        </div>
        <p className="font-semibold">*4343</p>
      </div>

      <div className="flex flex-row-reverse">
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
              <stop offset="0%" stop-color="#222357" />
              <stop offset="100%" stop-color="#254aa5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#logosVisa0)"
            d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963zm3.037-21.601l6.265-30.027h-17.158zm-118.599 21.6L88.964 1.246h20.687l17.104 79.963zm-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963z"
            transform="matrix(1 0 0 -1 0 82.668)"
          />
        </svg>
      </div>
      <svg
        className="absolute h-full w-full top-0 opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z" />
      </svg>
    </div>
  );
}
