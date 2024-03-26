import type { Metadata } from "next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { forgetPassword } from "../actions";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "reset your password",
  keywords: "login, Sign in, freeapi",
};

export default async function resetPasswordPage() {
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] sm:[mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Password Reset</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to reset your password
            </p>
          </div>
          <form action={forgetPassword}>
            <div className="grid gap-4">
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
              <SubmitButton name="Send an email" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
