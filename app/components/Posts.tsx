'use client';

import { useQuery } from '@tanstack/react-query';
import { Post } from '@server/db';
import PostDelete from './PostDelete';

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
    <div className="grid grid-col-3 grid-flow-col gap-3">
      {(posts ?? []).map((post: Post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

const Post = ({ post }: { post: Post }) => {
  return (
    <article
      key={post.id}
      className="flex flex-col gap-2 p-3 bg-white rounded-md text-sm border-2 shadow-sm"
    >
      <div className="p-20 bg-gray-500" />
      <h1 className="text-md text-indigo-900 font-semibold">{post.title}</h1>
      <p className="mb-4 text-xs">{post.content}</p>
      <PostDelete id={post.id} className="text-xs" />
    </article>
  );
};
