import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useReducer } from "react";
import { TripsProvider } from "../lib/trips-context";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Dream Travels",
  description: "The place you dream of",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.variable}`}
      >
        <TripsProvider>
          {children}
        </TripsProvider>

      </body>
    </html>
  );
}
