import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



export const Product = ({product}) => {
    const dispatch = useDispatch();

    return (
        <div>
            <p>{product.name + ' - ' + product.price + '$'}</p>
            <img src={product.image} alt={product.name}
            width={100} height={100}/>
        </div>
    );
};