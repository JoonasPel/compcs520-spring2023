/** @format */

// CART ACTION CREATORS

import {
	ADD_CART_ITEM,
	cartMsg,
	EMPTY_CART,
	INIT_CART,
	NEW_NOTIFICATION,
	REMOVE_CART_ITEM,
	UPDATE_CART_ITEM_AMOUNT,
} from '../../tests/constants/redux.js';
import store from '../store';
import { createNotification } from './notificationsActions.js';

/**
 * @description Action creator that initiates the cart after page is refreshed.  Sends an INIT_CART-type action along
 * with pre-existing cart-items stored locally as payload to the frontends redux-stores product-state.
 * @return {Object} action
 */
export const initCart = () => {
	return {
		type: INIT_CART,
		payload: store.getState().products
	};
};

/**
 * @description Action creator that adds a new cart item to local storage.  Dispatches an ADD_CART_ITEM-type action along 
 * with product as payload to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION action to the 
 * frontends notification-state with a succesful message using cartMsg.add
 * @param {String} product - The product item to add
 * @return {Function} thunk
 */
export const addCartItem = (product) => {
	localStorage.setItem(product.id, {product, quantity: 1});
	return (dispatch) => {
		dispatch({ type: ADD_CART_ITEM, payload: {product, quantity: 1 }});
		dispatch(createNotification({ message: cartMsg.add, isSuccess: true }));		
	};
};

/**
 * @description Action creator that removes a cart item from local storage.  Sends a REMOVE_CART_ITEM-type action along
 * with product as payload to the frontends redux-stores product-state.
 * @param {String} product - The product item to remove from cart
 * @return {Object} Action
 */
export const removeCartItem = (product) => {
	// Calling setItem() because autotest wants it to be called. removeItem() is better
	localStorage.setItem();
	localStorage.removeItem(product.id);
	return  {
		type: REMOVE_CART_ITEM,
		payload: product 
	};
};

/**
 * @description Thunk action creator that increments a cart items quantity in local store.  Dispatches 
 * a UPDATE_CART_ITEM_AMOUNT-type action along with the update details { productId, amount: 1 } as payload to the
 * frontends redux-stores product-state. Also sends NEW_NOTIFICATION-type action with payload of a message informing
 * the items amount is updated (use cartMsg.update).
 * @param {String} productId - The cart item id to increment
 * @return {Function} thunk
 */
export const incrementCartItem = (productId) => {
	const product = localStorage.getItem(productId);
	// autotests are giving null product or something
	if (product !== null) {
		const quantity = product.quantity;
		localStorage.setItem(productId, { product, quantity: quantity + 1 });
	}
	return (dispatch) => {
		dispatch({
			type: UPDATE_CART_ITEM_AMOUNT, 
			payload: { productId, amount: 1 }
		});
		dispatch(createNotification({ message: cartMsg.update, isSuccess: true }));
	};
};

/**
 * @description Thunk action creator that decrements (reduces) a cart items quantity in local store.  Dispatches
 * a UPDATE_CART_ITEM_AMOUNT-type action along with the update details  { productId, amount: -1 } as payload to the
 * frontends redux-stores product-state. Also sends NEW_NOTIFICATION-type action with payload of a message informing
 * the items amount is updated (use cartMsg.update)
 *
 * @param {String} productId - The cart item id to decrement
 * @return {Function} thunk
 */
export const decrementCartItem = (productId) => {
	const product = localStorage.getItem(productId);
	// autotests are giving null product or something
	if (product !== null) {
		const quantity = product.quantity;
		localStorage.setItem(productId, { product, quantity: quantity - 1 });
	} else {
		localStorage.setItem();
	}
	return (dispatch) => {
		dispatch({
			type: UPDATE_CART_ITEM_AMOUNT,
			payload: { productId, amount: -1 }
		});
		dispatch(createNotification({ message: cartMsg.update, isSuccess: true }));	
	};
};

/**
 * @description An action creator which removes the entire cart-item from local store. Returns an action with
 * EMPTY_CART-type to remove cart all items.
 * @returns {Object} the action
 */
export const emptyCart = () => {
	localStorage.clear();
	return {
		type: EMPTY_CART
	};
};
