import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from "next/script";
import './globals.css'
import { Toaster } from "sonner"

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ProfilePilot - AI LinkedIn Score',
  description: 'Get a Recruiter-Style LinkedIn Score in 60 Seconds. Upload your profile and receive a detailed analysis with actionable recommendations.',
  generator: 'v0.app',
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="bg-background font-sans antialiased text-foreground">
        {children}
        <Toaster />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
