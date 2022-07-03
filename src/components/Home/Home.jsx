import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import Cookies from 'react-cookies';
import './home.scss';

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Music = React.lazy(() => import('../Music/Music'));

function Home () {

	const [songs, setSong] = useState('');

	let keyCounter = 0;
	const handleGetsongs = () => {
		console.log('redo');
		var options = {
			method: 'GET',
			url: 'http://localhost:3333/product',
			// params: { locale: 'en-US' },
			// headers: {
			// 	'x-rapidapi-host': 'shazam.p.rapidapi.com',
			// 	'x-rapidapi-key': API_KRY,
			// }
		};
		axios.request(options).then((response) => {
			setSong(response.data)
			console.log(response.data)

		}).catch((error) => {
			console.error(error);
		});
	}
	const handleDelete = (_id) => {
		console.log('this is product _id', _id);
		axios.delete(`http://localhost:3333/product/${_id}`, {

			"headers": {
				"content-type": "application/json",
				"authorization": `Berar ${Cookies.load("remember_user")}`
			},

		}).then(response => {
			handleGetsongs();
			console.log('this is response', response);
		}).catch((error) => {
			console.error(error, "error message");
		});
	}
	useEffect(() => {
		handleGetsongs();
	}, []);

	return (<>
		<Header />
		<div className="cards-container">

			{/* {songs ? '' : handleGetsongs()} */}
			{songs ? songs.map(data => {

				let song = {
					category_id: data.category_id,
					id: data.id,
					img_url: data.img_url,
					over_view: data.over_view,
					price: data.price,
					quantity: data.quantity,
					title: data.title
				};
				return (
					<Card className="card" key={keyCounter++}>
						<Card.Img alt={data.title} variant="top" src={data.img_url ? data.img_url : 'https://assets.considerable.com/wp-content/uploads/2018/07/12115639/music_hero_con.jpg'} />
						<Card.Body>
							<Card.Text>
								{data.title} <TrashFill style={{ color: 'red' }} onClick={() => handleDelete(data.id)} />
							</Card.Text>
						</Card.Body>
						<div style={{ textAlign: 'center', margin: '5%' }}>
							<Music key={'a' + keyCounter++} {...song} />

						</div>
					</Card>
				)
			}) : <Spinner />}
		</div>
		<Footer />
	</>
	)
}

export default Home;