import { ProductsContext } from "../../../Contexts/products.context";
import { useContext } from "react";
import ProductCard from "../../product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
	const { products } = useContext(ProductsContext);
	return (
		<div className="products-container">
			{products.map((Product) => (
				<ProductCard key={Product.id} product={Product} />
			))}
		</div>
	);
};

export default Shop;
