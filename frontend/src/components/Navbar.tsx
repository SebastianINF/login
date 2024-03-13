import {Link} from 'react-router-dom'
export default function Navbar () {
  return (
    <nav className='bg-gray-700 text-white flex items-center justify-around gap-20 h-16 font-bold'>

      <h1 className='text-2xl'><Link to='/'>Home</Link></h1>
      <ul className='flex items-center justify-between gap-1'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li className='hover:bg-red-400'><Link to='/sign-up'>Sign Up</Link></li>
        <li className='hover:bg-blue-400'><Link to='/login'>Login</Link></li>
      </ul>

    </nav>
  )
}