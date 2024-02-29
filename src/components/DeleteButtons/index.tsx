'use client'

import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteArticle } from '@/lib/actions';

export function DeleteArticle({ id }: { id: string }) {
    const deleteArticleWithId = deleteArticle.bind(null, id);
   
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        if(confirm("Are you sure?")){
            deleteArticleWithId()
        }
        }}>
        <button className="rounded-md border p-2 hover:text-yellow-500 hover:border-yellow-500">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }
  