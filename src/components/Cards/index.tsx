import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon
  } from '@heroicons/react/24/outline';
  import { montserrat } from '@/ui/fonts';
  
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
    type: 'invoices' | 'customers' | 'pending' | 'collected';
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
      <div className="rounded-xl bg-white p-2 shadow-sm flex flex-col justify-between">
        <div className="flex p-4">
          <BanknotesIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-gray-500 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`${montserrat.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          $ {value}
        </p>
        <div className='flex justify-between p-2'>
          <p className='font-semibold'>**** **** **** 4343</p>
          <span>PAYPAL</span>
        </div>
        
      </div>
    );
  }
  