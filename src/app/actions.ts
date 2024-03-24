"use server"

import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers'

export async function login(formData: FormData) {

    try {
        const email = formData.get("email")
        const password = formData.get("password")

        const response = await fetch("https://api.freeapi.app/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            })
        })

        const result = await response.json();
        console.log(result)

        // // Check if success is true, if true set cookie and redirect to /
        if (result.success) {
            // Set cookie
            const oneDay = 24 * 60 * 60 * 1000
            cookies().set({
                name: "accessToken",
                value: result.data.accessToken,
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + oneDay),
            })
            cookies().set({
                name: "refreshToken",
                value: result.data.refreshToken,
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + oneDay),
            })
        }
    } catch (error: any) {
        console.log("error", error.message)
    }
    redirect("/")
}

export async function logout() {
    cookies().delete('accessToken')
    cookies().delete('refreshToken')
    redirect("/")
}

export async function register(formData: FormData) {

    try {
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")
        const role = formData.get("role")

        const response = await fetch("https://api.freeapi.app/api/v1/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
                role
            })
        })

        const result = await response.json();
        console.log(result)

        if (result.success === false) {
            throw new Error("Something went wrong")
        }

    } catch (error) {
        console.log("Error", error)
    }
    redirect("/login")

}