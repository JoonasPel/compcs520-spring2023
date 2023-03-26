/** @format */

import { dataTestIds } from './tests/constants/components.js';
import { NavBar } from './components/NavBar.jsx';
import { Notification } from './components/Notification.jsx';
import { Home } from './components/pages/Home.jsx';
import { Products } from './components/pages/Products';
import { ProductDetails } from './components/pages/ProductDetails.jsx';
import { OrderDetails } from './components/pages/OrderDetails.jsx';
import { Cart } from './components/pages/Cart.jsx';
import { Orders } from './components/pages/Orders.jsx';
import { Register } from './components/pages/Register.jsx';
import { Login } from './components/pages/Login.jsx';
import { Users } from './components/pages/Users.jsx';
import { UserPage } from './components/pages/UserPage.jsx';
import { UserModifier } from './components/pages/UserModifier.jsx';
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
					<Route path='' element={<Home />} />
					{/* sub route is not nested here because it was easier this way
						to make it so that Products DOESN'T render when url is 
						product/:productId. Only ProductDetails renders then. */}
					<Route path='products' element={<Products />} /> 
					<Route path="products/:productId" element={<ProductDetails />} />
					
					<Route path='cart' element={<Cart />} />
					<Route path='orders' element={<Orders />} />
					<Route path="orders/:orderId" element={<OrderDetails />} />

					<Route path='register' element={<Register />} />
					<Route path='login' element={<Login />} />
					<Route path='users' element={<Users />} />
					<Route path='users/:userId' element={<UserPage />} />
					<Route path='users/:userId/modify' element={<UserModifier />} />
					{/* If url doesnt match anything */}
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>		
		</div>
	);
};

export default App;
