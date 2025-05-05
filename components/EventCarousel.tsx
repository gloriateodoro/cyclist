import { StyleSheet, Image, View, useWindowDimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useCarousel } from '@/hooks/useCarousel';
import { useEffect } from 'react';

interface EventCarouselProps {
  items: {
    id: string;
    image: any;
    title: string;
    description: string;
    location: string;
    date: string;
  }[];
}

export function EventCarousel({ items }: EventCarouselProps) {
  const { currentIndex, currentItem, nextSlide } = useCarousel(items);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.carousel}>
        <Image source={currentItem.image} style={styles.image} />
        <View style={styles.content}>
          <ThemedText type="title" style={styles.title}>{currentItem.title}</ThemedText>
          <ThemedText style={styles.description}>{currentItem.description}</ThemedText>
          <View style={styles.details}>
            <ThemedText style={styles.location}>📍 {currentItem.location}</ThemedText>
            <ThemedText style={styles.date}>📅 {currentItem.date}</ThemedText>
          </View>
        </View>
        <View style={styles.pagination}>
          {items.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  carousel: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
    minHeight: 200,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    color: '#333333',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  location: {
    fontSize: 14,
    color: '#4CAF50',
  },
  date: {
    fontSize: 14,
    color: '#666666',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#4CAF50',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
}); 