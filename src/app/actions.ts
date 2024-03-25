'use server'

import {redirect} from 'next/navigation'
import {cookies} from 'next/headers'

export async function register(formData: FormData) {
	try {
		const username = formData.get('username')
		const email = formData.get('email')
		const password = formData.get('password')
		const role = formData.get('role')

		const response = await fetch(
			'https://api.freeapi.app/api/v1/users/register',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					email,
					password,
					role,
				}),
			}
		)

		const result = await response.json()

		if (result.success === false) {
			throw new Error('Something went wrong')
		}
	} catch (error) {
		console.log('Error', error)
	}
	redirect('/login')
}

export async function login(formData: FormData) {
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
		}
	} catch (error: any) {
		console.log('error', error.message)
	}
	redirect('/profile')
}

export async function logout() {
	try{
		cookies().delete('accessToken')
		cookies().delete('refreshToken')
		return 
	} catch (error){
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
  
	  const data : {
		ststusCdoe:number,
		data:any,
		message:string,
		success:boolean
	  } = await res.json()

	  return data
  
	} catch (error) {
	  console.log(error)
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

export async function verifyEmail(formData: FormData){
	
}