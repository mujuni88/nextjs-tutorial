'use client';

import Image from 'next/image';
import { RouterOutputs } from '../server/routers/root';
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

function Post({ post }: { post: RouterOutputs['post']['all'][number] }) {
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
      className="flex flex-col gap-4 rounded-md border-2 bg-white py-5 px-3 text-sm shadow-sm max-w-[15rem]"
    >
      {post.userAvatar ? (
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <Image
            src={post.userAvatar}
            alt="User avatar"
            className="rounded-full border-2 border-cyan-300 outline-offset-2"
            width={48}
            height={48}
          />
          <div>
            <p className="text-sm text-gray-600">{post.userName}</p>
            <p className="text-xs text-gray-500">{post.userEmail}</p>
          </div>
        </div>
      ) : null}
      <div className="space-y-1 flex-grow">
        <h1 className="text-md font-semibold text-indigo-900">{post.title}</h1>
        <p className="mb-4 text-xs max-h-48 overflow-auto">{post.content}</p>
      </div>
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
