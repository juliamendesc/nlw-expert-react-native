import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { View, FlatList } from 'react-native';
import { CATEGORIES } from '@/utils/data/products';
import { useState } from 'react';

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState<string>(
		CATEGORIES[0],
	);

	function handleSelectedCategory(category: string) {
		setSelectedCategory(category);
	}

	return (
		<View className='flex-1 pt-10'>
			<Header title='Cardápio' cartQuantityItems={1} />

			<FlatList
				data={CATEGORIES}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<CategoryButton
						title={item}
						isSelected={item === selectedCategory}
						onPress={() => handleSelectedCategory(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				className='max-h-10 mt-5'
				contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
			/>
		</View>
	);
}
