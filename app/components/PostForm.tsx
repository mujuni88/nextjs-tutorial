'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { InputHTMLAttributes } from 'react';
import { Post } from '../server/db';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { PrimaryButton } from './Button';

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
    onSuccess: () => qc.invalidateQueries(['posts']),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content } = e.currentTarget.elements as any;
    mutation.mutate({ title: title.value, content: content.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white border-2 shadow-sm rounded-md p-5 my-2 w-2/3 text-sm"
    >
      <Input type="text" name="title" placeholder="Title" />
      <TextArea name="content" aria-rowcount={3} placeholder="Content" />
      <PrimaryButton className="w-fit ml-auto" type="submit">
        Submit
      </PrimaryButton>
    </form>
  );
}
