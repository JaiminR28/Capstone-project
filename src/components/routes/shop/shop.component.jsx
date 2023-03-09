import SHOP_DATA from "../../../shop-data.json";

import { ProductsContext } from "../../../Contexts/products.context";
import { useContext } from "react";
import ProductCard from "../../product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
	const { Products } = useContext(ProductsContext);
	return (
		<div className="products-container">
			{SHOP_DATA.map((Products) => (
				<ProductCard key={Products.id} product={Products} />
			))}
		</div>
	);
};

export default Shop;
