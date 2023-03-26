import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actionCreators/productsActions";
import { Product } from "../Product";
import { dataTestIds } from "../../tests/constants/components";
import { ProductCreator } from "../ProductCreator";


export const Products = () => {
    const [showCreator, setShowCreator] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {products.length === 0 ? dispatch(getProducts()) : ""}, []);

    const handleClick = () => {
        if (auth.role === 'admin') {
            setShowCreator(!showCreator);
        }
    };

    return (       
        <>

        {/* Products container */}
        {products.length === 0 ? (
            <div data-testid={dataTestIds.containerId.empty} />
        ) : (     
            <ul>      
                {products.map((product) => 
                    <Product key={product.id} product={product} />
                )}
            </ul>
        )}

        {/* Product creator for admin */}
        <button tabIndex={0} data-testid={dataTestIds.clickId.add}
            onClick={handleClick}>Add</button>
        {showCreator ?
        <ProductCreator close={() => setShowCreator(false)}/>
        : ""}

        </>
    );
};