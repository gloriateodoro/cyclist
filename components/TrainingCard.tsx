import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface TrainingCardProps {
  date: string;
  distance: string;
  time: string;
  notes: string;
  onDelete: () => void;
}

export function TrainingCard({ date, distance, time, notes, onDelete }: TrainingCardProps) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.header}>
        <ThemedText style={styles.date}>{date}</ThemedText>
        <View style={styles.headerRight}>
          <ThemedText style={styles.distance}>{distance} km</ThemedText>
          {/* <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <ThemedText style={styles.deleteButtonText}>×</ThemedText>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.details}>
        <ThemedText style={styles.time}>Tempo: {time}</ThemedText>
        {notes && (
          <ThemedText style={styles.notes} numberOfLines={2}>
            {notes}
          </ThemedText>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    ...Platform.select({
      web: {
        width: '30%',
        minWidth: 300,
        maxWidth: 400,
      },
      default: {
        width: '100%',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  distance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  details: {
    gap: 4,
  },
  time: {
    fontSize: 14,
    color: '#666666',
  },
  notes: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
}); 