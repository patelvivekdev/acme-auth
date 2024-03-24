import { SubmitButton } from '@/components/submit-button'
import { login } from '../actions'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const loginPage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1>Login Page</h1>
        <form action={login}>
          <div className="flex flex-col">
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
            <SubmitButton name="Login" />
          </div>
        </form>
      </div>
    </>
  )
}

export default loginPage