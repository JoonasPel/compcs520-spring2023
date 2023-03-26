import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from '../../tests/constants/components.js';
import { useState } from "react";
import { logIn } from "../../redux/actionCreators/authActions.js";

export const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(logIn({ email, password }));
        // clear form
        setEmail("");
        setPassword("");
    };

    return (
        <form data-testid={dataTestIds.containerId.form} onSubmit={handleSubmit}>
            <input type="text"
            data-testid={dataTestIds.inputId.email}
            placeholder="Enter Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)} 
            required />

            <input type="password"
            data-testid={dataTestIds.inputId.password}
            placeholder="Enter Password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required />

            <button type="submit" data-testid={dataTestIds.clickId.submit}>Login</button>
        </form>
    );
};