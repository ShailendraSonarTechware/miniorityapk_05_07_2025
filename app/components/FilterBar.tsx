import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

const FilterBar = () => {
  const filters = ['All', 'Price', 'Sort By', 'Offers Available', 'Best Seller'];
  const activeTags = ['Men', 'Shirts'];

  return (
    <>
      {/* Filter buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {filters.map((item, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text style={styles.filterText}>{item}</Text>
            {(item === 'Price' || item === 'Sort By') && (
              <ChevronDown size={12} color="#000" style={{ marginLeft: 4 }} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Active tags like "Men", "Shirts" */}
      <View style={styles.tagRow}>
        {activeTags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterText: {
    fontSize: 13,
    color: '#000',
  },
  tagRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 6,
  },
  tag: {
    backgroundColor: '#00BCD4',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  tagText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});
