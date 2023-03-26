import { dataTestIds } from "../tests/constants/components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, incrementCartItem } from "../redux/actionCreators/cartActions";


export const Product = ({product}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const handleAdd = () => {
        if (cartItems.some(item => item.product.name === product.name)) {
            dispatch(incrementCartItem(product.id));
        } else {
            dispatch(addCartItem(product));
        }   
    };

    return (
        <div data-testid={dataTestIds.containerId.listItem(product.id)}>
            <label data-testid={dataTestIds.valueId.name}>{product.name}</label>
            <label data-testid={dataTestIds.valueId.price}>{product.price}</label>
            <Link to={product.id} data-testid={dataTestIds.linkId.inspect}> Product Link </Link>
            {auth.role !== "admin" ? (
                <button tabIndex={0} data-testid={dataTestIds.clickId.add}
                    onClick={handleAdd}>Add to Cart</button>
            ):("")}       
        </div>
    );
};