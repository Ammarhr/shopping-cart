import React, { useState} from 'react';
import { Card } from 'react-bootstrap';
import Music from '../Music/Music'
function Cards(props){


	let keyCounter = 0;

	let songItem = {
		category_id: props.song.category_id,
		id: props.song.id,
		img_url: props.song.img_url,
		over_view: props.song.over_view,
		price: props.song.price,
		quantity: props.song.quantity,
		title: props.song.title
	};
	return(
		<Card className="card" key={keyCounter++}>
			{console.log(props,'props')}
		<Card.Img alt={props.song.title} variant="top" src={props.song.img_url ? props.song.img_url : 'https://assets.considerable.com/wp-content/uploads/2018/07/12115639/music_hero_con.jpg'} />
		<Card.Body>
			<Card.Text>
				{props.song.title}
			</Card.Text>
		</Card.Body>
		<div style={{ textAlign: 'center', margin: '5%' }}>
			<Music key={'a' + keyCounter++} {...songItem} />

		</div>
	</Card>
	)
}

export default Cards;