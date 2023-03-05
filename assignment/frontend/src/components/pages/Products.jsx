import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actionCreators/productsActions";
import { Product } from "../Product";



export const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {dispatch(getProducts())}, []);

    return (
        <ul>
            {products.map((product) => 
                <Product key={product.id} product={product} />
            )}
        </ul>
    );
};