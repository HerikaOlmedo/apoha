import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { ProveedorAutenticacion } from '../../contextos/ContextoAutenticacion';

export default function LayoutTabs() {
  const esquemaColor = useColorScheme();

  const esOscuro = esquemaColor === 'dark';

  return (
    <ProveedorAutenticacion>
      <Tabs
        screenOptions={{
          headerShown: true,

          /* Header */
          headerStyle: {
            backgroundColor: '#1A237E',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },

          /* Tab bar */
          tabBarStyle: {
            backgroundColor: esOscuro ? '#121212' : '#FFFFFF',
            borderTopColor: esOscuro ? '#1F1F1F' : '#E0E0E0',
          },
          tabBarActiveTintColor: '#2979FF',
          tabBarInactiveTintColor: esOscuro ? '#9E9E9E' : '#757575',

          /* UX */
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
              <Ionicons name="checkmark-circle-outline" size={size} color={color} />
            ),
          }}
        />

        {/* =========================
            TAB 2 — ESTADÍSTICAS
            (se implementa luego)
           ========================= */}
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Estadísticas',
            tabBarLabel: 'Progreso',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ProveedorAutenticacion>
  );
}
