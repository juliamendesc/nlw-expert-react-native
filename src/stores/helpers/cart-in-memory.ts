import { ProductCartProps } from '@/stores/cart-store';
import { ProductProps } from '@/utils/data/products';

export function addProduct(
	products: ProductCartProps[],
	newProduct: ProductProps,
) {
	const existingProduct = products.find(
		(product) => product.id === newProduct.id,
	);

	if (existingProduct) {
		return products.map((product) =>
			product.id === newProduct.id
				? { ...product, quantity: product.quantity + 1 }
				: product,
		);
	}

	return [
		...products,
		{
			...newProduct,
			quantity: 1,
		},
	];
}

export function removeProduct(
	products: ProductCartProps[],
	selectedProduct: ProductProps,
) {
	const existingProduct = products.find(
		(product) => product.id === selectedProduct.id,
	);

	if (existingProduct) {
		if (existingProduct.quantity === 1) {
			return products.filter((product) => product.id !== selectedProduct.id);
		}

		return products.map((product) =>
			product.id === selectedProduct.id
				? { ...product, quantity: product.quantity - 1 }
				: product,
		);
	}

	return [
		...products,
		{
			...selectedProduct,
			quantity: 1,
		},
	];
}
