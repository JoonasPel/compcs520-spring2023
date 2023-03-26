import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from '../../redux/actionCreators/usersActions';
import { dataTestIds } from "../../tests/constants/components";
import { User } from "../User";


export const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {users.length <= 1 ? dispatch(getUsers()) : ""}, []);
    return (
        <>
        {/* Users container */}
        {users.length === 0 ? (
            <div data-testid={dataTestIds.containerId.empty} />
        ) : (     
            <ul>      
                {users.map((user) => 
                    <User key={user.id} user={user} showLink={true}/>
                )}
            </ul>
        )}
        </>
    );
};