// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Nav';
import { ThemeProvider } from '@/context/ThemeContext';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Name',
  description: 'A Next.js application with dark/light mode',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body className='pop bg-white dark:bg-black'>
          <ThemeProvider>
            <Navbar />
            <main
              className='min-h-screen h-screen'
              // style={{
              //   padding:"clamp(1rem,5vw,200rem) 0 0"
              // }}
            >
              {children}

            </main>
              <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}