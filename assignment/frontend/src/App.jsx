/** @format */

import { dataTestIds } from './tests/constants/components.js';
import { NavBar } from './components/NavBar.jsx';
import { Notification } from './components/Notification.jsx';
import { Home } from './components/pages/Home.jsx';
import { Products } from './components/pages/Products';
import { Cart } from './components/pages/Cart.jsx';
import { Orders } from './components/pages/Orders.jsx';
import { Register } from './components/pages/Register.jsx';
import { Login } from './components/pages/Login.jsx';
import { NotFound } from './components/pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { useEffect } from "react";
import { initApp } from "./redux/actionCreators/appActions";


const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {dispatch(initApp())}, []);

	return (
		<div data-testid={dataTestIds.containerId.app}>
			<NavBar />
			<Notification />
			{/* Main content changed by routing */}
			<div data-testid={dataTestIds.containerId.main}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<Products />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/orders' element={<Orders />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>		
		</div>
	);
};

export default App;
