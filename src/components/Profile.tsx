'use client'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useCurrentUserContext } from "@/components/UserContext"
import { logout } from "@/app/actions"


const Profile = () => {
    const { currentUser, setCurrentUser } = useCurrentUserContext()
    const router = useRouter()

    const logoutHandler = async () => {
        await logout()
        setCurrentUser(null)
        router.push('/')
    }

    return (
        <>
            {
                currentUser ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Avatar>
                                    <AvatarImage src={currentUser?.avatar?.url} />
                                    <AvatarFallback>{currentUser?.username}</AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My  Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button onClick={logoutHandler} className='flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground'>
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null
            }
        </>
    )
}

export default Profile