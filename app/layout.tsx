import { Nav } from '@components/Nav';
import clsx from 'clsx';
import { Montserrat, Open_Sans } from 'next/font/google';
import React from 'react';
import { TrpcProvider } from './components/TrpcProvider';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '---font-montserrat',
});
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '---font-open-sans',
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(montserrat.variable, openSans.className, 'bg-white')}
    >
      <body className="h-screen bg-white">
        <TrpcProvider>
          <Nav />
          <main className="h-full max-w-full lg:max-w-screen-lg lg:mx-auto">
            {children}
          </main>
        </TrpcProvider>
      </body>
    </html>
  );
}
