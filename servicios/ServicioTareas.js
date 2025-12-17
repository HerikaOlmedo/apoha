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

export async function crearTarea(titulo, usuarioId) {
  await addDoc(collection(db, COLECCION), {
    titulo,
    categoria: 'Personal',
    prioridad: 'Media',
    completada: false,
    archivada: false,
    usuarioId,
    creadaEn: Timestamp.now(),
  });
}

export function escucharTareas(usuarioId, callback) {
  const q = query(
    collection(db, COLECCION),
    where('usuarioId', '==', usuarioId)
  );

  return onSnapshot(q, (snap) => {
    const tareas = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(tareas);
  });
}

export async function alternarCompletada(id, valor) {
  await updateDoc(doc(db, COLECCION, id), {
    completada: valor,
  });
}
