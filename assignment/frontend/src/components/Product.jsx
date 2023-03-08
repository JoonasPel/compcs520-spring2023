import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from "../tests/constants/components";
import { Link } from "react-router-dom";


export const Product = ({product}) => {
    const dispatch = useDispatch();

    return (
        <div>
            <label data-testid={dataTestIds.valueId.name}>{product.name}</label>
            <label data-testid={dataTestIds.valueId.price}>{product.price}</label>
            <Link to={'/'+product.id} data-testid={"todo"}> Product Link </Link>
        </div>
    );
};