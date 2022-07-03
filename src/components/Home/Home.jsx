import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import './home.scss';

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
	useEffect(() => {
		handleGetsongs();
	}, []);
	// useMemo(()=> handleGetsongs,[songs])

	return (
		<div className="cards-container">
			{/* {songs ? '' : handleGetsongs()} */}
			{songs ? songs.map(data => {
					let song = {
						category_id: data.category_id,
						id: data.id,
						img_url: data.img_url,
						over_view:data.over_view,
						price: data.price,
						quantity: data.quantity,
						title: data.title
					};
					return (
						<Card className="card" key={keyCounter++}>
							<Card.Img alt={data.title} variant="top" src={data.img_url ? data.img_url : 'https://assets.considerable.com/wp-content/uploads/2018/07/12115639/music_hero_con.jpg'} />
							<Card.Body>
								<Card.Text>
								{data.title}
								</Card.Text>
							</Card.Body>
							<div style={{ textAlign: 'center', margin: '5%' }}>
								<Music key={'a' + keyCounter++} {...song} />
							</div>
						</Card>
					)
				}) : <Spinner />}
		</div>
	)
}

export default Home;