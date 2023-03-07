import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from '../../tests/constants/components.js';
import { useState } from "react";
import { logIn } from "../../redux/actionCreators/authActions.js";

export const Login = () => {
    const dispatch = useDispatch();


    function handleSubmit(event) {
        event.preventDefault();
        dispatch(logIn({
            email: event.target[0].value,
            password: event.target[1].value,
        }));
    };

    return (
        <form data-testid={dataTestIds.containerId.form} onSubmit={handleSubmit}>
            <input type="text"
            data-testid={dataTestIds.inputId.email}
            placeholder="Enter Email" />

            <input type="password"
            data-testid={dataTestIds.inputId.password}
            placeholder="Enter Password" />

            <button type="submit" data-testid={dataTestIds.clickId.submit}>Login</button>
        </form>
    );
};