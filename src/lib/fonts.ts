import { Syne, Plus_Jakarta_Sans } from 'next/font/google';

export const clashDisplay = Syne({
  subsets: ['latin'],
  variable: '--font-clash',
  display: 'swap',
  weight: ['500', '700', '800'],
});

export const satoshi = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
