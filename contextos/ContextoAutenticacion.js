import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../servicios/ServicioFirebase';

export const ContextoAutenticacion = createContext({
  usuario: null,
  cargando: true,
});

export function ProveedorAutenticacion({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUsuario(u);
        setCargando(false);
      } else {
        const cred = await signInAnonymously(auth);
        setUsuario(cred.user);
        setCargando(false);
      }
    });
    return () => unsub();
  }, []);

  return (
    <ContextoAutenticacion.Provider value={{ usuario, cargando }}>
      {children}
    </ContextoAutenticacion.Provider>
  );
}
