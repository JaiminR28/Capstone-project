import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { onAuthChangeListener } from "../utils/firebase/firebase.utils";

// As the actual value you want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER ",
};

const userReducer = (state, action) => {
	console.log("dispatched");
	console.log("state:", state);

	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER: {
			return {
				...state,
				currentUser: payload,
			};
		}
		default:
			throw new Error(`Unhandled type ${type} in UserReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const Userprovider = ({ children }) => {
	// const [currentUser, setCurrentUser] = useState(null);
	const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
	console.log("currentUser: ", currentUser);
	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
	};
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthChangeListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);
	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};
