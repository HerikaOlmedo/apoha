import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    query,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from './ServicioFirebase';

const COLECCION = 'tareas';

export async function crearTareaAvanzada(tarea, usuarioId) {
  await addDoc(collection(db, COLECCION), {
    titulo: tarea.titulo,
    categoria: tarea.categoria || 'Personal',
    prioridad: tarea.prioridad || 'Media',
    fechaLimite: tarea.fechaLimite ? Timestamp.fromDate(tarea.fechaLimite) : null,
    completada: false,
    archivada: false,
    usuarioId,
    creadaEn: Timestamp.now(),
  });
}

export function escucharTareasActivas(usuarioId, callback) {
  const q = query(
    collection(db, COLECCION),
    where('usuarioId', '==', usuarioId),
    where('archivada', '==', false)
  );

  return onSnapshot(q, (snap) => {
    const tareas = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
    }));
    callback(tareas);
  });
}

export function escucharTareasArchivadas(usuarioId, callback) {
  const q = query(
    collection(db, COLECCION),
    where('usuarioId', '==', usuarioId),
    where('archivada', '==', true)
  );

  return onSnapshot(q, (snap) => {
    const tareas = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
    }));
    callback(tareas);
  });
}

export async function alternarCompletada(id, valor) {
  await updateDoc(doc(db, COLECCION, id), {
    completada: valor,
  });
}

export async function archivarTarea(id) {
  await updateDoc(doc(db, COLECCION, id), {
    archivada: true,
  });
}

export async function restaurarTarea(id) {
  await updateDoc(doc(db, COLECCION, id), {
    archivada: false,
  });
}
