import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const imageWidth = (screenWidth - 60) / 2; // 20px padding on sides, 20px gap between

interface ImageItem {
  id: string;
  url: string;
  height: number;
}

const imageData: ImageItem[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=600',
    height: 280,
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    height: 200,
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=500',
    height: 240,
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=600',
    height: 300,
  },
];

export function ImageGrid() {
  // Split images into two columns for masonry layout
  const leftColumn: ImageItem[] = [];
  const rightColumn: ImageItem[] = [];
  
  imageData.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  const renderColumn = (items: ImageItem[]) => (
    <View style={styles.column}>
      {items.map((item) => (
        <TouchableOpacity key={item.id} style={styles.imageContainer}>
          <Image
            source={{ uri: item.url }}
            style={[styles.image, { height: item.height }]}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderColumn(leftColumn)}
      {renderColumn(rightColumn)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 20,
  },
  column: {
    flex: 1,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    backgroundColor: '#F3F4F6',
  },
});