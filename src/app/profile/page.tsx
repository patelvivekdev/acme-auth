import { cookies } from 'next/headers'

export const revalidate = 3600 // revalidate at most every hour

async function getData() {

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

    const data = await res.json()

    console.log("data", data)

    return data
  } catch (error) {
    console.log(error)
  }
}


export default async function Page() {

  await getData()

  return (
    <div>Proflie Page</div>
  )
}
