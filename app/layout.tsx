import './globals.css';
import { Montserrat, Open_Sans } from 'next/font/google';
import Nav from '@components/Nav';
import clsx from 'clsx';
import React from 'react';
import { QueryWrapper } from './components/QueryWrapper';

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
        <QueryWrapper>
          <Nav />
          <main className="h-full max-w-screen-lg m-auto">{children}</main>
        </QueryWrapper>
      </body>
    </html>
  );
}
