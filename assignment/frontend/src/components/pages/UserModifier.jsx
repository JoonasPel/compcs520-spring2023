import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dataTestIds } from "../../tests/constants/components";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../redux/actionCreators/usersActions";


export const UserModifier = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.users[0]);
    const [roleSelected, setRoleSelected] = useState("customer");
    
    useEffect(() => {dispatch(getUser(userId))}, []);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser({...user, role: roleSelected}));
    };
    const handleRadioButton = (event) => {
        setRoleSelected(event.target.value);
    };
    const handleClick = () => {
        navigate(-1);
    };

    if (!user) return (<>Loading</>);

    return (
        <form data-testid={dataTestIds.containerId.form} onSubmit={handleSubmit}>
            <p data-testid={dataTestIds.valueId.name}>{user.name}</p>
            <div data-testid={dataTestIds.selectId.role}>
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
            </div>       
            <button type="submit" data-testid={dataTestIds.clickId.submit}
                disabled={user.role === roleSelected}>Submit</button>
            <button data-testid={dataTestIds.clickId.cancel}
                onClick={handleClick}>Cancel</button>
        </form>
    );
};