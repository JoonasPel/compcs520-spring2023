import { dataTestIds } from "../tests/constants/components";
import { Link } from "react-router-dom";


export const Product = ({product}) => {

    return (
        <div data-testid={dataTestIds.containerId.listItem(product.id)}>
            <label data-testid={dataTestIds.valueId.name}>{product.name}</label>
            <label data-testid={dataTestIds.valueId.price}>{product.price}</label>
            <Link to={product.id} data-testid={dataTestIds.linkId.inspect}> Product Link </Link>
        </div>
    );
};