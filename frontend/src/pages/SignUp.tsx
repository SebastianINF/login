import Form from '../components/Form'

export default function SignUp() {
  return (
    <main className='flex justify-center flex-col items-center'>
      <div className='w-min mx-auto my-auto'>
        <Form title='Sign Up' endPoint='sign-up'/>
      </div>
    </main>
  )
}
