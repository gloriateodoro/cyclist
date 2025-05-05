import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import { TrainingForm } from '@/components/TrainingForm';
import { ThemedView } from '@/components/ThemedView';

export default function NewTrainingScreen() {
  const router = useRouter();

  const handleSubmit = async (data: {
    date: string;
    distance: string;
    time: string;
    notes: string;
  }) => {
    try {
      // Carrega os treinos existentes
      const storedTrainings = await AsyncStorage.getItem('trainings');
      const trainings = storedTrainings ? JSON.parse(storedTrainings) : [];
      
      // Adiciona o novo treino
      trainings.push(data);
      
      // Salva os treinos atualizados
      await AsyncStorage.setItem('trainings', JSON.stringify(trainings));
      
      // Volta para a tela inicial
      router.back();
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TrainingForm onSubmit={handleSubmit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 