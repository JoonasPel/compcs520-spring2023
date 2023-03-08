import { useDispatch } from "react-redux";
import { dataTestIds } from '../tests/constants/components.js';
import { addProduct } from "../redux/actionCreators/productsActions";

export const ProductCreator = (props) => {
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(addProduct({
            name: event.target[0].value,
            price: event.target[1].value,
            description: event.target[2].value
        }));
        // close creator
        props.close();
    };

    return (
        <>
            <form data-testid={dataTestIds.containerId.form} onSubmit={handleSubmit}>
                <input type="text"
                data-testid={dataTestIds.inputId.name}
                placeholder="Enter Product Name" 
                required />

                <input type="text"
                data-testid={dataTestIds.inputId.price}
                placeholder="Enter Price" 
                required />

                <input type="text"
                data-testid={dataTestIds.inputId.description}
                placeholder="Enter Description" 
                required />

                <button type="submit" data-testid={dataTestIds.clickId.submit}>Add Product</button>
            </form>
            {/* Closes creator */}
            <button onClick={props.close}
            data-testid={dataTestIds.clickId.close}
            >Close</button>
        </>
    );
};