import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actionCreators/productsActions";
import { Product } from "../Product";
import { dataTestIds } from "../../tests/constants/components";



export const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {products.length === 0 ? dispatch(getProducts()) : ""}, []);

    return products.length === 0 ? (
        <div data-testid={dataTestIds.containerId.empty} />
    ) : ( 
        <ul>
            {products.map((product) => 
                <Product key={product.id} product={product} />
            )}
        </ul>
    )
};