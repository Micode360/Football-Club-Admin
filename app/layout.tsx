import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainLayout from "@/components/layout/mainLayout";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The League",
  description: "Application  news data in relation to league tournaments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <html lang="en">
        <body className={inter.className}>{children}</body>
        <GoogleAnalytics gaId={process.env.NEXT_GOOGLE_ANALYTICS_TAG as string} />
      </html>
    </MainLayout>
  );
}
