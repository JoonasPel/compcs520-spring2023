import { dataTestIds } from "../tests/constants/components";


export const CartItem = ({cartItem}) => {
    return (
        <div data-testid={dataTestIds.containerId.listItem(cartItem.product.id)}>
            <label data-testid={dataTestIds.valueId.quantity}>{cartItem.quantity}</label>
            <label data-testid={dataTestIds.valueId.name}>{cartItem.product.name}</label>
            <label data-testid={dataTestIds.valueId.price}>{cartItem.product.price}</label>
        </div>
    );
};