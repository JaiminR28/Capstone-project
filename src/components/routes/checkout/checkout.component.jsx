import "./checkout.styles.scss";

import { CartContext } from "../../../Contexts/cart.context";
import CheckoutItem from "../../checkout-item/checkout-item.component";

import { useContext } from "react";

const Checkout = () => {
	const { cartItems, cartTotal } = useContext(CartContext);
	return (
		<div className="checkout-container">
			<h1>I'm a checkout page</h1>
			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Description</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map((Item) => {
				return <CheckoutItem key={Item.id} cartItem={Item} />;
			})}
			<span className="total">Total : &#8377; {cartTotal}</span>
		</div>
	);
};

export default Checkout;
