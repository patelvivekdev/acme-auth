import { SubmitButton } from '@/components/submit-button'
import { register } from '../actions'


const registerPage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1>Register</h1>
        <form action={register}>
          <div className="flex flex-col">
            <div className='m-4 flex flex-col'>
              <label>
                Name: 
                <input type="text" name="name" className='text-black' />
              </label>
            </div>
            <div className='m-4 flex flex-col'>
              <label>
                Email:
                <input type="email" name="email" className='text-black' />
              </label>
            </div>
          </div>
          <SubmitButton name="register" />
        </form>
      </div>
    </>
  )
}

export default registerPage