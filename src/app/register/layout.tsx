import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Register",
    description: "Create a new account",
    keywords: "register, Sign up, freeapi",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}