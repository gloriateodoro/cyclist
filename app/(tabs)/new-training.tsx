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
      // Load existing trainings
      const storedTrainings = await AsyncStorage.getItem('trainings');
      const trainings = storedTrainings ? JSON.parse(storedTrainings) : [];
      
      // Add new training
      trainings.push(data);
      
      // Save updated trainings
      await AsyncStorage.setItem('trainings', JSON.stringify(trainings));
      
      // Go back to initial screen
      router.back();
    } catch (error) {
      console.error('Error saving training:', error);
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