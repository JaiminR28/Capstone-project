import { Routes, Route } from "react-router-dom";

import CategoryPreview from "../../category-preview/category-preview.component";

import "./shop.styles.scss";

import CategoriesPreview from "../catrgories-preview/categories-preview.component";
import Category from "../category/category.conponent";

const Shop = () => {
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
