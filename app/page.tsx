import { Metadata } from "next";
import { getSession } from "./server/session";

export const metadata: Metadata = {
  title: "Joe Page",
}

export default async function Home() {
  const { user} = await getSession() || {};
  return (
    <main className='p-5 h-full'>
      <h1>Home {user?.name ?? 'N/A'}</h1>
    </main>
  )
}

