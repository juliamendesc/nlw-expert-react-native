import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { Input } from '@/components/input';
import { LinkButton } from '@/components/link-button';
import { Product } from '@/components/product';
import { useCartStore } from '@/stores/cart-store';
import { ProductProps } from '@/utils/data/products';
import { formatCurrency } from '@/utils/functions/format-currency';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, View, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from 'tailwindcss/colors';

const PHONE_NUMBER = process.env.EXPO_PUBLIC_PHONE_NUMBER;

export default function Cart() {
	const cartStore = useCartStore();
	const navigation = useNavigation();
	const [address, setAddress] = useState('');

	const total = formatCurrency(
		cartStore.products.reduce(
			(acc, product) => acc + product.price * product.quantity,
			0,
		),
	);

	function handleAddToCart(product: ProductProps) {
		cartStore.addProductItem(product);
	}

	function handleProductRemove(product: ProductProps) {
		Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
			{
				text: 'Cancelar',
				style: 'cancel',
			},
			{
				text: 'Remover',
				onPress: () => cartStore.removeProductItem(product.id),
			},
		]);
	}

	function handleClearProducts() {
		Alert.alert(
			'Remover todos',
			'Deseja remover todos os produtos do carrinho?',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'Remover',
					onPress: () => cartStore.clearCart(),
				},
			],
		);
	}

	function handleClearOneProduct(product: ProductProps) {
		Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
			{
				text: 'Cancelar',
				style: 'cancel',
			},
			{
				text: 'Remover',
				onPress: () => cartStore.removeProductFromCart(product.id),
			},
		]);
	}

	function handleOrder() {
		if (address.trim().length === 0) {
			Alert.alert('Pedido', 'Informe os dados da entrega.');
			return;
		}

		const products = cartStore.products
			.map((product) => `\n ${product.quantity} - ${product.title}`)
			.join('');

		const message = `🍔 NOVO PEDIDO\n
			Entregar em: ${address}\n\n
			${products}\n\n
			Total: ${total}`;

		Alert.alert('Pedido realizado com sucesso');
		Linking.openURL(
			`https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
		);
		cartStore.clearCart();
		navigation.goBack();
	}

	return (
		<View className='flex-1 pt-8 pb-4'>
			<Header title='Seu carrinho' />
			<KeyboardAwareScrollView>
				<ScrollView>
					<View className='p-5 flex-1'>
						{cartStore.products.length > 0 ? (
							<View className='border-b border-slate-700'>
								{cartStore.products.map((product) => (
									<View className='flex-row justify-between'>
										<View className='w-3/4'>
											<Product key={product.id} data={product} />
										</View>
										<View className='flex-col gap-3 justify-between pb-4 items-center'>
											<Feather
												name='plus-circle'
												size={20}
												color={colors.slate[100]}
												onPress={() => handleAddToCart(product)}
											/>
											<Feather
												name='minus-circle'
												size={20}
												color={colors.slate[100]}
												onPress={() => handleProductRemove(product)}
											/>
											<Feather
												name='trash-2'
												size={20}
												color={colors.red[400]}
												onPress={() => handleClearOneProduct(product)}
											/>
										</View>
									</View>
								))}
							</View>
						) : (
							<Text className='text-slate-400 font-body my-8 text-center'>
								Seu carrinho está vazio
							</Text>
						)}

						<View className='flex-row gap-2 items-center mt-5 mb-4'>
							<Text className='text-white text-xl font-subtitle'>Total:</Text>
							<Text className='text-lime-400 text-2xl font-heading'>
								{total}
							</Text>
						</View>

						<Input
							placeholder='Informe o endereço completo para a entrega'
							onChangeText={setAddress}
							blurOnSubmit
							onSubmitEditing={handleOrder}
							returnKeyType='next'
						/>
					</View>
				</ScrollView>
			</KeyboardAwareScrollView>

			<View className='p-5 gap-5'>
				<Button onPress={handleOrder}>
					<Button.Text>Finalizar pedido</Button.Text>
					<Button.Icon>
						<Feather name='arrow-right-circle' size={20} />
					</Button.Icon>
				</Button>
			</View>

			<LinkButton title='Voltar ao cardápio' href='/' />
		</View>
	);
}
