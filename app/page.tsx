import { Metadata } from 'next';
import PostForm from '@/app/components/PostForm';
import Posts from '@components/Posts';

export const metadata: Metadata = {
  title: 'Joe Page',
};

export default async function Home() {
  return (
    <div className="h-full flex flex-col items-center">
      <h1 className="text-lg my-4">Enter Your Post</h1>
      <PostForm />

      <h1 className="text-lg my-4">Posts</h1>
      <Posts />
    </div>
  );
}
