import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';



import { APP_CONFIG } from '@/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.NAME,
    template: `%s | ${APP_CONFIG.NAME}`,
  },
  description: 'A modern fullstack application built with Next.js and FastAPI',
  keywords: ['Next.js', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: APP_CONFIG.NAME,
    description: 'A modern fullstack application',
    siteName: APP_CONFIG.NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.NAME,
    description: 'A modern fullstack application',
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
