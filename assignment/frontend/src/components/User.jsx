import { dataTestIds } from "../tests/constants/components";
import { Link } from "react-router-dom";


export const User = ({user}) => {

    return (
        <div data-testid={dataTestIds.containerId.listItem(user.id)}>
            <label data-testid={dataTestIds.valueId.name}>{user.name}</label>
            <label data-testid={dataTestIds.valueId.role}>{user.role}</label>
            <Link to={user.id} data-testid={dataTestIds.linkId.inspect}> Product Link </Link>

            {/* TODO modify and delete buttons if this user is not their own */}
        </div>
    );
};