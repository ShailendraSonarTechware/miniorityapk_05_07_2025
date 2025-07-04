// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import { Search as SearchIcon, TrendingUp } from 'lucide-react-native';
// import { ImageGrid } from '@/app/components/ImageGrid';

// export default function SearchTab() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('all');

//   const categories = [
//     { id: 'all', name: 'All', count: '2.1M' },
//     { id: 'nature', name: 'Nature', count: '456K' },
//     { id: 'fashion', name: 'Fashion', count: '234K' },
//     { id: 'food', name: 'Food', count: '189K' },
//     { id: 'tech', name: 'Technology', count: '167K' },
//   ];

//   const trendingSearches = [
//     'Modern furniture',
//     'Minimalist design',
//     'Street fashion',
//     'Healthy recipes',
//     'Workspace setup',
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Search</Text>
//         <View style={styles.searchContainer}>
//           <SearchIcon size={20} color="#9CA3AF" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search for anything..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#9CA3AF"
//           />
//         </View>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         <View style={styles.categoriesContainer}>
//           <Text style={styles.sectionTitle}>Categories</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
//             {categories.map((category) => (
//               <TouchableOpacity
//                 key={category.id}
//                 style={[
//                   styles.categoryButton,
//                   activeCategory === category.id && styles.activeCategoryButton,
//                 ]}
//                 onPress={() => setActiveCategory(category.id)}>
//                 <Text
//                   style={[
//                     styles.categoryText,
//                     activeCategory === category.id && styles.activeCategoryText,
//                   ]}>
//                   {category.name}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.categoryCount,
//                     activeCategory === category.id && styles.activeCategoryCount,
//                   ]}>
//                   {category.count}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         <View style={styles.trendingContainer}>
//           <View style={styles.trendingHeader}>
//             <TrendingUp size={20} color="#E07B39" />
//             <Text style={styles.sectionTitle}>Trending Searches</Text>
//           </View>
//           {trendingSearches.map((search, index) => (
//             <TouchableOpacity key={index} style={styles.trendingItem}>
//               <Text style={styles.trendingText}>{search}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <ImageGrid />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   headerTitle: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#1F2937',
//     marginBottom: 16,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   searchIcon: {
//     marginRight: 12,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1F2937',
//   },
//   content: {
//     flex: 1,
//   },
//   categoriesContainer: {
//     paddingVertical: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 12,
//     paddingHorizontal: 20,
//   },
//   categoriesScroll: {
//     paddingLeft: 20,
//   },
//   categoryButton: {
//     backgroundColor: '#F9FAFB',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     marginRight: 12,
//     alignItems: 'center',
//   },
//   activeCategoryButton: {
//     backgroundColor: '#E07B39',
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#6B7280',
//   },
//   activeCategoryText: {
//     color: '#FFFFFF',
//   },
//   categoryCount: {
//     fontSize: 12,
//     color: '#9CA3AF',
//     marginTop: 2,
//   },
//   activeCategoryCount: {
//     color: '#FED7AA',
//   },
//   trendingContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   trendingHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   trendingItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   trendingText: {
//     fontSize: 16,
//     color: '#4B5563',
//   },
// });