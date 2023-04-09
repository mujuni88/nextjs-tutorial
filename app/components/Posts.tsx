'use client';

import { type Post } from '@server/db';
import { trpc } from '../utils/trpc';
import { SecondaryButton } from './Button';

export default function Posts() {
  const { isLoading, isError, data: posts } = trpc.post.all.useQuery();
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  return (
    <div className="grid gap-3 p-5 sm:grid-cols-2 md:grid-cols-3 justify-center">
      {(posts ?? []).map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

function Post({ post }: { post: Post }) {
  const util = trpc.useContext();
  const { mutateAsync, isLoading } = trpc.post.delete.useMutation({
    onSuccess: () => util.post.all.invalidate(),
    onError: (error) => console.error(error),
  });

  const handleOnDelete = async () => {
    await mutateAsync({ id: post.id });
  };

  return (
    <article
      key={post.id}
      className="flex flex-col gap-2 rounded-md border-2 bg-white p-3 text-sm shadow-sm "
    >
      <div className="bg-gray-500 aspect-square" />
      <h1 className="text-md font-semibold text-indigo-900">{post.title}</h1>
      <p className="mb-4 text-xs text-ellipsis max-w-[40px] whitespace-nowrap overflow-hidden">
        {post.content}
      </p>
      <SecondaryButton
        onClick={handleOnDelete}
        className={'text-sm disabled:opacity-50'}
        disabled={isLoading}
      >
        {isLoading ? 'Delete...' : 'Delete'}
      </SecondaryButton>
    </article>
  );
}
