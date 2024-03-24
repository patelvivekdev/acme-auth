import { SubmitButton } from '@/components/submit-button'
import { register } from '../actions'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const registerPage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1>Register</h1>
        <form action={register}>
          <div className="flex flex-col">
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
              <Label htmlFor="name">name</Label>
              <Input type="name" id="name" placeholder="name" name="name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" name="email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt3">
              <Label htmlFor="password">password</Label>
              <Input type="password" id="password" placeholder="password" name="password" />
            </div>
          </div>
          <div className='mt-3'>
            <SubmitButton name="register" />
          </div>
        </form>
      </div>
    </>
  )
}

export default registerPage