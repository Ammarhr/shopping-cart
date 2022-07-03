import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'react-cookies';

function Signup (props) {

	const [show, setShow] = useState(false);
	const [alertShow, setAlertShow] = useState(false);
	const [user, setUser] = useState({})

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

	const handleSubmit = (e) => {
		e.preventDefault();

		const params = JSON.stringify({
			"user_name": user.user_name,
			"user_password": user.user_password,
			"email": user.email,
		});

		axios.post('http://localhost:3333/signup', params, {

			"headers": {
				"content-type": "application/json",
			},

		}).then(response => {
			handleClose();
			console.log('this is response', response);
			Cookies.save('remember_user', response.data)
			props.changeLogged(true)
		}).catch((error) => {
			setAlertShow(true)
			console.error(error, "hellllllllllooo");
		});
	};

	const handleAlert = () => {
		if (alertShow) {
			return (
				<Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>
						User name or Email is taken
					</p>
				</Alert>
			);
		}
	}
	return (
		<>
			<Button className="trans" variant="primary" onClick={handleShow}>
				Signup
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Signup</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>User Name</Form.Label>
							<Form.Control type="user" placeholder="User Name" name="user_name" onChange={handleChange} required />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} required />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" name="user_password" onChange={handleChange} required />
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

export default Signup;