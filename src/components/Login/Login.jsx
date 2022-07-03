import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'react-cookies';

function Login (props) {
	const [show, setShow] = useState(false);
	const [user, setUser] = useState({})
	const [alertShow, setAlertShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleChange = (e) => { setUser({ ...user, [e.target.name]: e.target.value }) }
	const handleSubmit = (e) => {
		e.preventDefault();

		let options = {
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				authorization: `Basic ${btoa(`${user.user_name}:${user.user_password}`)}`
			},
			referrerPolicy: 'no-referrer',
		}

		axios.post('http://localhost:3333/signin', {}, options).then(response => {
			// console.log(response, 'response');
			handleClose();
			Cookies.save('remember_user', response.data)
			props.changeLogged(true)
		}).catch((error) => {
			setAlertShow(true)
			console.error(error, "server side error ");
		});
	};

	const handleAlert = () => {
		if (alertShow) {
			return (
				<Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>
						Wrong user or Password
					</p>
				</Alert>
			);
		}
	}

	return (
		<>
			<Button className="trans" onClick={handleShow}>
				SignIn
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>SignIn</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>User Name</Form.Label>
							<Form.Control type="user" placeholder="User Name" name="user_name" onChange={handleChange} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" name="user_password" onChange={handleChange} />
						</Form.Group>
						<Button className="trans" variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
				{handleAlert()}
			</Modal>
		</>
	)
}

export default Login;