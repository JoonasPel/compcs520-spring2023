// Navigation bar that should be displayed at the top in every page.

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { initApp } from "../redux/actionCreators/appActions";
import { dataTestIds } from '../tests/constants/components.js';

export const NavBar = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const notification = useSelector((state) => state.notification);

    useEffect(() => {dispatch(initApp())}, []);

    return (
        <div data-testid={dataTestIds.NavBar} className="rectangle">
            <a href="emt"> Home </a>
            <a href="emt"> Products </a>
            <a href="emt"> Cart </a>
            <a href="emt"> Login </a>
            <a href="emt"> Register </a>
            {'Your role: ' + auth.role}

            {notification.message ? 
            (<p>{'notification -> ' + notification.message}</p>)
            : (<p></p>)
            }
            
        </div>
    );
};
