import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Dashboard, Blog, Products, SignUp, Login } from './pages'
import ProtectedRoutes from './components/ProtectedRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        // rutas sin proteger
        <Route index path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        // rutas protegidas
        <Route element={<ProtectedRoutes />}>
          <Route path='/products' element={<Products />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
