import Form from '../components/Form'

export default function Login() {
  return (
    <main className='flex justify-center flex-col items-center'>
      <div className='w-min mx-auto my-auto'>
        <Form title='Login' endPoint='login'/>
      </div>
    </main>
  )
}
