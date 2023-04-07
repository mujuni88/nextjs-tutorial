'use client';

import { Post } from '@server/db';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SecondaryButton } from './Button';

const getPosts = async (): Promise<Post[]> => {
  return await (await fetch('/api/posts/getPosts')).json();
};

export default function Posts() {
  const {
    isLoading,
    isError,
    data: posts,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  return (
    <div className="grid gap-3 p-5 md:grid-cols-4">
      {(posts ?? []).map((post: Post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

const handleDelete = async (id: number) => {
  return await fetch('/api/posts/deletePost', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
};

const Post = ({ post }: { post: Post }) => {
  const qc = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => qc.invalidateQueries(['posts']),
    onError: (error) => console.error(error),
  });

  const handleOnDelete = async () => {
    await mutateAsync(post.id);
  };

  return (
    <article
      key={post.id}
      className="flex flex-col gap-2 rounded-md border-2 bg-white p-3 text-sm shadow-sm "
    >
      <div className="bg-gray-500 p-20" />
      <h1 className="text-md font-semibold text-indigo-900">{post.title}</h1>
      <p className="mb-4 text-xs">{post.content}</p>
      <SecondaryButton
        onClick={handleOnDelete}
        className={'text-sm disabled:opacity-50'}
        disabled={isLoading}
      >
        {isLoading ? 'Delete...' : 'Delete'}
      </SecondaryButton>
    </article>
  );
};
