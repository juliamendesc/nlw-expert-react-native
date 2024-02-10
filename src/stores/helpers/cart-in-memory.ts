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

export function removeProduct(products: ProductCartProps[], productId: string) {
	const updatedProducts = products.map((product) =>
		product.id === productId
			? {
					...product,
					quantity: product.quantity > 1 ? product.quantity - 1 : 0,
			  }
			: product,
	);

	return updatedProducts.filter((product) => product.quantity > 0);
}

export function removeProductById(
	products: ProductCartProps[],
	productId: string,
) {
	return products.filter((product) => product.id !== productId);
}
