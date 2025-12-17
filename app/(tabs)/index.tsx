import { View } from 'react-native';
import { PantallaCrearEditarTarea } from '../../pantallas/PantallaCrearEditarTarea';
import { PantallaListaTareas } from '../../pantallas/PantallaListaTareas';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <PantallaCrearEditarTarea />
      <PantallaListaTareas />
    </View>
  );
}
