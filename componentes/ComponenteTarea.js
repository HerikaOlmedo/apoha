import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import { esVencida, formatearFechaCorta, vencePronto } from '../utilidades/fechas';
import { colorPrioridad } from '../utilidades/filtros';

export function ComponenteTarea({ tarea, alMarcarCompletada, alArchivar }) {
  const color = colorPrioridad(tarea.prioridad);
  const vencida = tarea.fechaLimite ? esVencida(tarea.fechaLimite) && !tarea.completada : false;
  const pronto =
    tarea.fechaLimite && !vencida && !tarea.completada
      ? vencePronto(tarea.fechaLimite, 2)
      : false;

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: vencida ? '#FF5252' : '#E0E0E0',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* Título + switch */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: '700',
            color: '#1A237E',
            textDecorationLine: tarea.completada ? 'line-through' : 'none',
          }}
          numberOfLines={1}
        >
          {tarea.titulo}
        </Text>

        <Switch value={!!tarea.completada} onValueChange={(v) => alMarcarCompletada(tarea.id, v)} />
      </View>

      {/* Info */}
      <Text style={{ marginTop: 6, fontSize: 12, color: '#616161' }}>
        {tarea.categoria} • {tarea.prioridad} • {formatearFechaCorta(tarea.fechaLimite)}
      </Text>

      {vencida && (
        <Text style={{ marginTop: 6, fontSize: 12, color: '#FF5252', fontWeight: '700' }}>
          Tarea vencida
        </Text>
      )}

      {pronto && (
        <Text style={{ marginTop: 6, fontSize: 12, color: '#FF6D00', fontWeight: '700' }}>
          Próxima a vencer
        </Text>
      )}

      {/* Acciones */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <View
          style={{
            backgroundColor: color,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>
            {tarea.prioridad}
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        <Pressable
          onPress={() => alArchivar(tarea.id)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
            backgroundColor: '#ECEFF1',
          }}
        >
          <Ionicons name="archive-outline" size={16} color="#37474F" />
          <Text
            style={{
              marginLeft: 6,
              fontSize: 12,
              fontWeight: '700',
              color: '#37474F',
            }}
          >
            Archivar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
