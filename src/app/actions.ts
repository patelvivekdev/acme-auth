"use server"


import { revalidatePath } from "next/cache";


export async function login(formData: FormData) {

    try {
        const email = formData.get("email")
        const password = formData.get("password")

        // await fetch("")
        
    } catch (error) {
        
    }

}

export async function register(formData: FormData) {

    try {
        const email = formData.get("email")
        const password = formData.get("password")

        // await fetch("")
        
    } catch (error) {
        
    }


}