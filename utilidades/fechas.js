import { Timestamp } from 'firebase/firestore';

export function convertirFecha(fechaFirestore) {
  if (!fechaFirestore) return null;

  if (fechaFirestore instanceof Date) {
    return fechaFirestore;
  }

  if (fechaFirestore instanceof Timestamp) {
    return fechaFirestore.toDate();
  }

  if (fechaFirestore.seconds) {
    return new Date(fechaFirestore.seconds * 1000);
  }

  return null;
}

export function esVencida(fecha) {
  const f = convertirFecha(fecha);
  if (!f) return false;
  return f.getTime() < new Date().getTime();
}

export function vencePronto(fecha, dias = 2) {
  const f = convertirFecha(fecha);
  if (!f) return false;

  const ahora = new Date();
  const diffMs = f.getTime() - ahora.getTime();
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  return diffDias >= 0 && diffDias <= dias;
}

export function formatearFechaCorta(fecha) {
  const f = convertirFecha(fecha);
  if (!f) return 'Sin fecha';

  const dd = String(f.getDate()).padStart(2, '0');
  const mm = String(f.getMonth() + 1).padStart(2, '0');
  const yyyy = f.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}
