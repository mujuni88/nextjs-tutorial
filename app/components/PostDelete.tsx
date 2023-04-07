'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SecondaryButton } from './Button';

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

export default function PostDelete({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => qc.invalidateQueries(['posts']),
    onError: (error) => console.error(error),
  });

  return (
    <SecondaryButton onClick={() => mutation.mutate(id)} className={className}>
      Delete
    </SecondaryButton>
  );
}
