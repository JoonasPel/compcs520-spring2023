import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from '../../tests/constants/components.js';
import { useState } from "react";
import { logOut } from "../../redux/actionCreators/authActions.js";

export const Logout = () => {
    const dispatch = useDispatch();

    return (
        <>
            <label>Logout</label>
            <button tabIndex={0} onClick={() => dispatch(logOut())}>Logout</button>
        </>  
    );
};