import { Switch, Text, View } from 'react-native';
import { alternarCompletada } from '../servicios/ServicioTareas';

export function ComponenteTarea({ tarea }) {
  return (
    <View
      style={{
        padding: 12,
        marginBottom: 8,
        borderRadius: 6,
        backgroundColor: tarea.completada ? '#C8E6C9' : '#E3F2FD',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          textDecorationLine: tarea.completada ? 'line-through' : 'none',
        }}
      >
        {tarea.titulo}
      </Text>

      <Switch
        value={tarea.completada}
        onValueChange={(v) => alternarCompletada(tarea.id, v)}
      />
    </View>
  );
}
