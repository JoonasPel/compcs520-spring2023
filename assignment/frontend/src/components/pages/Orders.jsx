import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actionCreators/ordersActions";
import { dataTestIds } from "../../tests/constants/components";
import { Link } from "react-router-dom";

export const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {orders.length === 0 ? dispatch(getOrders()) : ""}, []);

    return (
        <>
            {orders.length === 0 ? (
                <div data-testid={dataTestIds.containerId.empty} />
            ) : (     
                <ul>      
                    {orders.map((order) =>
                        <div key={order.id} data-testid={dataTestIds.containerId.listItem(order.id)}>
                            <p data-testid={dataTestIds.valueId.id}>{"Order id: " + order.id}</p>
                            <Link to={order.id} data-testid={dataTestIds.linkId.inspect}> Order Link </Link>       
                        </div>           
                    )}
                </ul>
            )}       
        </>
    );
};