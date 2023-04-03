import { getSession } from '@server/session';
import { Post } from '../server/db';
import { asSyncComponent } from './asSyncComponent';

async function Posts() {
  const { user } = (await getSession()) || {};
  const posts = await fetch('http://localhost:3000/api/posts/getPosts').then(
    (res) => res.json()
  );

  return (
    <main className="p-5 h-full">
      <h1>Posts {user?.name ?? 'N/A'}</h1>
      {posts.map((post: Post) => (
        <article key={post.id} className="p-5 bg-white rounded-md shadow-md">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </main>
  );
}

const _Posts = asSyncComponent(Posts);
export default _Posts;
