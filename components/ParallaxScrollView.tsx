import { StyleSheet, useWindowDimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ParallaxScrollViewProps {
  children: React.ReactNode;
  headerBackgroundColor: { light: string; dark: string };
  headerImage: React.ReactNode;
}

export function ParallaxScrollView({
  children,
  headerBackgroundColor,
  headerImage,
}: ParallaxScrollViewProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.header,
          {
            backgroundColor: headerBackgroundColor[colorScheme ?? 'light'],
            paddingTop: insets.top,
          },
        ]}>
        {headerImage}
      </ThemedView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {children}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 200,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});
