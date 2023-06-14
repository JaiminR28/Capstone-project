import { createContext, useReducer } from "react";

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

const clearCartItem = (cartItems, cartItemToRemove) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromTheCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

const INITIAL_STATE = {
	isCartOpen: true,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "SET_CART_ITEMS": {
			return {
				...state,
				...payload,
			};
		}
		default:
			throw new Error(`unhandeled typr of ${type} in cart`);
	}
};

export const CartProvider = ({ children }) => {
	const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
		useReducer(cartReducer, INITIAL_STATE);

	const updateCartItemsReducer = (newCartItems) => {
		/* generate new cartTotal*/
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		// generate new cartCount
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		// dispatch new actions with payload  = { newCartItems, newCartTotal, newCartCount }
		dispatch({
			type: "SET_CART_ITEMS",
			payload: {
				cartItems: newCartItems,
				cartTotal: newCartTotal,
				cartCount: newCartCount,
			},
		});
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};
	const removeItemFromTheCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const clearItemFromCart = (cartItemToRemove) => {
		const newCartItems = clearCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const value = {
		isCartOpen,
		setIsCartOpen: () => {},
		addItemToCart,
		cartItems,
		removeItemFromTheCart,
		clearItemFromCart,
		cartCount,
		cartTotal,
	};
	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
