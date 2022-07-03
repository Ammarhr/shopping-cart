import React , {Suspense} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Spinner from './components/Spinner/Spinner';
import './app.scss';

const Home = React.lazy(()=> import('./components/Home/Home'));
// const Search = React.lazy(()=> import('./components/Search/Search'));

function App () {
	return (
		<div>
		<Suspense fallback={<Spinner />}>
			<Header />
			<Home />
			{/* <Search /> */}
			<Footer />
		</Suspense>
		</div>
	);
}

export default App;