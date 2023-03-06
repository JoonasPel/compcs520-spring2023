// Navigation bar that should be displayed at the top in every page.

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from '../tests/constants/components.js';


export const NavBar = () => {
    const auth = useSelector((state) => state.auth);
    const ids = dataTestIds.linkId;

    // Available links in navbar and what role(s) can see it.
    // Home(/) is not included here because it is a bit different
    const linksForRoles = {
        'guest': ['/products', '/cart', '/login', '/register'],
        'customer': ['/products', '/orders', '/cart', '/logout'],
        'admin': ['/products', '/orders', '/users', '/logout']
    };

    return (
        <nav data-testid={dataTestIds.containerId.navbar} className="rectangle">
            {/* navigation links */}
            <Link to='/' data-testid={ids.home}> home </Link>
            {linksForRoles[auth.role].map((link) =>
                <Link to={link} data-testid={ids[link.substring(1)]}
                    key={link}> {link.substring(1)} </Link>
            )}
            {/* show user's role */}
            <p data-testid={dataTestIds.containerId.profile}>
                {'Your role: ' + auth.role}</p>  

        </nav>
    );
};
