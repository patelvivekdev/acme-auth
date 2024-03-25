'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { z } from 'zod';

const registerSchema = z.object({
	username: z.string().min(3, { message: "Must be 3 or more characters long" }),
	email: z.string().email("Please enter valid message").min(5),
	password: z.string().min(8, { message: "Must be 8 or more characters long" }),
	role: z.enum(['ADMIN', 'USER']),
});

const loginSchema = z.object({
	email: z.string().email("Please enter valid email"),
	password: z.string()
})


export async function register(prevState: any, formData: FormData) {

	const validatedFields = registerSchema.safeParse({
		email: formData.get('email'),
		username: formData.get('username'),
		password: formData.get('password'),
		role: formData.get('role'),
	})

	// Return early if the form data is invalid
	if (!validatedFields.success) {
		return {
			type: 'error',
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to register.',
		};
	}

	try {
		const response = await fetch(
			'https://api.freeapi.app/api/v1/users/register',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(validatedFields.data),
			}
		)

		const result = await response.json()

		if (result.success === false) {
			return {
				type: 'error',
				message: result.message
			}
		}
	} catch (error: any) {
		console.log('error', error.message)
		return {
			type: 'error',
			message: 'Database Error: Failed to register.',
		};
	}
	redirect('/login')
}

export async function login(prevState: any, formData: FormData) {

	const validatedFields = loginSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	})

	// Return early if the form data is invalid
	if (!validatedFields.success) {
		return {
			type: 'error',
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to login.',
		};
	}

	try {
		const email = formData.get('email')
		const password = formData.get('password')

		const response = await fetch(
			'https://api.freeapi.app/api/v1/users/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			}
		)

		const result = await response.json()

		// // Check if success is true, if true set cookie and redirect to /
		if (result.success) {
			// Set cookie
			const oneDay = 24 * 60 * 60 * 1000
			cookies().set({
				name: 'accessToken',
				value: result.data.accessToken,
				httpOnly: true,
				secure: true,
				expires: new Date(Date.now() + oneDay),
			})
			cookies().set({
				name: 'refreshToken',
				value: result.data.refreshToken,
				httpOnly: true,
				secure: true,
				expires: new Date(Date.now() + oneDay),
			})
		} else {
			return {
				type: 'error',
				message: result.message
			}
		}
	} catch (error: any) {
		console.log('error', error.message)
		return {
			type: 'error',
			message: 'Database Error: Failed to login.',
		};
	}
	redirect('/profile')
}

export async function logout() {
	try {
		cookies().delete('accessToken')
		cookies().delete('refreshToken')
	} catch (error) {
		console.log("Error", error)
	}
}

// Fetch data from API
export async function getCurrentUser() {
	const cookieStore = cookies()
	const accessToken = cookieStore.get('accessToken')

	try {
		const res = await fetch('https://api.freeapi.app/api/v1/users/current-user',
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken?.value}`
				},
			}
		)

		const data: {
			ststusCdoe: number,
			data: any,
			message: string,
			success: boolean
		} = await res.json()

		return data

	} catch (error) {
		console.log("error", error)
	}
}


export async function forgetPassword(formData: FormData) {
	try {
		const email = formData.get('email')

		const response = await fetch(
			'https://api.freeapi.app/api/v1/users/forgot-password',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
				}),
			}
		)

		const result = await response.json()
	} catch (error) {
		console.log('error', error)
	}
}

export async function resendEmailVerification() {
	const cookieStore = cookies()
	const accessToken = cookieStore.get('accessToken')?.value

	try {
		if (accessToken) {
			const response = await fetch(
				'https://api.freeapi.app/api/v1/users/resend-email-verification',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			const result = await response.json()
		} else {
			throw new Error('Invalid token! Plasea login again')
		}
	} catch (error) {
		console.log('Error', error)
	}
}

export async function changePassword(formData: FormData) {
	try {
		const oldPassword = formData.get('oldPassword')
		const newPassword = formData.get('newPassword')

		const response = await fetch(
			'https://api.freeapi.app/api/v1/users/change-password',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					oldPassword,
					newPassword,
				}),
			}
		)

		const result = await response.json()
	} catch (error) {
		console.log('Error', error)
	}
}

export async function changeAvatar(formData: FormData) {
	try {
		const avatar = formData.get('file')

		const response = await fetch(
			'https://api.freeapi.app/api/v1/users/avatar',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				body: avatar,
			}
		)

		const result = await response.json()
	} catch (error) {
		console.log('Error', error)
	}
}

export async function verifyEmail(formData: FormData) {

}