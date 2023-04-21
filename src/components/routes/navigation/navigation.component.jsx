import { Fragment, useContext } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { UserContext } from "../../../Contexts/user.context";

import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { signOutUser } from "../../../utils/firebase/firebase.utils";

import CartIcon from "../../cart/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../../Contexts/cart.context";

import {
	NavigationContainer,
	LogoContainer,
	navLink,
	navLinkContainer,
	NavLinks,
} from "./navigation.styles";
// import "./navigation.styles.scss";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);
	// console.log(currentUser);

	const signOutHandler = async () => {
		await signOutUser();
	};

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo />
				</LogoContainer>
				<NavLinks className="nav-links-container">
					<NavLink className="nav-link" to="/shop">
						SHOP
					</NavLink>
					{currentUser ? (
						<NavLink as="span" onClick={signOutHandler}>
							sign out{" "}
						</NavLink>
					) : (
						<NavLink className="nav-link" to="/Auth ">
							Sign In
						</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>

			<Outlet />
		</Fragment>
	);
};

export default Navigation;
