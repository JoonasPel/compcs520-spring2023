import { dataTestIds } from "../tests/constants/components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/actionCreators/usersActions";
import { useNavigate } from "react-router-dom";


export const User = ({user, deletionCallBack}) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleModify = () => {
        navigate("/users/" + user.id + "/modify");
    };
    const handleDelete = () => {  
        dispatch(removeUser(user.id));
        if (deletionCallBack) deletionCallBack();
    };

    return (
        <div data-testid={dataTestIds.containerId.listItem(user.id)}>
            <label data-testid={dataTestIds.valueId.name}>{user.name}</label>
            <label data-testid={dataTestIds.valueId.role}>{user.role}</label>
            <Link to={user.id} data-testid={dataTestIds.linkId.inspect}> User Link </Link>

            {/* modify and delete buttons if this user is not their own */}
            {user.id !== auth.id ? (
                <div>
                    <button tabIndex={0} data-testid={dataTestIds.clickId.modify}
                        onClick={handleModify}>Modify</button>
                    <button tabIndex={0} data-testid={dataTestIds.clickId.delete}
                        onClick={handleDelete}>Delete</button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};