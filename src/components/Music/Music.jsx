import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './music.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

function Music (props) {

	const audio = new Audio(props.songUrl);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handlePlay = () => audio.play();
	const handleStop = () => audio.pause();

	return (
		<div>
			<Button style={{ backgroundColor: 'transparent', color: 'white' }} onClick={handleShow}>
				More Info
				{console.log('from music', props)}
			</Button>
			<Modal show={show} style={{ maxWidth: "30erm", color: "black" }} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.img_url ?
						<img className='artist-image' src={props.img_url} alt={props.title} />
						: <div id='loading' style={{ margin: '0 auto', maxHeigh: '5rem' }}>
							<img src='https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif' alt='loading' />
						</div>}
				</Modal.Body>
				<Modal.Footer >
					{props.over_view}
				</Modal.Footer>
				<Modal.Footer >
					Price:	{props.price}
					<br/>
					In stock:	{props.quantity}
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Music;