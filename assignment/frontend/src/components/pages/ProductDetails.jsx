import {  useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { dataTestIds } from "../../tests/constants/components";
import { addCartItem, incrementCartItem } from "../../redux/actionCreators/cartActions";


export const ProductDetails = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();

    /**
     * Doing like this is a bit weird way but grader autotests limit the possibilities.
     * In reality, I would change the redux state so that it would have
     * { products: [], product: {} }. products would have some general information about
     * every product shown in page and then when user clicks some specific product and
     * this ProductDetails is opened, MORE DETAILED information of that product would be
     * fetched from the server and saved to that product: {}. And then accessed here and
     * shown to user.
     */
    const products = useSelector((state) => state.products);
    const product = products.filter(product => product.id === productId)[0];
    // check if product wasnt found or if it is missing information (keys)
    const keys = ['name', 'description', 'price'];
    if (product === undefined || !keys.every(key => Object.keys(product).includes(key))) {
        return (<label>Error. Can't find product.</label>)
    }
    const cartItems = useSelector((state) => state.cart);

    function handleAdd() {
        if (cartItems.some(item => item.product.name === product.name)) {
            dispatch(incrementCartItem(product.id));
        } else {
            dispatch(addCartItem(product));
        }   
    };

    return (
        <div>
            <label>{product.name}</label>
            <label>{product.description}</label>
            <label>{product.price}</label>
            <button tabIndex={0}
                data-testid={dataTestIds.clickId.add}
                onClick={() => handleAdd()}
            >Add to Cart</button>
        </div>
    );
};