import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { ProveedorAutenticacion } from '../../contextos/ContextoAutenticacion';
import { ProveedorTareas } from '../../contextos/ContextoTareas';

export default function LayoutTabs() {
  const esquemaColor = useColorScheme();
  const esOscuro = esquemaColor === 'dark';

  return (
    <ProveedorAutenticacion>
      <ProveedorTareas>
        <Tabs
          screenOptions={{
            headerShown: true,

            /* =====================
               HEADER
            ====================== */
            headerStyle: {
              backgroundColor: esOscuro ? '#0D47A1' : '#1A237E', // Mejor contraste
              shadowColor: '#000', // Sombra para profundidad
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5, // Para Android
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: '700', // Más énfasis
              fontSize: 18,
            },
            headerLeft: () => ( // Icono opcional para identidad
              <Ionicons name="apps-outline" size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
            ),

            /* =====================
               TAB BAR
            ====================== */
            tabBarStyle: {
              backgroundColor: esOscuro ? '#1E1E1E' : '#FFFFFF', // Mejor separación
              borderTopColor: esOscuro ? '#333333' : '#E0E0E0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
              height: 60, // Mayor altura para mejor toque
            },
            tabBarActiveTintColor: esOscuro ? '#64B5F6' : '#2979FF', // Mejor visibilidad
            tabBarInactiveTintColor: esOscuro ? '#B0B0B0' : '#757575',
            tabBarShowLabel: true, // Mostrar etiquetas siempre
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },

            /* =====================
               UX
            ====================== */
            tabBarHideOnKeyboard: true,
          }}
        >
          {/* =========================
              TAB 1 — TAREAS
             ========================= */}
          <Tabs.Screen
            name="index"
            options={{
              title: 'Apoha',
              tabBarLabel: 'Tareas',
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="checkmark-circle-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          {/* =========================
              TAB 2 — ESTADÍSTICAS
             ========================= */}
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Estadísticas',
              tabBarLabel: 'Progreso',
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="stats-chart-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="archivo"
            options={{
              title: 'Archivo',
              tabBarLabel: 'Archivo',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="archive-outline" size={size} color={color} />
              ),
            }}
          />

        </Tabs>
      </ProveedorTareas>
    </ProveedorAutenticacion>
  );
}
