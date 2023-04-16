import { createContext, useEffect, useState } from "react";
import ProductCard from "../components/product-card/product-card.component";

const addCartItem = (cartItems, productToAdd) => {
	//  finds if cartItem contains productToAdd
	const exsistingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	// If found  increment quantity
	if (exsistingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// return new array with modified cardItems/ new to cart
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	//find the cart item to be removed
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);
	//check if  the qunatity is 1, if it is decremented remove the item from the cart
	if (existingCartItem.quantity === 1) {
		return cartItems.filter(
			(cartItem) => cartItem.id !== cartItemToRemove.id
		);
	}
	// return back  cartItem with the matching cart item with reduces Item
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromTheCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItem] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItem(addCartItem(cartItems, productToAdd));
	};
	const removeItemFromTheCart = (cartItemToRemove) => {
		setCartItem(removeCartItem(cartItems, cartItemToRemove));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		removeItemFromTheCart,
		cartCount,
	};
	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
