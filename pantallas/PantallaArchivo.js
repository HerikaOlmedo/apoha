import { useContext, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import { ComponenteTarea } from '../componentes/ComponenteTarea';
import { ContextoAutenticacion } from '../contextos/ContextoAutenticacion';
import { escucharTareasArchivadas, restaurarTarea } from '../servicios/ServicioTareas';

export function PantallaArchivo() {
  const { usuario } = useContext(ContextoAutenticacion);
  const [tareasArchivadas, setTareasArchivadas] = useState([]);

  useEffect(() => {
    if (!usuario) return;
    const unsub = escucharTareasArchivadas(usuario.uid, setTareasArchivadas);
    return () => unsub();
  }, [usuario]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '800',
          color: '#1A237E',
          marginBottom: 12,
        }}
      >
        Tareas archivadas
      </Text>

      <FlatList
        data={tareasArchivadas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <ComponenteTarea
              tarea={item}
              alMarcarCompletada={() => {}}
              alArchivar={() => {}}
            />

            <Pressable
              onPress={() => restaurarTarea(item.id)}
              style={{
                marginTop: 6,
                alignSelf: 'flex-end',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: '#E3F2FD',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: '#2979FF',
                }}
              >
                Restaurar
              </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#757575', marginTop: 40 }}>
            No hay tareas archivadas
          </Text>
        }
      />
    </View>
  );
}
