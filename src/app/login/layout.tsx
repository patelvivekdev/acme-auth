import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your acoount",
    keywords: "login, Sign in, freeapi",
  };
  
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}