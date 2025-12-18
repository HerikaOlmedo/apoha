import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

import { ContextoTareas } from '../../contextos/ContextoTareas';
import { esVencida } from '../../utilidades/fechas';

export default function PantallaEstadisticas() {
  const esquemaColor = useColorScheme();
  const esOscuro = esquemaColor === 'dark';

  // Fallback seguro para evitar null / never
  const contexto: any = useContext(ContextoTareas as any);
  const tareas: any[] = Array.isArray(contexto?.tareas)
    ? contexto.tareas
    : [];

  const total = tareas.length;
  const completadas = tareas.filter((t: any) => !!t?.completada).length;
  const pendientes = tareas.filter((t: any) => !t?.completada).length;
  const vencidas = tareas.filter(
    (t: any) => t?.fechaLimite && esVencida(t.fechaLimite) && !t?.completada
  ).length;

  const porcentaje =
    total === 0 ? 0 : Math.round((completadas / total) * 100);

  // Estado para sugerencia dinámica
  const [sugerencia, setSugerencia] = useState('¡Buen trabajo!');
  const [iconoSugerencia, setIconoSugerencia] = useState('thumbs-up-outline');

  // Función para generar sugerencia aleatoria
  const generarSugerencia = () => {
    const sugerenciasPorTipo: Record<string, Array<{ texto: string; icono: string }>> = {
      vencidas: [
        { texto: 'Tienes tareas vencidas. Priorízalas.', icono: 'warning-outline' },
        { texto: '¡No dejes que las tareas vencidas te detengan!', icono: 'alert-circle-outline' },
      ],
      pendientes: [
        { texto: 'Tienes tareas pendientes. Organiza tu día.', icono: 'time-outline' },
        { texto: '¡Completa tus pendientes para sentirte productivo!', icono: 'checkmark-done-outline' },
      ],
      completadas: [
        { texto: '¡Todas tus tareas están al día!', icono: 'checkmark-circle-outline' },
        { texto: '¡Excelente progreso! Sigue así.', icono: 'trophy-outline' },
      ],
      default: [
        { texto: '¡Buen trabajo!', icono: 'thumbs-up-outline' },
        { texto: 'Mantén el ritmo.', icono: 'rocket-outline' },
      ],
    };

    let tipo = 'default';
    if (vencidas > 0) tipo = 'vencidas';
    else if (pendientes > 0) tipo = 'pendientes';
    else if (total > 0) tipo = 'completadas';

    const opciones = sugerenciasPorTipo[tipo];
    const aleatoria = opciones[Math.floor(Math.random() * opciones.length)];
    setSugerencia(aleatoria.texto);
    setIconoSugerencia(aleatoria.icono);
  };

  // useEffect para recalcular sugerencia cuando cambien las tareas
  useEffect(() => {
    generarSugerencia();
  }, [total, completadas, pendientes, vencidas]);

  const colores = {
    fondo: esOscuro ? '#121212' : '#F5F5F5',
    tarjeta: esOscuro ? '#1E1E1E' : '#FFFFFF',
    textoPrimario: esOscuro ? '#FFFFFF' : '#1A237E',
    textoSecundario: esOscuro ? '#B0B0B0' : '#616161',
    acento: esOscuro ? '#64B5F6' : '#2979FF',
    borde: esOscuro ? '#333333' : '#E0E0E0',
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colores.fondo }}>
      {/* Título */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: '800',
          color: colores.textoPrimario,
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        Estadísticas de productividad
      </Text>

      {/* Tarjetas */}
      <Tarjeta titulo="Tareas totales" valor={total} icono="list-outline" colores={colores} />
      <Tarjeta titulo="Completadas" valor={completadas} icono="checkmark-circle-outline" colores={colores} />
      <Tarjeta titulo="Pendientes" valor={pendientes} icono="time-outline" colores={colores} />
      <Tarjeta titulo="Vencidas" valor={vencidas} icono="warning-outline" colores={colores} />

      {/* Barra de productividad */}
      <View style={{ marginTop: 24 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            marginBottom: 10,
            color: colores.textoPrimario,
          }}
        >
          Productividad
        </Text>

        <View
          style={{
            height: 20,
            backgroundColor: colores.borde,
            borderRadius: 10,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${porcentaje}%`,
              backgroundColor: colores.acento,
              borderRadius: 10,
            }}
          />
        </View>

        <Text
          style={{
            marginTop: 8,
            fontSize: 14,
            color: colores.textoSecundario,
            textAlign: 'center',
          }}
        >
          {porcentaje}% de tareas completadas
        </Text>
      </View>

      {/* Sugerencia inteligente */}
      <View
        style={{
          marginTop: 24,
          padding: 16,
          borderRadius: 16,
          backgroundColor: esOscuro ? '#1A237E' : '#E3F2FD',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name={iconoSugerencia as any} size={20} color={colores.acento} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colores.textoPrimario,
              marginLeft: 8,
            }}
          >
            Sugerencia inteligente
          </Text>
        </View>

        <Text
          style={{
            marginTop: 8,
            fontSize: 14,
            color: colores.textoSecundario,
          }}
        >
          {sugerencia}
        </Text>
      </View>
    </View>
  );
}

/* =========================
   COMPONENTE TARJETA
========================= */
function Tarjeta({
  titulo,
  valor,
  icono,
  colores,
}: {
  titulo: string;
  valor: number;
  icono: any;
  colores: any;
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colores.tarjeta,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colores.borde,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={icono} size={24} color={colores.acento} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontSize: 14, color: colores.textoSecundario }}>{titulo}</Text>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: colores.acento,
            }}
          >
            {valor}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
