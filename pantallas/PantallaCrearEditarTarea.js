import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import { CATEGORIAS, PRIORIDADES } from '../utilidades/filtros';

export function PantallaCrearEditarTarea({
  visible,
  alCerrar,
  alGuardar,
  tareaEditar = null,
}) {
  const esEdicion = !!tareaEditar;

  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Personal');
  const [prioridad, setPrioridad] = useState('Media');
  const [fechaLimite, setFechaLimite] = useState(null);

  useEffect(() => {
    if (tareaEditar) {
      setTitulo(tareaEditar.titulo || '');
      setCategoria(tareaEditar.categoria || 'Personal');
      setPrioridad(tareaEditar.prioridad || 'Media');
      setFechaLimite(
        tareaEditar.fechaLimite?.seconds
          ? new Date(tareaEditar.fechaLimite.seconds * 1000)
          : tareaEditar.fechaLimite || null
      );
    } else {
      limpiarFormulario();
    }
  }, [tareaEditar, visible]);

  function limpiarFormulario() {
    setTitulo('');
    setCategoria('Personal');
    setPrioridad('Media');
    setFechaLimite(null);
  }

  function guardar() {
    if (!titulo.trim()) return;

    alGuardar({
      titulo,
      categoria,
      prioridad,
      fechaLimite,
      id: tareaEditar?.id,
    });

    limpiarFormulario();
    alCerrar();
  }

  function sumarDias(dias) {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + dias);
    setFechaLimite(hoy);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              color: '#1A237E',
              marginBottom: 12,
            }}
          >
            {esEdicion ? 'Editar tarea' : 'Nueva tarea'}
          </Text>

          {/* Título */}
          <TextInput
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Título de la tarea"
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
            }}
          />

          {/* Categoría */}
          <Text style={{ fontWeight: '700', marginBottom: 6 }}>
            Categoría
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {CATEGORIAS.map((c) => (
              <Chip
                key={c}
                texto={c}
                activo={categoria === c}
                onPress={() => setCategoria(c)}
              />
            ))}
          </View>

          {/* Prioridad */}
          <Text style={{ fontWeight: '700', marginTop: 12, marginBottom: 6 }}>
            Prioridad
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {PRIORIDADES.map((p) => (
              <Chip
                key={p}
                texto={p}
                activo={prioridad === p}
                onPress={() => setPrioridad(p)}
              />
            ))}
          </View>

          {/* Fecha rápida */}
          <Text style={{ fontWeight: '700', marginTop: 12 }}>
            Fecha límite
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <Chip texto="Hoy" activo={false} onPress={() => setFechaLimite(new Date())} />
            <Chip texto="+1 día" activo={false} onPress={() => sumarDias(1)} />
            <Chip texto="+3 días" activo={false} onPress={() => sumarDias(3)} />
            <Chip texto="+7 días" activo={false} onPress={() => sumarDias(7)} />
          </View>

          {fechaLimite && (
            <Text style={{ marginTop: 6, fontSize: 12, color: '#616161' }}>
              Fecha seleccionada: {fechaLimite.toLocaleDateString()}
            </Text>
          )}

          {/* Botones */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 16,
            }}
          >
            <Pressable onPress={alCerrar} style={{ marginRight: 12 }}>
              <Text style={{ color: '#757575', fontWeight: '700' }}>
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              onPress={guardar}
              style={{
                backgroundColor: '#2979FF',
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
                Guardar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
