'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Post } from '../server/db';

const createPost = async (data: Pick<Post, 'title' | 'content'>) => {
  return await fetch('/api/posts/createPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export default function PostForm() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => qc.invalidateQueries(['posts']),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content } = e.currentTarget.elements as any;
    mutation.mutate({ title: title.value, content: content.value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">Submit</button>
    </form>
  );
}
