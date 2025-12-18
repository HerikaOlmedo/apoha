/**
 * @typedef {Object} Tarea
 * @property {string} id
 * @property {string} titulo
 * @property {'Escuela'|'Trabajo'|'Personal'} categoria
 * @property {'Alta'|'Media'|'Media'|'Baja'} prioridad
 * @property {any} fechaLimite
 * @property {boolean} completada
 * @property {boolean} archivada
 */


import { createContext, useContext, useEffect, useState } from 'react';
import {
    alternarCompletada,
    archivarTarea,
    crearTareaAvanzada,
    escucharTareasActivas,
} from '../servicios/ServicioTareas';
import { ContextoAutenticacion } from './ContextoAutenticacion';

/** @type {{ tareas: Tarea[] }} */
export const ContextoTareas = createContext({
  tareas: [],
  crearTarea: () => {},
  marcarCompletada: () => {},
  archivar: () => {},
  setBusqueda: () => {},
  setFiltroCategoria: () => {},
  setFiltroPrioridad: () => {},
  filtros: {
    busqueda: '',
    filtroCategoria: null,
    filtroPrioridad: null,
  },
});


export function ProveedorTareas({ children }) {
  const { usuario } = useContext(ContextoAutenticacion);
    /** @type {[Tarea[], Function]} */

  const [tareas, setTareas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroPrioridad, setFiltroPrioridad] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  useEffect(() => {
    if (!usuario) return;

    const unsub = escucharTareasActivas(usuario.uid, setTareas);
    return () => unsub();
  }, [usuario]);

  function crearTarea(tarea) {
    if (!usuario) return;
    return crearTareaAvanzada(tarea, usuario.uid);
  }

  function marcarCompletada(id, valor) {
    return alternarCompletada(id, valor);
  }

  function archivar(id) {
    return archivarTarea(id);
  }

  const tareasFiltradas = tareas.filter((t) => {
    if (busqueda && !t.titulo.toLowerCase().includes(busqueda.toLowerCase())) {
      return false;
    }
    if (filtroPrioridad && t.prioridad !== filtroPrioridad) {
      return false;
    }
    if (filtroCategoria && t.categoria !== filtroCategoria) {
      return false;
    }
    return true;
  });

  return (
    <ContextoTareas.Provider
      value={{
        tareas: tareasFiltradas,
        crearTarea,
        marcarCompletada,
        archivar,
        setBusqueda,
        setFiltroPrioridad,
        setFiltroCategoria,
        filtros: {
          busqueda,
          filtroPrioridad,
          filtroCategoria,
        },
      }}
    >
      {children}
    </ContextoTareas.Provider>
  );
}
