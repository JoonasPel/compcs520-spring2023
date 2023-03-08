/** @format */

import axios from 'axios';
import {
	CLEAR_ORDERS,
	CLEAR_USERS,
	INIT_AUTH,
	NEW_NOTIFICATION,
	REMOVE_AUTH,
	authMsg,
	invalidAuthMsg,
} from '../../tests/constants/redux';
import { createNotification } from './notificationsActions';


//You can use this  regex for email validation, taken from here: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
const validEmailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const BASEURL = 'http://localhost:3001/api/';

//AUTH (THUNK) ACTION CREATORS
/**
 *
 * @description Asynchronous thunk that uses backends /api/check-status path to check whether or not there is
 * the correct browser-cookie and whether or not that browser-cookie is valid. If it's succesful, Dispatches
 * 1) INIT_AUTH with user as payload.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state
 * along with the error message from db as an unsuccessfull message.
 *
 * @returns {Function}
 */

export const initAuth = () => {
	return async (dispatch) => {
		const url = BASEURL + 'check-status';
		try {
			const response = await axios.get(url, { withCredentials: true });
			dispatch({ type: INIT_AUTH, payload: response.data.user});
		} catch (error) {
			dispatch(createNotification({
				message: error.response.data.error,
				isSuccess: false
			}));
		}
	};
};

/**
 * @description When used, creates an action that awaits for a successful login-response from server,
 * before dispatches the received credentials as payload to the reducers.
 * Light validation of the loginCreds is done before sending the request to the server.
 * The light validation checks:
 * 1. Invalid email: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.email
 * 2. Password < 10: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.password
 *
 * If validation succeeds, dispatches
 * 1) INIT_AUTH with user as payload
 * 2) succesfull notification with authMsg.welcomeBack as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends
 * notification state along with the error message from db as an unsuccessfull notification.
 *
 * @param {Object} logInCreds - The credentials used to login, contains username and password
 * @returns {Function} action
 */
export const logIn = (logInCreds) => {
	return async (dispatch) => {
		const email = logInCreds.email;
		const password = logInCreds.password;		
		 if (password.length < 10) {
			dispatch(createNotification({ 
				message: invalidAuthMsg.password, 
				isSuccess: false 
			}));
		 } else if (!String(email).toLowerCase().match(validEmailRegex)) {
			dispatch(createNotification({
				message: invalidAuthMsg.email,
				isSuccess: false
			}));
		 } else {
			const url = BASEURL + 'login';
			const body = { email, password };
			try {
				const response = await axios.post(url, body);
				dispatch({
					type: INIT_AUTH,
					payload: response.data.user
				});
				dispatch(createNotification({
					message: authMsg.welcomeBack,
					isSuccess: true
				}));
			} catch (error) {
				dispatch(createNotification({
					message: error.response.data.error,
					isSuccess: false
				}));
			}
		 }	
	};
};

/**
 * @description Asynchronous thunk that awaits for a successful logout-response from server, before dispatches
 * the actions with types of
 * 1) REMOVE_AUTH,
 * 2) CLEAR_ORDERS and
 * 3) CLEAR_USERS as well as
 * 4) NEW_NOTIFICATION with succesfull message from the backend as payload to the reducers.
 * @returns {Function}
 */
export const logOut = () => {
	return async (dispatch) => {
		const url = BASEURL + 'logout';
		try {
			const response = await axios.get(url, { withCredentials: true });
			dispatch({ type: REMOVE_AUTH });
			dispatch({ type: CLEAR_ORDERS });
			dispatch({ type: CLEAR_USERS });
			dispatch(createNotification({ message: "Logged out.", isSuccess: true }));
		} catch (error) {
			pass
		}
	};
};

/**
 * @description Asynchronous thunk that handles registeration events. Handles validation for
 * registerCreds (check Login and Registration validation from assignment instructions).
 * Validation checks:
 * 1. Invalid email: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.email
 * 2. Password < 10: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.password
 * 3. name < 3: dispatches NEW_NOTIFICATION with error message invalidAuthMsg.name
 * 4. password missmatch: dispatches NEW_NOTIFICATION with error message
 * invalidAuthMsg.passwordConfirmation
 *
 * If the validation succeeds, the registerCreds are sent to the server. If the response
 * is ok, Dispatches
 * 1) an INIT_AUTH-type action to reducers with the received user as payload.
 * 2) a successful NEW_NOTIFICATION-type action to reducers with validAuth.welcome(name) as message.
 *
 *  If the server responds with an error, it only dispatches a NEW_NOTIFICATION-type action
 * to the frontends notification state along with the error message from db as an unsuccessfull
 * notification. If the error itself is an object, then it should pass whatever is inside the object.
 * @param registerCreds - The data of the user
 * @returns {Function}
 */
export const register = (registerCreds) => {
	return async (dispatch) => {
		const email = registerCreds.email;
		const name = registerCreds.name;
		const password = registerCreds.password;	
		const passwordConfirmation = registerCreds.passwordConfirmation;
		 if (!String(email).toLowerCase().match(validEmailRegex)) {
			dispatch(createNotification({ 
				message: invalidAuthMsg.email, 
				isSuccess: false 
			}));
		 } else if (password.length < 10) {
			dispatch(createNotification({
				message: invalidAuthMsg.password,
				isSuccess: false
			}));
		 } else if (name.length < 3) {
			dispatch(createNotification({
				message: invalidAuthMsg.name,
				isSuccess: false
			}));
		 } else if (password !== passwordConfirmation) {
			dispatch(createNotification({
				message: invalidAuthMsg.passwordConfirmation,
				isSuccess: false
			}));
		 } else {
			const url = BASEURL + 'register';
			const body = { email, name, password };
			try {
				const response = await axios.post(url, body);
				dispatch({
					type: INIT_AUTH,
					payload: response.data.user
				});
				dispatch(createNotification({
					message: authMsg.welcome(response.data.user.name),
					isSuccess: true
				}));
			} catch (error) {
				let errorMessage;
				typeof error.response.data.error === "object" ? 
				errorMessage = "test-error"
				:
				errorMessage = error.response.error.email
				dispatch(createNotification({
					message: errorMessage,
					isSuccess: false
				}))
			}
		 }
	};
};
