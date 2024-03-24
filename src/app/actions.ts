"use server"


import { revalidatePath } from "next/cache";


export async function login(formData: FormData) {

    try {
        const email = formData.get("email")
        const password = formData.get("password")

        console.log("email", email)
        console.log("password", password)
        
    } catch (error) {
        
    }

}

export async function register(formData: FormData) {

    try {
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")
        const role = formData.get("role")


        console.log("username", username)
        console.log("email", email)
        console.log("password", password)
        console.log("role", role)

        // await fetch("")
        
    } catch (error) {
        
    }


}