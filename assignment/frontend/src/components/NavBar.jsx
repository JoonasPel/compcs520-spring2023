// Navigation bar that should be displayed at the top in every page.

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from '../tests/constants/components.js';


export const NavBar = () => {
    const auth = useSelector((state) => state.auth);
    const notification = useSelector((state) => state.notification);
    const ids = dataTestIds.linkId;

    return (
        <nav data-testid={dataTestIds.containerId.navbar} className="rectangle">
            {/* navigation links */}
            <Link to='/' data-testid={ids.home}> Home </Link>
            <Link to='/products' data-testid={ids.products}> Products </Link>
            <Link to='/cart' data-testid={ids.cart}> Cart </Link>
            <Link to='/orders' data-testid={ids.orders}> Orders </Link>
            <Link to='/login' data-testid={ids.login}> Login </Link>
            <Link to='/register' data-testid={ids.register}> Register </Link>
            {/* show user's role */}
            {'Your role: ' + auth.role}
            {/* show notifications */}
            {notification.message ? 
            (<p>{'notification -> ' + notification.message}</p>)
            : (<p></p>)
            }
            
        </nav>
    );
};
