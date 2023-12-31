/** @format */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	addOrder,
	getOrder,
	getOrders,
} from '../../../redux/actionCreators/ordersActions';
import {
	ADD_ORDER,
	EMPTY_CART,
	GET_ORDER,
	GET_ORDERS,
	NEW_NOTIFICATION,
} from '../../constants/redux.js';
import { ordersApi } from '../../mocks/handlers.js';

import { db } from '../../utils/testDb';
import { server, rest } from '../../mocks/server';
import { beforeEach, describe, expect, it } from 'vitest';

const order = db.orders[0];

let store;
beforeEach(() => {
	store = mockStore({});
	// mock localStorag
});

const testErrorMsg = JSON.stringify(Math.floor(Math.random() * 10000000));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing thunk action creators', () => {
	describe('getOrder:', () => {
		describe('expected actions should be dispatched on successful requests', () => {
			it('Case 1: order-object is returned', async () => {
				server.use(
					rest.get(`${ordersApi}/${order.id}`, (req, res, ctx) => {
						return res(ctx.status(200), ctx.json(order));
					})
				);
				// mock.onGet().reply(200, order);
				const expectedActions = [
					{
						type: GET_ORDER,
						payload: order,
					},
				];
				return store.dispatch(getOrder(order.id)).then(() => {
					const actualActions = store.getActions();
					expect(actualActions).toEqual(expectedActions);
				});
			});
		});
		describe('expected actions should be dispatched on unsuccessful requests', () => {
			it('Case 1: Error caught -> NEW_NOTIFICATION', async () => {
				server.use(
					rest.get(`${ordersApi}/${order.id}`, (req, res, ctx) => {
						return res(
							ctx.status(400),
							ctx.json({
								error: testErrorMsg,
							})
						);
					})
				);
				const store = mockStore({});
				const expectedActions = [
					{
						type: NEW_NOTIFICATION,
						payload: { message: testErrorMsg, isSuccess: false },
					},
				];
				return store.dispatch(getOrder(order.id)).then(() => {
					const actualActions = store.getActions();
					expect(actualActions).toEqual(expectedActions);
				});
			});
		});
	});
	describe('getOrders:', () => {
		describe('expected actions should be dispatched on successful requests', () => {
			it('Case 1: orders-array is returned', async () => {
				server.use(
					rest.get(ordersApi, (req, res, ctx) => {
						return res(ctx.status(200), ctx.json(db.orders));
					})
				);
				const expectedActions = [
					{
						type: GET_ORDERS,
						payload: db.orders,
					},
				];
				return store.dispatch(getOrders()).then(() => {
					const actualActions = store.getActions();
					expect(actualActions).toEqual(expectedActions);
				});
			});
		});
		describe('expected actions should be dispatched on unsuccessful requests', () => {
			it('Case 1: Error caught -> NEW_NOTIFICATION', async () => {
				server.use(
					rest.get(ordersApi, (req, res, ctx) => {
						return res(
							ctx.status(400),
							ctx.json({
								error: testErrorMsg,
							})
						);
					})
				);
				const store = mockStore({});
				const expectedActions = [
					{
						type: NEW_NOTIFICATION,
						payload: { message: testErrorMsg, isSuccess: false },
					},
				];
				return store.dispatch(getOrders()).then(() => {
					const actualActions = store.getActions();
					expect(actualActions).toEqual(expectedActions);
				});
			});
		});
	});
	describe('addOrder:', () => {
		describe('expected actions should be dispatched on successful requests', () => {
			it('Case 1: updated order from the backend is returned', async () => {
				server.use(
					rest.post(ordersApi, (req, res, ctx) => {
						return res(ctx.status(201), ctx.json(order));
					})
				);
				const expectedActions = [
					{
						type: EMPTY_CART,
					},
					{
						type: ADD_ORDER,
						payload: order,
					},
					{
						type: NEW_NOTIFICATION,
						payload: { message: 'New order made.', isSuccess: true },
					},
				];
				return store.dispatch(addOrder(order)).then(() => {
					const actualActions = store.getActions();
					expect(actualActions).toEqual(expectedActions);
				});
			});
		});
		describe('expected actions should be dispatched on unsuccessful requests', () => {
			it('Case 1: Error caught -> NEW_NOTIFICATION', async () => {
				server.use(
					rest.post(ordersApi, (req, res, ctx) => {
						return res(
							ctx.status(400),
							ctx.json({
								error: testErrorMsg,
							})
						);
					})
				);
				const store = mockStore({});
				const expectedActions = [
					{
						type: NEW_NOTIFICATION,
						payload: {
							message: testErrorMsg,
							isSuccess: false,
						},
					},
				];
				return store.dispatch(addOrder(order)).then(() => {
					const actualActions = store.getActions();
					expect(actualActions).toEqual(expectedActions);
				});
			});
		});
	});
});
