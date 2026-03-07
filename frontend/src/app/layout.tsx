import type { Metadata } from "next";
import { Syne, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/layout/ClientProviders";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://eslavathvineethnaik.dev'),
  title: "Eslavath Vineeth Naik — Full Stack & AI Engineer",
  description: "Building scalable AI-powered systems that think, scale, and ship.",
  keywords: ["Full Stack Developer", "AI Engineer", "Next.js", "React", "TypeScript", "Machine Learning"],
  authors: [{ name: "Eslavath Vineeth Naik" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eslavathvineethnaik.dev",
    title: "Eslavath Vineeth Naik — Full Stack & AI Engineer",
    description: "Building scalable AI-powered systems that think, scale, and ship.",
    siteName: "Eslavath Vineeth Naik Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Eslavath Vineeth Naik" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eslavath Vineeth Naik — Full Stack & AI Engineer",
    description: "Building scalable AI-powered systems that think, scale, and ship.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://eslavathvineethnaik.dev" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${instrumentSans.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
