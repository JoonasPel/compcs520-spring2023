import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from "../../tests/constants/components";
import { CartItem } from "../CartItem";
import { addOrder } from "../../redux/actionCreators/ordersActions";

export const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    function handleOrder() {
        // image link needs to be removed from order items.
        cartItems.map((item) => {delete item.product['image']})
        dispatch(addOrder(cartItems));
    }
    
    return (
        <>
            {cartItems.length === 0 ? (
                <div data-testid={dataTestIds.containerId.empty} />
            ) : (     
                <ul>
                    {/* Cart items */}
                    {cartItems.map((item) =>
                        <CartItem key={item.product.id} cartItem={item} />    
                    )}
                    {/* Make order */}
                    <button tabIndex={0}
                        data-testid={dataTestIds.clickId.submit}
                        onClick={() => handleOrder()}
                    >Make order!</button>
                </ul>
            )}  
        </>
    );
};