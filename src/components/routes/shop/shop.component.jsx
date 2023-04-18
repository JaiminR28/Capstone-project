import { CategoriesContext } from "../../../Contexts/categories.context";
import { Fragment, useContext } from "react";
import ProductCard from "../../product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<Fragment>
			{Object.keys(categoriesMap).map((title) => (
				<Fragment>
					<h2>{title}</h2>
					<div className="products-container">
						{categoriesMap[title].map((Product) => (
							<ProductCard key={Product.id} product={Product} />
						))}
					</div>
				</Fragment>
			))}
		</Fragment>
	);
};

export default Shop;
