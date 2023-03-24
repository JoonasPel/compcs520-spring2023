import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dataTestIds } from "../../tests/constants/components";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../redux/actionCreators/usersActions";

export const UserModifier = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const auth = useSelector((state) => state.auth);
    const users = useSelector((state) => state.users);

    useEffect(() => {dispatch(getUser(userId))}, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser("userobject TODO"));
    };

    if (users.length === 1) {
        const user = users[0];
        return (
            <form data-testid={dataTestIds.containerId.form} onSubmit={handleSubmit}>
                <p data-testid={dataTestIds.valueId.name}>{user.name}</p>

                <button type="submit" data-testid={dataTestIds.clickId.submit}>Submit</button>
            </form>

        );
    } else {
        return (<></>);
    }

    
};