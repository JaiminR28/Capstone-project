import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../Contexts/cart.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
	CartDropDownContainer,
	CartItems,
	EmptyMessage,
	cartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const goToCheckouthandler = () => {
		navigate("/checkout");
	};

	return (
		<CartDropDownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => (
						<CartItem key={item.id} cartItem={item} />
					))
				) : (
					<EmptyMessage>Your Cart is Empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckouthandler}>GO TO CHECKOUT </Button>
		</CartDropDownContainer>
	);
};

export default CartDropdown;
