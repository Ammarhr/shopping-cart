import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './details.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

function Details (props) {

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<Button style={{ backgroundColor: 'transparent', color: 'white' }} onClick={handleShow}>
				More Info
			</Button>
			<Modal show={show} style={{ maxWidth: "30erm", color: "black" }} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{props.shop.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.shop.img_url ?
						<img className='artist-image' src={props.shop.img_url} alt={props.title} />
						: <div id='loading' style={{ margin: '0 auto', maxHeigh: '5rem' }}>
							<img src='https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif' alt='loading' />
						</div>}
				</Modal.Body>
				<Modal.Footer >
					{props.shop.over_view}
				</Modal.Footer>
				<Modal.Footer >
					Price:	{props.shop.price}
					<br/>
					In stock:	{props.shop.quantity}
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Details;