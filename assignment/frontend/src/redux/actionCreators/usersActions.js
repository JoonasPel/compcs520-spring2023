/** @format */

// USERS ACTION CREATORS

import axios from 'axios';
import {
	GET_USER,
	GET_USERS,
	NEW_NOTIFICATION,
	REMOVE_USER,
	UPDATE_USER,
	userMsg,
} from '../../tests/constants/redux.js';

import { createNotification } from './notificationsActions.js';

const BASEURL = 'http://localhost:3001/api/users/';

/**
 * @description Asynchronous action creator that gets a single user from the backend (if possible) and sends
 * that through thunk to the reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification
 * state along with the error message from db as an unsuccessfull message.
 *
 * @param {String} userId - The users id that is to be fetched.
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUser = (userId) => {
	return async (dispatch) => {
		const url = BASEURL + userId.toString();
		const response = await axios.get(url);
		if (response.status == 200) {
			dispatch({ type: GET_USER, payload: response.data});
			// autotests dont want this :(
			//dispatch(createNotification({ message: userMsg.got, isSuccess: true }));
		} else {
			dispatch(createNotification({ message: response.statusText, isSuccess: false }));
		}
	};
};

/**
 * @description Asynchronous action creator that gets all the users from the backend (if possible) and sends
 * that Array through thunk to the reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification
 * state along with the error message from db as an unsuccessfull message.
 *
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUsers = () => {
	return async (dispatch) => {
		const response = await axios.get(BASEURL);
		if (response.status == 200) {
			dispatch({ type: GET_USERS, payload: response.data});
			// autotests dont want this :(
			//dispatch(createNotification({ message: userMsg.gots, isSuccess: true }));
		} else {
			dispatch(createNotification({ message: response.statusText, isSuccess: false }));
		}
	};
};

/**
 * @description Asynchronous action creator that updates the given user (if possible) and sends the user received
 * from the backend through thunk to reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification
 * state along with the error message from db as an unsuccessfull message.
 *
 * @param {object} updatedUser - contains the updated user data
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const updateUser = (updatedUser) => {
	return async (dispatch) => {
		const url = BASEURL + updatedUser.id.toString();
		const options = { data: { updatedUser }}; 
		const response = await axios.put(url, options);
		if (response.status == 200) {
			dispatch({ type: UPDATE_USER, payload: response.data});
			dispatch(createNotification({ message: userMsg.update, isSuccess: true }));
		} else {
			dispatch(createNotification({ message: response.statusText, isSuccess: false }));
		}
	};
};

/**
 * @description Removes the user (if possible) from the backend, then dispatches an action to remove it from the redux-store,
 * as well as another action to notify the current user that the deletion was succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state
 * along with the error message from db as an unsuccessfull message.
 *
 * @param {String} - The users id that is to be fetched
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const removeUser = (userId) => {
	return async (dispatch) => {;
		const url = BASEURL + userId.toString();
		const response = await axios.delete(url);
		if (response.status == 200) {
			dispatch({ type: REMOVE_USER, payload: response.data });
			dispatch(createNotification({message: userMsg.delete(response.data), isSuccess: true}));
		} else {
			dispatch(createNotification({message: response.statusText, isSuccess: false}));
		}			
	};
};
