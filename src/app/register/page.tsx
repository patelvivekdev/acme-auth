import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next";

import { register } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/submit-button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
  keywords: "register, Sign up, freeapi",
};

export default function registerPage() {

  const UserRolesEnum = {
    ADMIN: "ADMIN",
    USER: "USER",
  };

  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] sm:[mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold mt-3">Register</h1>
            <p className="text-balance text-muted-foreground">
              Fill your details below to register to your account
            </p>
          </div>
          <form action={register}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="username">Username</Label>
                </div>
                <Input
                  id="username"
                  type="input"
                  name="username"
                  placeholder="username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required />
              </div>
              <SubmitButton name="register" />
            </div>
          </form>
          <Button variant="outline" className="w-full">
            Register with Google
          </Button>
          <Button variant="outline" className="w-full">
            Register with Github
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div> */}
    </div>
  )
}
