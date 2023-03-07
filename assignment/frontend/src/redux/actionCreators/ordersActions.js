/** @format */

// ORDER ACTION CREATORS
import axios from 'axios';
import {
	NEW_NOTIFICATION,
	GET_ORDERS,
	ADD_ORDER,
	GET_ORDER,
	orderMsg,
} from '../../tests/constants/redux.js';
import { emptyCart } from './cartActions';
import { createNotification } from './notificationsActions.js';
const BASEURL = 'http://localhost:3001/api/orders/';

/**
 * @description Action creator for getting a single order. Dispatches action with type GET_ORDER and payload of the
 * fetched order if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state
 * along with the error message from db as an unsuccessfull message.
 * @param {String} orderId -  The id of the order to get
 * @return {Function} - Thunk -> action
 */
export const getOrder = (orderId) => {
	return async (dispatch) => {
		const url = BASEURL + orderId.toString();
		try {
			const response = await axios.get(url);
			dispatch({ type: GET_ORDER, payload: response.data });
		} catch (error) {
			dispatch(createNotification({
				message: error.response.data.error,
				isSuccess: false
			}));
		}
	};
};

/**
 * @description Action creator for getting all orders. Dispatches action with type GET_ORDERS and payload
 * of the fetched orders if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification
 * state along with the error message from db as an unsuccessfull message.
 * @return {Function} - Thunk -> action
 */
export const getOrders = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(BASEURL);
			dispatch({ type: GET_ORDERS, payload: response.data });
		} catch (error) {
			dispatch(createNotification({
				message: error.response.data.error,
				isSuccess: false
			}));
		}
	};
};

/**
 * @description Action creator for adding a new order. Dispatches actions:
 * - ADD_ORDER-type with payload that has the new order
 * - EMPTY_CART-type with no payload
 * - NEW_NOTIFICATION with orderMsg.newOrder in the payload
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state
 * along with the error message from db as an unsuccessfull message.
 *
 * @param {Object} newOrder -  The new order to post
 * @return {Function} - Thunk -> action
 */
export const addOrder = (newOrder) => {
	return async (dispatch) => {
		const options = { data: { newOrder }};
		try {
			const response = await axios.get(BASEURL, options);
			dispatch({ type: ADD_ORDER, payload: response.data });
			dispatch(createNotification({ message: orderMsg.newOrder, isSuccess: true }));
		} catch (error) {
			console.log(error)
			dispatch(createNotification({
				message: error.response.data.error,
				isSuccess: false
			}));
		}
	};
};
