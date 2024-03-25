import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"

import { UserProvider } from "@/components/UserContext";

import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav"
import Profile from "@/components/Profile"


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
        <UserProvider>
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <span className="">Acme Inc</span>
                </Link>
              </div>
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex-1">
                  <Navbar />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <MobileNav />
                <div className="w-full flex-1">
                </div>
                <Profile />
              </header>
              <main className="flex flex-1 flex-col gap-4 lg:gap-6">
                <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
                  <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] sm:[mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
                  {children}
                </div>
              </main>
            </div>
          </div>
        </UserProvider>
      </body>
    </html >
  );
}
