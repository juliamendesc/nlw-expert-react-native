import { ProductProps } from '@/utils/data/products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as cartInMemory from './helpers/cart-in-memory';

export type ProductCartProps = ProductProps & {
	quantity: number;
};

type StateProps = {
	products: ProductCartProps[];
	addProductItem: (product: ProductProps) => void;
	removeProductItem: (productId: string) => void;
	removeProductFromCart: (productId: string) => void;
	clearCart: () => void;
};

export const useCartStore = create(
	persist<StateProps>(
		(set) => ({
			products: [],
			addProductItem: (product: ProductProps) => {
				set((state) => ({
					products: cartInMemory.addProduct(state.products, product),
				}));
			},
			removeProductItem: (productId: string) => {
				set((state) => ({
					products: cartInMemory.removeProduct(state.products, productId),
				}));
			},
			clearCart: () => {
				set({ products: [] });
			},
			removeProductFromCart: (productId: string) => {
				set((state) => ({
					products: cartInMemory.removeProductById(state.products, productId),
				}));
			},
		}),
		{
			name: 'cart-store',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
