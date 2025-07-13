import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchHeader = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      {/* <View style={[styles.container, { paddingTop: insets.top }]}> */}
      <View style={[styles.container]}> {/*upper line is same*/}
        <TouchableOpacity onPress={() => router.back()} style={styles.iconLeft}>
          <ChevronLeft size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <Search size={18} color="#000" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search  By Products, Services, Etc..."
            placeholderTextColor="#444"
            style={styles.input}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // backgroundColor: '#fff',
  },
  iconLeft: {
    marginRight: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 6,
    // paddingVertical: 6,
    height: 40,
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
});
