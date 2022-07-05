import React, { useState, useEffect, Suspense } from 'react';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import Cookies from 'react-cookies';
import './home.scss';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Cards = React.lazy(() => import('./Cards'));


function Home () {

	const [shops, setshop] = useState('');
	const [isLogged, setIsLogged] = useState(false);

	const handleGetshops = () => {

		var options = {
			method: 'GET',
			url: 'http://localhost:3333/product',
		};
		axios.request(options).then((response) => {
			setshop(response.data)
			if (Cookies.load("remember_user")) {
				setIsLogged(true);
			} else {
				setIsLogged(false);
			}

		}).catch((error) => {
			console.error(error);
		});
	}
	const handleDelete = (_id) => {
		axios.delete(`http://localhost:3333/product/${_id}`, {

			"headers": {
				"content-type": "application/json",
				"authorization": `Berar ${Cookies.load("remember_user")}`
			},

		}).then(response => {
			handleGetshops();
			console.log('this is response', response);
		}).catch((error) => {
			console.error(error, "error message");
		});
	}
	const checkLogged = (logged) => setIsLogged(logged);

	useEffect(() => {
		handleGetshops();
	}, []);

	return (
		<>
			<Suspense fallback={<Spinner />}>
				<Header checklogged={checkLogged} />
				{shops && shops.filter((result) => result.category_id === 1).length > 0 ? (
					<div>
						<h2 style={{ color: 'white' }}>Electronics:</h2>

						<div className="cards-container">
							{shops ? shops.filter((result) => result.category_id === 1).map(data => {

								let shop = {
									category_id: data.category_id,
									id: data.id,
									img_url: data.img_url,
									over_view: data.over_view,
									price: data.price,
									quantity: data.quantity,
									title: data.title
								};
								return (
									<Cards shop={shop} handleDelete={handleDelete} isLogged={isLogged} key={data.id} />
								)
							}) : <Spinner />}
						</div>
					</div>
				) : <div></div>}
				{shops && shops.filter((result) => result.category_id === 2).length > 0 ? (
					<div>
						<h2 style={{ color: 'white' }}>Clothes:</h2>
						<div className="cards-container">
							{shops ? shops.filter((result) => result.category_id === 2).map(data => {

								let shop = {
									category_id: data.category_id,
									id: data.id,
									img_url: data.img_url,
									over_view: data.over_view,
									price: data.price,
									quantity: data.quantity,
									title: data.title
								};
								return <Cards shop={shop} handleDelete={handleDelete} isLogged={isLogged} key={data.id} />
							}) : <Spinner />}
						</div>
					</div>
				) : <div></div>}
				{shops && shops.filter((result) => result.category_id === 2).length > 0 ? (<div>
					<h2 style={{ color: 'white' }}>Books:</h2>
					<div className="cards-container">

						{shops ? shops.filter((result) => result.category_id === 3).map(data => {

							let shop = {
								category_id: data.category_id,
								id: data.id,
								img_url: data.img_url,
								over_view: data.over_view,
								price: data.price,
								quantity: data.quantity,
								title: data.title
							};
							return <Cards shop={shop} handleDelete={handleDelete} isLogged={isLogged} key={data.id} />
						}) : <Spinner />}
					</div>
				</div>
				) : <div></div>}
			</Suspense>
			<Footer />
		</>
	)
}

export default Home;