import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

interface Props {
  title: string
  endPoint: string
}

function Redirect() {
  return (
    <div className='text-xs flex gap-2 items-center'>
      <label>Need a count?</label>
      <span className=' text-green-400'><Link to='/sign-up'>Sign Up</Link></span>
    </div>
  )
}

export default function Form({ title, endPoint }: Props) {
  const { register, handleSubmit, formState, reset } = useForm<IFormInput>()

  const { errors } = formState

  const submit = handleSubmit(async data => {
    try {
      const baseUrl = `http://localhost:3000/api/${endPoint}`
      const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const token = await response.json()
      console.log(token)
    } catch (error) {
      console.log(error)
    }
    reset() //resetea al enviar el formulario
  })

  return (
    <form
      action='user-register'
      onSubmit={submit}
      className='flex flex-col gap-2 font-bold'
    >
      {/* username */}
      <h1
        className={`font-bold text-2x ${
          title === 'Sign Up' ? 'text-red-400' : 'text-blue-400'
        }`}
      >
        {title}
      </h1>
      <div className='flex justify-between'>
        <label htmlFor='nombre'>Username</label>
        {title !== 'Sign Up' ? <Redirect /> : null}
      </div>
      <input
        type='text'
        className='data'
        placeholder='Full name'
        //register tiene dos parametros un <string - objeto>
        {...register('username', {
          required: {
            value: true,
            message: 'Nombre es requerido' //Siempre se tiene que llamar message
          }, // si no llena no se envia
          minLength: {
            value: 2,
            message: 'Nombre debe tener al menos 2 caracteres'
          },
          maxLength: {
            value: 16,
            message: 'Nombre dbe tener maximo 20 caracteres'
          }
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}
      {/* Email */}
      <label htmlFor='correo'>Email</label>
      <input
        type='email'
        className='data'
        placeholder='name@example.com'
        {...register('email', {
          required: {
            value: true,
            message: 'Correo es requerido'
          },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'El correo no es valido'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      {/* Password */}
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        className='data'
        {...register('password', {
          required: {
            value: true,
            message: 'La contraseña es requerida'
          },
          minLength: {
            value: 8,
            message: 'La contraseña debe tener al menos 8 caracteres'
          }
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      {/* Boton de envio */}
      <button
        className='rounded-2xl border-white p-1 hover:bg-cyan-700 border-2 '
        type='submit'
      >
        {title}
      </button>
    </form>
  )
}
