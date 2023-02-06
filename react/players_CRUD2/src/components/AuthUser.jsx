/**
 * Student instructions:
 *
 * Use the given template with props to create a AuthUser component similar to
 * the AuthUser component in the Vue exercise. Instead of using <template>,
 * use JSX.
 *
 * "handleSubmit" prop is a function that will be called when the form is
 * submitted. It is your responsibility to decide how the function knows
 * whether the user is registering or logging in.
 *
 * "handleLogout" prop is a function that will be called when the logout link
 * is clicked.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in
 * the same places to pass the tests.
 *
 * @format
 */

import { useEffect, useState } from "react"

export const AuthUser = ({ handleSubmit, isLoggedIn, handleLogout }) => {
	const [register, setRegister] = useState(false);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	//if (isLoggedIn == true) {return null;}

	function linkText() {
		if (isLoggedIn === true ) {
			return "Logout";
		} else if (register === true) {
			return "Go to register";
		} else {
			return "Go to login";
		}
	};
	function clickHandle() {
		if (isLoggedIn === true) {
			handleLogout();
		} else {
			setRegister(!register);
		}
	};
	function submit(event) {
		event.preventDefault();
		handleSubmit(register, name, password);
		setName("");
		setPassword("");
	};

	return (
		<div>
			<a onClick={clickHandle}>{linkText()}</a>

			<form id="auth-form" onSubmit={submit}>
				<input id="auth-username" name="auth-username" onChange={(event) => setName(event.target.value)}
				value={name} type="text" placeholder="name" required />
				<input id="auth-password" name="auth-password" onChange={(event) => setPassword(event.target.value)}
				value={password} type="password" placeholder="password" required />
				<input className="btn-auth" type="submit" value={register ? "login" : "register"} />
			</form>

		</div>
	);
};
