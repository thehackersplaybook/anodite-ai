import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anodite AI - Open Source AI-Powered PR Reviewer",
  description: "Effortless code reviews, powered by AI. Self-hosted, cost-effective GitHub App for intelligent pull request reviews. Get started in under 5 minutes.",
  keywords: ["AI", "code review", "GitHub", "pull request", "open source", "self-hosted", "developer tools"],
  authors: [{ name: "The Hackers Playbook" }],
  openGraph: {
    title: "Anodite AI - Open Source AI-Powered PR Reviewer",
    description: "Effortless code reviews, powered by AI. Self-hosted, cost-effective GitHub App for intelligent pull request reviews.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
