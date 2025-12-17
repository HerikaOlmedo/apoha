import { useContext, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { ContextoAutenticacion } from '../contextos/ContextoAutenticacion';
import { crearTarea } from '../servicios/ServicioTareas';

export function PantallaCrearEditarTarea() {
  const { usuario } = useContext(ContextoAutenticacion);
  const [titulo, setTitulo] = useState('');

  async function guardar() {
    if (!titulo || !usuario) return;
    await crearTarea(titulo, usuario.uid);
    setTitulo('');
  }

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Nueva tarea"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Agregar tarea" onPress={guardar} />
    </View>
  );
}
