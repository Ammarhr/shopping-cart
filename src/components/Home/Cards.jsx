import { Card } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import Details from '../Details/Details';
import './home.scss'


function Cards (props) {


	let keyCounter = 0;

	let shopItem = {
		category_id: props.shop.category_id,
		id: props.shop.id,
		img_url: props.shop.img_url,
		over_view: props.shop.over_view,
		price: props.shop.price,
		quantity: props.shop.quantity,
		title: props.shop.title
	};
	return (
		<Card className="card" key={keyCounter++}>
			<Card.Img alt={props.shop.title} variant="top" src={props.shop.img_url ? props.shop.img_url : 'https://www.crushpixel.com/big-static14/preview4/online-shop-logo-business-1571959.jpg'} />
			<Card.Body>
				<Card.Text>
					{props.shop.title}
					{props.isLogged ? <TrashFill style={{ color: 'red', marginLeft:'5%' }} onClick={() => props.handleDelete(props.shop.id)} /> : ''}
				</Card.Text>
			</Card.Body>
			<div style={{ textAlign: 'center', margin: '5%' }}>
					<Details key={props.shop.id} shop={shopItem} />
			</div>
		</Card>
	)
}

export default Cards;