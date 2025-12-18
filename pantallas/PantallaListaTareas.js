import React, { useContext, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { ContextoTareas } from '../contextos/ContextoTareas';

import { ComponenteBotonFlotante } from '../componentes/ComponenteBotonFlotante';
import { ComponenteBuscador } from '../componentes/ComponenteBuscador';
import { ComponenteFiltro } from '../componentes/ComponenteFiltro';
import { ComponenteTarea } from '../componentes/ComponenteTarea';

import { PantallaCrearEditarTarea } from './PantallaCrearEditarTarea';

export function PantallaListaTareas() {
  const {
    tareas,
    crearTarea,
    marcarCompletada,
    archivar,
    setBusqueda,
    setFiltroCategoria,
    setFiltroPrioridad,
    filtros,
  } = useContext(ContextoTareas);

  const [mostrarModal, setMostrarModal] = useState(false);

  function guardarTarea(datos) {
    crearTarea(datos);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Buscador */}
      <ComponenteBuscador
        valor={filtros.busqueda}
        alCambiar={setBusqueda}
      />

      {/* Filtros */}
      <ComponenteFiltro
        filtroCategoria={filtros.filtroCategoria}
        filtroPrioridad={filtros.filtroPrioridad}
        alCambiarCategoria={setFiltroCategoria}
        alCambiarPrioridad={setFiltroPrioridad}
        alLimpiar={() => {
          setFiltroCategoria(null);
          setFiltroPrioridad(null);
        }}
      />

      {/* Lista */}
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ComponenteTarea
            tarea={item}
            alMarcarCompletada={marcarCompletada}
            alArchivar={archivar}
          />
        )}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              marginTop: 40,
              color: '#757575',
            }}
          >
            No hay tareas aún
          </Text>
        }
      />

      {/* Botón flotante */}
      <ComponenteBotonFlotante
        onPress={() => setMostrarModal(true)}
      />

      {/* Modal crear tarea */}
      <PantallaCrearEditarTarea
        visible={mostrarModal}
        alCerrar={() => setMostrarModal(false)}
        alGuardar={guardarTarea}
      />
    </View>
  );
}
