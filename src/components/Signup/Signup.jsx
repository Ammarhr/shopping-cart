import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function Signup (props) {
	const [show, setShow] = useState(false);
	const [user_password, setUser_password] = useState('');
	const [user_name, setUser_name] = useState('');
	const [email, setEmail] = useState('');
	const [alertShow, setAlertShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleChangePassword = (e) => setUser_password(e.target.value)
	const handleChangeUserName = (e) => setUser_name(e.target.value)
	const handleChangeEmail = (e) => setEmail(e.target.value)
	const handleSubmit = (e) => {
		e.preventDefault();

		const params = JSON.stringify({
			"user_name": user_name,
			"user_password": user_password,
			"email": email,
		});

		axios.post('http://localhost:3333/signup', params, {

			"headers": {
				"content-type": "application/json",
			},

		}).then(response => {
			handleClose();
			console.log('this is response',response);
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
							<Form.Control type="user" placeholder="User Name" onChange={(e) => handleChangeUserName(e)} required/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" onChange={(e) => handleChangeEmail(e)} required />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" onChange={(e) => handleChangePassword(e)} required/>
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