'use client';

import { CustomerField, ArticleForm } from '@/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/components/Buttons';
import { updateArticle } from '@/lib/actions';

export default function EditInvoiceForm({
    article,
    customers,
}: {
    article: ArticleForm;
    customers: CustomerField[];
}) {
    const updateArticleWithId = updateArticle.bind(null, article.id);
    return (
        <form action={updateArticleWithId}>
            <div className='flex gap-2 rounded-md bg-gray-900 text-white p-4 md:p-6'>
                <div className="">
                    {/* Customer Name */}
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                            Choose customer
                        </label>
                        <div className="relative">
                            <select
                            id="customer"
                            name="customerId"
                            className="peer block w-full text-gray-900 font-semibold cursor-pointer rounded-md border border-gray-800 py-2 pl-10 text-sm outline-2 placeholder:text-gray-900"
                            defaultValue={article.customer_id}
                            >
                            <option value="" disabled>
                                Select a customer
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                {customer.name}
                                </option>
                            ))}
                            </select>
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    {/* Article Title */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            Enter a title
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                step="0.01"
                                placeholder="Enter your title..."
                                defaultValue={article.title}
                                className="peer block w-full text-gray-900 font-semibold rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>

                    {/* Article Year */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                            Choose a year (optional)
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                            <input
                                id="year"
                                name="year"
                                type="number"
                                step="0.01"
                                placeholder="Enter year of creation..."
                                defaultValue={article.year}
                                className="peer block w-full text-gray-900 font-semibold rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>

                    {/* Invoice Status */}
                    <fieldset>
                        <legend className="mb-2 block text-sm font-medium">
                            Set the article status
                        </legend>
                        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    defaultChecked={article.status === 'pending'}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    />
                                    <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-50"
                                    >
                                    Pending <ClockIcon className="h-4 w-4" />
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    id="active"
                                    name="status"
                                    type="radio"
                                    value="active"
                                    defaultChecked={article.status === 'active'}
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    />
                                    <label
                                    htmlFor="active"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                                    >
                                    Active <CheckIcon className="h-4 w-4" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                {/* Article Content */}
                <div className="ml-4 w-full">
                    <label htmlFor="content" className="mb-2 block text-sm font-medium">
                        Start writing
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                        <textarea
                            id="content"
                            name="content"
                            placeholder="..."
                            rows={15}
                            defaultValue={article.content}
                            className="peer block w-full text-gray-900 font-semibold rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                        />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                href="/admin/articles"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                Cancel
                </Link>
                <Button type="submit">Edit Invoice</Button>
            </div>
        </form>
    );
}
