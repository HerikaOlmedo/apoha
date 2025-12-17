import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ComponenteTarea } from '../componentes/ComponenteTarea';
import { ContextoAutenticacion } from '../contextos/ContextoAutenticacion';
import { escucharTareas } from '../servicios/ServicioTareas';

export function PantallaListaTareas() {
  const { usuario, cargando } = useContext(ContextoAutenticacion);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    if (!usuario) return;
    const unsub = escucharTareas(usuario.uid, setTareas);
    return () => unsub();
  }, [usuario]);

  if (cargando) return <Text>Cargando...</Text>;

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Mis tareas</Text>
      <FlatList
        data={tareas}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ComponenteTarea tarea={item} />}
      />
    </View>
  );
}
