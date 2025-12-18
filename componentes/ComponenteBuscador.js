import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

export function ComponenteBuscador({ valor, alCambiar }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 12,
      }}
    >
      <Ionicons name="search-outline" size={18} color="#616161" />
      <TextInput
        value={valor}
        onChangeText={alCambiar}
        placeholder="Buscar tareas..."
        placeholderTextColor="#9E9E9E"
        style={{
          marginLeft: 10,
          flex: 1,
          fontSize: 14,
          color: '#212121',
        }}
      />
    </View>
  );
}
