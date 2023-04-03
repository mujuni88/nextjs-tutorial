'use client';

import React from 'react';

export default function PostForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content } = e.currentTarget.elements as any;
    console.log(title.value, content.value);

    const res = await fetch('/api/posts/addPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
      }),
    });

    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">Submit</button>
    </form>
  );
}
