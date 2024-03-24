'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()

    const navItems: { name: string, path: string }[] = [
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
    ]

    return (
        <div
            className=
            "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white z-[5000] pr-8 pl-8 py-2  items-center justify-center space-x-4"
        >
            {navItems.map((item) => (
                <Link
                    href={item.path}
                    key={item.name}
                    className=
                    "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                >
                    <span className="block sm:hidden">{item.name}</span>
                    <span className="hidden sm:block text-sm">{item.name}</span>
                    {pathname === item.path && (
                        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-sky-600 to-transparent  h-px" />
                    )}
                </Link>
            ))}
        </div>
    )
}

export default Navbar