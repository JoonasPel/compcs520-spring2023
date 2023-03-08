import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from '../../tests/constants/components.js';
import { useState } from "react";
import { register } from "../../redux/actionCreators/authActions.js";

export const Register = () => {
    const dispatch = useDispatch();


    function handleSubmit(event) {
        event.preventDefault();
        dispatch(register({
            name: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value,
            passwordConfirmation: event.target[3].value
        }));
    };

    return (
        <form data-testid={dataTestIds.containerId.form} onSubmit={handleSubmit}>
            <input type="text"
            data-testid={dataTestIds.inputId.name}
            placeholder="Enter Name" 
            required />

            <input type="text"
            data-testid={dataTestIds.inputId.email}
            placeholder="Enter Email" 
            required />

            <input type="password"
            data-testid={dataTestIds.inputId.password}
            placeholder="Enter Password" 
            required />

            <input type="password"
            data-testid={dataTestIds.inputId.passwordConfirmation}
            placeholder="Enter Password Again" 
            required />

            <button type="submit" data-testid={dataTestIds.clickId.submit}>Register</button>
        </form>
    );
};