import { createContext, useContext, useState } from 'react';

// Contexto de autenticación. Lo que expone useAuth() ya es la forma acordada
// (lo usan ProtectedRoute, Perfil y MisPedidos), así que se puede completar
// por dentro sin cambiar nada de esas páginas:
//   usuario          -> { id, nombre, email } o null si no hay sesión
//   token            -> JWT que devuelve el backend, o null
//   estaAutenticado  -> true si hay usuario y token
//   cargando         -> true mientras se recupera la sesión guardada
//   login / logout   -> iniciar y cerrar sesión
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando] = useState(false);

  // PENDIENTE (Integrante 3): al cargar la app, recuperar el token y el usuario
  // de localStorage. Mientras tanto "cargando" tiene que estar en true, así
  // ProtectedRoute no manda a /login a alguien que ya tenía sesión.

  // PENDIENTE (Integrante 3): llamar a POST /api/auth/login, guardar el token
  // y el usuario en localStorage y en el estado (setToken / setUsuario).
  async function login() {
    throw new Error('El login todavía no está implementado');
  }

  // PENDIENTE (Integrante 3): borrar también el token de localStorage
  function logout() {
    setUsuario(null);
    setToken(null);
  }

  const valor = {
    usuario,
    token,
    estaAutenticado: Boolean(usuario && token),
    cargando,
    login,
    logout,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('useAuth tiene que usarse dentro de <AuthProvider>');
  }

  return contexto;
}
