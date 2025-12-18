import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { CATEGORIAS, PRIORIDADES } from '../utilidades/filtros';

function Chip({ texto, activo, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: activo ? '#2979FF' : '#E0E0E0',
        backgroundColor: activo ? '#E3F2FD' : '#FFFFFF',
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: activo ? '#2979FF' : '#616161',
        }}
      >
        {texto}
      </Text>
    </Pressable>
  );
}

export function ComponenteFiltro({
  filtroCategoria,
  filtroPrioridad,
  alCambiarCategoria,
  alCambiarPrioridad,
  alLimpiar,
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '800',
          color: '#1A237E',
          marginBottom: 6,
        }}
      >
        Categoría
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Chip texto="Todas" activo={!filtroCategoria} onPress={() => alCambiarCategoria(null)} />
        {CATEGORIAS.map((c) => (
          <Chip
            key={c}
            texto={c}
            activo={filtroCategoria === c}
            onPress={() => alCambiarCategoria(c)}
          />
        ))}
      </View>

      <Text
        style={{
          fontSize: 12,
          fontWeight: '800',
          color: '#1A237E',
          marginTop: 8,
          marginBottom: 6,
        }}
      >
        Prioridad
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip texto="Todas" activo={!filtroPrioridad} onPress={() => alCambiarPrioridad(null)} />
        {PRIORIDADES.map((p) => (
          <Chip
            key={p}
            texto={p}
            activo={filtroPrioridad === p}
            onPress={() => alCambiarPrioridad(p)}
          />
        ))}

        <View style={{ flex: 1 }} />

        <Chip texto="Limpiar" activo={false} onPress={alLimpiar} />
      </View>
    </View>
  );
}
