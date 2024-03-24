import { cookies } from 'next/headers'

export const revalidate = 3600 // revalidate at most every hour

async function getData() {

  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  try {

    const res = await fetch('http://localhost:8080/api/v1/users/current-user',
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken?.value}`
        },
      }
    )

    const data = await res.json()

    console.log("data", data)

    return data
  } catch (error) {
    console.log(error)
  }
}


export default async function profilePage() {

  await getData()

  return (
    <div>Profile Page</div>
  )
}
