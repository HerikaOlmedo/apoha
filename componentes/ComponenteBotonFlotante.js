import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

export function ComponenteBotonFlotante({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2979FF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
      }}
      accessibilityRole="button"
      accessibilityLabel="Crear nueva tarea"
    >
      <Ionicons name="add" size={28} color="#FFFFFF" />
    </Pressable>
  );
}
