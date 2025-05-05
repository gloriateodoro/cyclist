import { Image, StyleSheet, Platform, ScrollView, Alert, View } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Bicycle } from '@/components/Bicycle';
import { AddTrainingButton } from '@/components/AddTrainingButton';
import { TrainingCard } from '@/components/TrainingCard';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Training {
  date: string;
  distance: string;
  time: string;
  notes: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [trainings, setTrainings] = useState<Training[]>([]);

  const loadTrainings = useCallback(async () => {
    try {
      const storedTrainings = await AsyncStorage.getItem('trainings');
      if (storedTrainings) {
        const parsedTrainings = JSON.parse(storedTrainings);
        setTrainings(parsedTrainings);
      } else {
        setTrainings([]);
      }
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
      setTrainings([]);
    }
  }, []);

  const handleDeleteTraining = useCallback(async (indexToDelete: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este treino?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const newTrainings = trainings.filter((_, index) => index !== indexToDelete);
              console.log(newTrainings, "New Trainingssss!!!!!");
              await AsyncStorage.setItem('trainings', JSON.stringify(newTrainings));
              setTrainings(newTrainings);
            } catch (error) {
              console.error('Erro ao excluir treino:', error);
              Alert.alert('Erro', 'Não foi possível excluir o treino. Tente novamente.');
            }
          },
        },
      ]
    );
  }, [trainings]); // Removi loadTrainings daqui

  useFocusEffect(
    useCallback(() => {
      loadTrainings();
    }, [loadTrainings])
  );

  const handleAddTraining = () => {
    router.push('/new-training');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FDFDFC', dark: '#FDFDFC' }}
      headerImage={
        <Image
          source={require('@/assets/images/cyclist-men.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.contentContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Meu Pedal</ThemedText>
          <Bicycle />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Aqui você pode registrar seus pedais de forma rápida e fácil, sem precisar de internet.</ThemedText>
          <ThemedText>Acompanhe sua evolução e veja o quanto você já pedalou!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Comece agora:</ThemedText>
          <ThemedView style={styles.buttonContainer}>
            <AddTrainingButton onPress={handleAddTraining} />
          </ThemedView>
        </ThemedView>

        {trainings.length > 0 && (
          <ThemedView style={styles.trainingsContainer}>
            <ThemedText type="subtitle" style={styles.trainingsTitle}>Seus Treinos</ThemedText>
            <View style={styles.trainingsGrid}>
              {trainings.map((training, index) => (
                <TrainingCard
                  key={index}
                  date={training.date}
                  distance={training.distance}
                  time={training.time}
                  notes={training.notes}
                  onDelete={() => handleDeleteTraining(index)}
                />
              ))}
            </View>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    ...Platform.select({
      web: {
        maxWidth: 1200,
        marginHorizontal: 'auto',
      },
    }),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 24,
  },
  buttonContainer: {
    ...Platform.select({
      web: {
        maxWidth: 400,
        alignSelf: 'center',
      },
    }),
  },
  headerImage: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  trainingsContainer: {
    marginTop: 20,
    width: '100%',
  },
  trainingsTitle: {
    marginBottom: 12,
  },
  trainingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'flex-start',
    ...Platform.select({
      web: {
        maxWidth: 1200,
        marginHorizontal: 'auto',
      },
    }),
  },
});