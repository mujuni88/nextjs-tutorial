'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { useReducer } from 'react';
import { Post } from '../server/db';
import { PrimaryButton } from './Button';
import { Input } from './Input';
import { TextArea } from './TextArea';

const createPost = async (data: Pick<Post, 'title' | 'content'>) => {
  return await fetch('/api/posts/createPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

type Action = {
  type: 'title' | 'content' | 'clear';
  payload: string;
};

type State = {
  title: string;
  content: string;
  length: number;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'content':
      return {
        ...state,
        content: action.payload,
        length: action.payload.length,
      };
    case 'clear':
      return { title: '', content: '', length: 0 };
    default:
      return state;
  }
};

export default function PostForm() {
  const [state, dispatch] = useReducer(reducer, {
    title: '',
    content: '',
    length: 0,
  });

  const qc = useQueryClient();
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: createPost,
    onSuccess: () => qc.invalidateQueries(['posts']),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content } = e.currentTarget.elements as any;
    await mutateAsync({ title: title.value, content: content.value });
    dispatch({ type: 'clear', payload: '' });
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: name as 'title' | 'content', payload: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-2 flex w-3/4 flex-col gap-4 rounded-md border-2 bg-white p-5 text-sm shadow-sm md:w-2/3"
    >
      <Input
        type="text"
        name="title"
        placeholder="Title"
        value={state.title}
        onChange={handleOnChange}
      />
      <TextArea
        name="content"
        aria-rowcount={3}
        placeholder="Content"
        value={state.content}
        onChange={handleOnChange}
      />
      <div className="flex justify-between">
        <div
          className={clsx(
            'text-xs text-gray-500',
            state.length > 200 && state.length < 300 && 'text-yellow-500',
            state.length > 300 && 'text-red-500'
          )}
        >
          {state.length}/300
        </div>
        <PrimaryButton
          className="ml-auto w-fit disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </PrimaryButton>
      </div>
    </form>
  );
}
