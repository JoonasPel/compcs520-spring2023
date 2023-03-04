/** @format */

import { dataTestIds } from './tests/constants/components.js';
import { NavBar } from './components/NavBar.jsx';





const App = () => {
	return <div data-testid={dataTestIds.app}>
		<NavBar />
	</div>;
};

export default App;
