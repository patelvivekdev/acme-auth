"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation'

import {
    Home,
    Menu,
    UserPlus,
    LogIn,
    LogOut,
    Info
} from "lucide-react"


import { useCurrentUserContext } from "@/components/UserContext"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const MobileNav = () => {
    const pathname = usePathname()
    const { currentUser } = useCurrentUserContext()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <span className="">Acme Auth</span>
                    </Link>
                    {currentUser && (
                        <>
                            <Link
                                href="/profile"
                                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${pathname === '/profile' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
                            >
                                <Home className="h-5 w-5" />
                                Profile
                            </Link>
                            <Link
                                href="/logout"
                                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${pathname === '/logout' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
                            >
                                <LogOut className="h-5 w-5" />
                                Logout
                            </Link>
                        </>
                    )}
                    {!currentUser && (
                        <>
                            <Link
                                href="/login"
                                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${pathname === '/login' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
                            >
                                <LogIn className="h-5 w-5" />
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${pathname === '/register' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
                            >
                                <UserPlus className="h-5 w-5" />
                                Register
                            </Link>
                            <Link
                                href="/about"
                                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${pathname === '/about' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
                            >
                                <Info className="h-5 w-5" />
                                About
                            </Link>
                        </>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav