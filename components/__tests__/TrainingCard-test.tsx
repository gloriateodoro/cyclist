import { render, screen } from '@testing-library/react-native';
import { TrainingCard } from '../TrainingCard';

describe('TrainingCard', () => {
  const mockTraining = {
    date: '15/05/2024',
    distance: '20',
    time: '1:30',
    notes: 'Pedal noturno pela cidade',
  };

  it('renders training information correctly', () => {
    render(<TrainingCard {...mockTraining} onDelete={() => {}} />);

    // Verifica se todos os elementos estão presentes
    expect(screen.getByText('15/05/2024')).toBeTruthy();
    expect(screen.getByText('20 km')).toBeTruthy();
    expect(screen.getByText('Tempo: 1:30')).toBeTruthy();
    expect(screen.getByText('Pedal noturno pela cidade')).toBeTruthy();
  });

  it('handles missing notes correctly', () => {
    const trainingWithoutNotes = {
      ...mockTraining,
      notes: '',
    };

    render(<TrainingCard {...trainingWithoutNotes} onDelete={() => {}} />);

    // Verifica se os elementos básicos estão presentes
    expect(screen.getByText('15/05/2024')).toBeTruthy();
    expect(screen.getByText('20 km')).toBeTruthy();
    expect(screen.getByText('Tempo: 1:30')).toBeTruthy();
    
    // Verifica se as notas não estão presentes
    expect(screen.queryByText('Pedal noturno pela cidade')).toBeNull();
  });
}); 