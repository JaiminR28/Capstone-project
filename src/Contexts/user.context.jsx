import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { onAuthChangeListener } from "../utils/firebase/firebase.utils";

// As the actual value you want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const Userprovider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
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
