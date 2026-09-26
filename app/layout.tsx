import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ThemeProvider from '@/components/theme-provider';
import { profile } from '@/content/portfolio';
import { getSiteUrl } from '@/lib/site';
const manrope = localFont({
  src: '../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  variable: '--font-manrope',
  display: 'swap',
});
const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  metadataBase: siteUrl ?? new URL('http://localhost:3000'),
  title: {
    default: 'Suman Kumar Maharana — Senior Frontend Developer',
    template: '%s | Suman Kumar Maharana',
  },
  description: profile.description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Suman Kumar Maharana',
    title: 'Suman Kumar Maharana — Senior Frontend Developer',
    description: profile.description,
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suman Kumar Maharana — Senior Frontend Developer',
    description: profile.description,
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.variable}>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
