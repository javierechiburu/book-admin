import clsx from 'clsx';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteArticle } from '@/lib/actions';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-gray-800 px-4 text-sm font-medium text-white transition-colors hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}


export function CreateArticle() {
  return (
    <Link
      href={"/admin/articles/create"}
      className="flex h-10 items-center rounded-lg border border-gray-800 px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
    >
      <span className="hidden md:block">Create Article</span>{' '}
      <PlusIcon className="h-5 md:ml-4 text-gray-800" />
    </Link>
  );
}

export function UpdateArticle({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/articles/${id}/edit`}
      className="rounded-md border p-2 hover:border-yellow-400"
    >
      <PencilIcon className="w-5 hover:text-yellow-400" />
    </Link>
  );
}

export function CreateCustomer() {
  return (
    <Link
      href={"/admin/customers/create"}
      className="flex h-10 items-center rounded-lg border border-gray-800 px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
    >
      <span className="hidden md:block">Create Customer</span>{' '}
      <PlusIcon className="h-5 md:ml-4 text-gray-800" />
    </Link>
  );
}