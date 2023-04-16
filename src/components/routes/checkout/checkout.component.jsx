import "./checkout.styles.scss";

import { CartContext } from "../../../Contexts/cart.context";
import { useContext } from "react";

const Checkout = () => {
	const { cartItems, addItemToCart, removeItemFromTheCart } =
		useContext(CartContext);
	return (
		<div>
			<h1>I'm a checkout page</h1>
			<div>
				{cartItems.map((Item) => {
					const { id, name, quantity } = Item;
					return (
						<div key={id}>
							<h2>{name}</h2>
							<span>{quantity}</span>
							<br />
							<span onClick={() => addItemToCart(Item)}>
								Increment
							</span>
							<br></br>
							<span onClick={() => removeItemFromTheCart(Item)}>
								Decrement
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Checkout;
