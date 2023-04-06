'use client';

import { useQuery } from '@tanstack/react-query';
import { Post } from '@server/db';
import { useEffect, useState } from 'react';
import { asSyncComponent } from './asSyncComponent';
import PostDelete from './PostDelete';
import { features } from 'process';

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
    <main className="p-5 h-full">
      {/*<h1>Posts {user?.name ?? 'N/A'}</h1>*/}
      {(posts ?? []).map((post: Post) => (
        <article key={post.id} className="p-5 rounded-md shadow-md">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <PostDelete id={post.id} />
        </article>
      ))}
    </main>
  );
}
