'use client';

import PostForm from '@/app/components/PostForm';
import Posts from '@components/Posts';
import { trpc } from './utils/trpc';

export default function Home() {
  const { isLoading, data } = trpc.auth.getSession.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.user) {
    return <div>You are not logged in</div>;
  }

  return (
    <div className="h-full flex flex-col items-center">
      <h1 className="text-lg my-4">Enter Your Post</h1>
      <PostForm authorId={data.user.id} />

      <h1 className="text-lg my-4">Posts</h1>
      <Posts />
    </div>
  );
}
