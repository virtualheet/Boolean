'use client'

// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { UserProvider } from '@/context/UserContext';
import Navbar from '@/components/Nav';
import { ThemeProvider } from '@/context/ThemeContext';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Boolean - Freelance Platform',
//   description: 'A Next.js application with dark/light mode',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="en" suppressContentEditableWarning>
          <body className='pop bg-white dark:bg-black'>
            <ThemeProvider>
              <Navbar />
              <main
                className='min-h-screen h-screen'
              >{children}
              </main>
              {/* {pathname === '/' && <Footer />} */}
            </ThemeProvider>
          </body>
        </html>
      </UserProvider>
    </ClerkProvider>
  );
}
