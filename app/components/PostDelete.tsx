'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

export default function PostDelete({ id }: { id: number }) {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: (data) => qc.invalidateQueries(['posts']),
    onError: (error) => console.error(error),
  });

  return (
    <button
      className="p-2 px-4 bg-teal-400 rounded-md"
      onClick={() => mutation.mutate(id)}
    >
      Delete
    </button>
  );
}
