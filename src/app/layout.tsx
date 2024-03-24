import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs Freeapi Example",
  description: "Exapmle app by create next app and Freeapi",
  keywords: "nextjs, freeapi, example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <nav>
          <Navbar />
        </nav>
        {children}
      </body>
    </html>
  );
}
