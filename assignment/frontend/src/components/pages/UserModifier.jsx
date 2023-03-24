import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dataTestIds } from "../../tests/constants/components";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../redux/actionCreators/usersActions";

export const UserModifier = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.users[0]);
    const [roleSelected, setRoleSelected] = useState("customer");
    
    useEffect(() => {dispatch(getUser(userId))}, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user)
        console.log({...user, role: roleSelected})
        //dispatch(updateUser());
    };
    const handleRadioButton = (event) => {
        setRoleSelected(event.target.value);
    };

    if (!user) return (<>Loading</>);

    return (
        <form data-testid={dataTestIds.containerId.form} onSubmit={handleSubmit}>
            <p data-testid={dataTestIds.valueId.name}>{user.name}</p>
            <label>
                Customer
                <input type="radio" value="customer"
                    checked={roleSelected === "customer"}
                    onChange={handleRadioButton}/>
            </label>
            <label>
                Admin
                <input type="radio" value="admin" 
                    checked={roleSelected === "admin"}
                    onChange={handleRadioButton}/>
            </label>
            <button type="submit" data-testid={dataTestIds.clickId.submit}
                disabled={user.role === roleSelected}>Submit</button>
        </form>
    );
};