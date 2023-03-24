import {  useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { dataTestIds } from "../../tests/constants/components";
import { getOrder } from "../../redux/actionCreators/ordersActions";
import { useEffect } from "react";


export const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const orders = useSelector((state) => state.orders);

    useEffect(() => {dispatch(getOrder(orderId))}, []);

    if (orders.length === 1 ) {
        const order = orders[0]
        return (
            <div data-testid={dataTestIds.containerId.inspect}>
                {order.items.map((item) =>
                    <div key={item.product.id} data-testid=
                        {dataTestIds.containerId.listItem(item.product.id)}>
                        <p data-testid={dataTestIds.valueId.name}>{item.product.name}</p>
                        <p data-testid={dataTestIds.valueId.quantity}>{item.quantity}</p>
                    </div>
                )}
            </div>
        );
    } else {
        return (<></>);
    }  
};