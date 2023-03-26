import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from '../../redux/actionCreators/usersActions';
import { dataTestIds } from "../../tests/constants/components";
import { User } from "../User";


export const UserPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.users[0]);
    const { userId } = useParams();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {dispatch(getUser(userId))}, []);

    const handleDeletion = () => {
        navigate(-1);
    };

    if (!user) return (<>Loading</>);
    return (
        <>
            <User user={user} deletionCallBack={handleDeletion}/>
        </>
    );
};