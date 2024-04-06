import Link from 'next/link';
import {
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/Buttons';
import { createCustomers } from '@/lib/actions';

export default function Form() {
  return (
    <form action={createCustomers} >
        <div className='flex gap-2 rounded-md bg-white text-gray-800 p-4 md:p-6'>
            <div>
                {/* Customers Name */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            step="0.01"
                            placeholder="Enter your name..."
                            className="peer block w-full text-gray-800 font-semibold rounded-md border border-gray-800 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-800" />
                        </div>
                    </div>
                </div>

                {/* Customers Email */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            step="0.02"
                            placeholder="Enter your email..."
                            className="peer block w-full text-gray-800 font-semibold rounded-md border border-gray-800 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-800" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                ima
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Link
            href="/admin/articles"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors border hover:border-gray-800"
            >
            Cancel
            </Link>
            <Button type="submit">Create Article</Button>
        </div>
    </form>
  );
}
