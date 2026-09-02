import type { Metadata } from "next"
import localFont from "next/font/local"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const departureMono = localFont({
  src: "./fonts/departure-mono/departure-mono-regular.woff2",
  variable: "--font-departure-mono",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bienstudio.co"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bien",
  description: "A digital brand and product design studio.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bien",
    description: "A digital brand and product design studio.",
    url: "/",
    siteName: "Bien",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/assets/images/favicon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/images/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${departureMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground text-base">
        {children}
      </body>
    </html>
  )
}
