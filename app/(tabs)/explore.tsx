import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { EventCarousel } from '@/components/EventCarousel';

const upcomingEvents = [
  {
    id: '1',
    image: require('@/assets/images/pedal1.webp'),
    title: 'DESAFIO 60KM PEDAL NA SERRA ',
    description: 'Um pedal desafiador pela serra, com paisagens incríveis e muita adrenalina.',
    location: 'Sobradinho - DF',
    date: '15/05/2026',
  },
  {
    id: '2',
    image: require('@/assets/images/pedal-curitiba.jpg'),
    title: 'Tour Urbano',
    description: 'Pedal noturno pela cidade, com paradas em pontos turísticos e muita diversão.',
    location: 'Curitiba, PR',
    date: '20/06/2025',
  },
  {
    id: '3',
    image: require('@/assets/images/pedal-mexico.webp'),
    title: 'Cicloturismo no México',
    description: 'Un cicloviaje a los confines de América',
    location: ' Isla Mujeres - México',
    date: '25/11/2025',
  },
];

export default function ExploreScreen() {
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
          <ThemedText type="title" style={styles.titleText}>Acontecendo Agora</ThemedText>
          <ThemedText style={styles.subtitle}>Pedais acontecendo na América Latina</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.carouselContainer}>
          <EventCarousel items={upcomingEvents} />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleContainer: {
    marginBottom: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: '#666666',
    textAlign: 'center',
  },
  carouselContainer: {
    ...Platform.select({
      web: {
        maxWidth: 1200,
        marginHorizontal: 'auto',
      },
    }),
  },
});
