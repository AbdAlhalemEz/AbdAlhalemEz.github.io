import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abed Alhalim Ezz Aldin — IT Support & Software Developer",
  description:
    "Portfolio of Abed Alhalim Ezz Aldin — IT Support Technician, QA Analyst, Software Developer, and Indie Game Developer based in Ottawa/Gatineau.",
  keywords: [
    "IT Support",
    "QA Analyst",
    "Software Developer",
    "Indie Games",
    "React",
    "Three.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Abed Alhalim Ezz Aldin — Portfolio",
    description: "IT Support Technician, QA Analyst, Software Developer & Indie Game Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
