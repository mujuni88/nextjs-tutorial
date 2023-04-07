import { asSyncComponent } from '@components/asSyncComponent';
import { getSession } from '@server/session';
import Image from 'next/image';
import Login from './Login';
import Logout from './Logout';

async function Nav() {
  const session = await getSession();
  return (
    <nav className="flex items-center justify-between p-5">
      <h1>My App</h1>
      <ul className="flex items-center gap-3">
        {session?.user?.image ? (
          <li>
            <Image
              src={session.user.image}
              width={40}
              height={40}
              alt={session.user.name ?? 'User name'}
              className="rounded-full"
            />
          </li>
        ) : null}

        <li>{session?.user ? <Logout /> : <Login />}</li>
      </ul>
    </nav>
  );
}

const _Nav = asSyncComponent(Nav);
export default _Nav;
