import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoutes() {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'GET',
          credentials: 'include'
        });

        setAuth(response.ok)
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (auth === false) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
