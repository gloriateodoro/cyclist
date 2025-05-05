import { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useRouter } from 'expo-router';

interface TrainingFormProps {
  onSubmit: (data: {
    date: string;
    distance: string;
    time: string;
    notes: string;
  }) => void;
}

export function TrainingForm({ onSubmit }: TrainingFormProps) {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleDateChange = (text: string) => {
    // Remove todos os caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');
    
    // Aplica a máscara DD/MM/AAAA
    let formatted = '';
    if (cleaned.length > 0) {
      formatted = cleaned.slice(0, 2);
      if (cleaned.length > 2) {
        formatted += '/' + cleaned.slice(2, 4);
        if (cleaned.length > 4) {
          formatted += '/' + cleaned.slice(4, 8);
        }
      }
    }
    
    setDate(formatted);
  };

  const handleSubmit = () => {
    onSubmit({ date, distance, time, notes });
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Novo Treino</ThemedText>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <ThemedText style={styles.closeButtonText}>X</ThemedText>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Data</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={date}
          onChangeText={handleDateChange}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Distância (km)</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ex: 20"
          value={distance}
          onChangeText={setDistance}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Tempo</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1:30"
          value={time}
          onChangeText={setTime}
        />
      </View>

      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Observações</ThemedText>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Adicione observações sobre o treino"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <ThemedText style={styles.submitButtonText}>Salvar Treino</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 