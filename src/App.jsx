import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes,	Route} from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';
import AddItems from './components/AddItems/AddItems'
import './app.scss';

const Home = React.lazy(() => import('./components/Home/Home'));

function App () {
	return (
			<Suspense fallback={<Spinner />}>
				<Router>
					<Routes>
						<Route exact path='/' element={<Home />}></Route>
						<Route exact path='/add' element={<AddItems />}></Route>
					{/* <Search /> */}
					</Routes>
				</Router>
			</Suspense>
	);
}

export default App;