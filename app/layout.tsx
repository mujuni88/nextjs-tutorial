import Link from 'next/link';
import './globals.css'
import { Montserrat} from 'next/font/google'


const montserrat = Montserrat({ subsets: ['latin'], variable: '---font-montserrat' });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className='h-screen'>
        <nav className='flex flex-row gap-3 mb-2 p-2'>
          <h1>Joe Buza</h1>
          <ul className='flex gap-1'>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href='/about'>About</Link></li>
          </ul>
        </nav>
        {children}
        </body>
    </html>
  )
}
