import type { Metadata } from "next";
import { inter } from '@/components/custom/fonts';
import "./normalize.css";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "frewazxc",
  description: "My personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

