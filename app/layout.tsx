import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from './site-shell';
import './globals.css';
export const metadata:Metadata={title:'Hódos — A little further from the ordinary',description:'Travel through India with Hódos Originals and Curated journeys. Find the moments that stay with you.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><head><link rel="preconnect" href="https://images.unsplash.com"/></head><body><SiteHeader/>{children}<SiteFooter/></body></html>}
