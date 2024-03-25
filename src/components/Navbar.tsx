'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
    Home,
    CircleUserRound,
    UserPlus,
    LogIn,
    LogOut,
    InfoIcon
} from "lucide-react"

import { useCurrentUserContext } from "@/components/UserContext"
import { logout } from "@/app/actions"


const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { currentUser, setCurrentUser } = useCurrentUserContext()

    const logoutHandler = async () => {
        await logout()
        setCurrentUser(null)
        router.push('/')
    }

    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 lg:mt-2">
            <Link
                href="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === '/' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
            >
                <Home className="h-4 w-4" />
                Home
            </Link>

            {currentUser && (
                <>
                    <Link
                        href="/profile"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === '/profile' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
                    >
                        <CircleUserRound className="h-4 w-4" />
                        Profile
                    </Link>
                    <button onClick={logoutHandler} className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === '/logout' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}>
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </>
            )}
            {!currentUser && (
                <>
                    <Link
                        href="/login"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === '/login' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
                    >
                        <LogIn className="h-4 w-4" />
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === '/register' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
                    >
                        <UserPlus className="h-4 w-4" />
                        Register
                    </Link>
                    <Link
                        href="/about"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === '/about' ? 'bg-muted text-primary' : 'text-muted-foreground'} `}
                    >
                        <InfoIcon className="h-4 w-4" />
                        Products
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
