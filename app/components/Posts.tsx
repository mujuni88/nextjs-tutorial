'use client';

import { Post } from '@server/db';
import { useEffect, useState } from 'react';

const getPosts = async () => {
  return await fetch('/api/posts/getPosts').then((res) => res.json());
};

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <main className="p-5 h-full">
      {/*<h1>Posts {user?.name ?? 'N/A'}</h1>*/}
      {(posts ?? []).map((post: Post) => (
        <article key={post.id} className="p-5 rounded-md shadow-md">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </main>
  );
}
