import { Image, Text, View } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { PRODUCTS } from '@/utils/data/products';
import { formatCurrency } from '@/utils/functions/format-currency';
import { Button } from '@/components/button';
import { Feather } from '@expo/vector-icons';
import { LinkButton } from '@/components/link-button';
import { useCartStore } from '@/stores/cart-store';

export default function ProductDetails() {
	const cartStore = useCartStore();
	const navigation = useNavigation();
	const { id } = useLocalSearchParams();

	const product = PRODUCTS.find((product) => product.id === id);

	if (!product) return;

	function handleAddToCart() {
		if (!product) return;

		cartStore.addProduct(product);
		navigation.goBack();
	}

	return (
		<View className='flex-1'>
			<Image
				source={product.cover}
				className='w-full h-52'
				resizeMode='cover'
			/>

			<View className='p-5 mt-8 flex-1'>
				<Text className='text-lime-100 font-heading text-bold text-xl'>
					{product.title}
				</Text>
				<Text className='text-lime-400 font-heading text-2xl my-2'>
					{formatCurrency(product.price)}
				</Text>

				<Text className='text-slate-400 font-body text-base leading-6 mb-6'>
					{product.description}
				</Text>

				{product.ingredients.map((ingredient, index) => (
					<Text
						key={index}
						className='text-slate-400 font-body text-base leading-6'>
						{'\u2022 '}
						{ingredient}
					</Text>
				))}

				<View className='p-5 pb-8 gap-5'>
					<Button onPress={handleAddToCart}>
						<Button.Icon>
							<Feather name='plus-circle' size={20} />
						</Button.Icon>
						<Button.Text>Adicionar ao pedido</Button.Text>
					</Button>
				</View>

				<LinkButton href='/' title='Voltar ao cardápio' />
			</View>
		</View>
	);
}
