'use client'

import { useEffect, useContext } from 'react'

import Link from "next/link"

import {
  Home,
  Menu,
  Package,
  Package2,
  ShoppingCart,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getCurrentUser } from "@/app/actions"

import { useCurrentUserContext } from "@/components/UserContext"

export default function ProfilePage() {

  const { currentUser, setCurrentUser } = useCurrentUserContext()

  useEffect(() => {
    const fetchUser = async () => {
      const updatedViews = await getCurrentUser()
      console.log(updatedViews)
      setCurrentUser(updatedViews?.data)
    }
    fetchUser()
  }, [setCurrentUser])

  return (
    <div>
      <div>
        {currentUser?.email}
      </div>
    </div>
  )
}
