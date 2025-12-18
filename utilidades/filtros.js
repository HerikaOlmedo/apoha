export const CATEGORIAS = [
  'Escuela',
  'Trabajo',
  'Personal',
];

export const PRIORIDADES = [
  'Alta',
  'Media',
  'Baja',
];

export function colorPrioridad(prioridad) {
  switch (prioridad) {
    case 'Alta':
      return '#D32F2F';
    case 'Media':
      return '#F9A825';
    case 'Baja':
      return '#388E3C'; 
    default:
      return '#757575';
  }
}
