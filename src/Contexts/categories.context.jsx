import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocument } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
	categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		const getCategoriesmap = async () => {
			const categoryMap = await getCategoriesAndDocument("categories");
			setCategoriesMap(categoryMap);
		};
		getCategoriesmap();
	}, []);

	const value = { categoriesMap };
	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
