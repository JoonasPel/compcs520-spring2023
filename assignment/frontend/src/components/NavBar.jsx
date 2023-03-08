// Navigation bar that should be displayed at the top in every page.

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from '../tests/constants/components.js';
import { logOut } from "../redux/actionCreators/authActions.js";

// Capitalizes the first letter of a string.
function capitalize1st(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const NavBar = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const ids = dataTestIds.linkId;

    // Available links in navbar and what role(s) can see it.
    // Home(/) is not included here because it is a bit different
    const linksForRoles = {
        'guest': ['/products', '/cart', '/login', '/register'],
        'customer': ['/products', '/orders', '/cart'],
        'admin': ['/products', '/orders', '/users']
    };

    return (
        <nav data-testid={dataTestIds.containerId.navbar} className="rectangle">
            {/* NAVIGATION LINKS*/}
            {/* Home shown to everyone */}
            <Link to='/' data-testid={ids.home}> Home </Link>
            {/* Links found in linksForRoles displayed depending on role. */}
            {linksForRoles[auth.role].map((link) =>
                <Link to={link}
                    data-testid={ids[link.substring(1)]}
                    key={link}
                    > {capitalize1st(link.substring(1))} </Link>
            )}
            {/* Logout link shown to customer and admin. guest can't logout. */}
            {auth.role === 'admin' || auth.role === 'customer' ?
                <Link data-testid={dataTestIds.clickId.logout}
                onClick={() => dispatch(logOut())}> logout </Link>
            : ""}

            {/* show user's role */}
            <p data-testid={dataTestIds.containerId.profile}>
                {'Your role: ' + auth.role}</p>  

        </nav>
    );
};
