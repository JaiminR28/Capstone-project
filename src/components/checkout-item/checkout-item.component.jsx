import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../Contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	const { clearItemFromCart, addItemToCart, removeItemFromTheCart } =
		useContext(CartContext);

	const clearItemHandler = () => clearItemFromCart(cartItem);
	const addItemHandler = () => addItemToCart(cartItem);
	const removeItemHandler = () => removeItemFromTheCart(cartItem);

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={`${name}`}></img>
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={removeItemHandler}>
					&#10094;{" "}
				</div>
				<div className="value">{quantity}</div>
				<div className="arrow" onClick={addItemHandler}>
					{" "}
					&#10095;{" "}
				</div>
			</span>
			<span className="price">{price}</span>
			<div className="remove-button" onClick={clearItemHandler}>
				&#x2716;
			</div>
		</div>
	);
};

export default CheckoutItem;
