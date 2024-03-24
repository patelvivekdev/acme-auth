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
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")


        console.log("name", name)
        console.log("email", email)
        console.log("password", password)

        

        // await fetch("")
        
    } catch (error) {
        
    }


}