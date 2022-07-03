import { useState } from 'react';
import { Modal, Button, Form, Alert, Row, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'react-cookies';
import './add_items.scss'

function Add_Items (props) {
	const [validated, setValidated] = useState(false);
	const [product, setProduct] = useState({})

	const handleChange = (e) => {
		// console.log('state change====>',product);
		setProduct({ ...product, [e.target.name]: e.target.value })
	}
	const handleSubmit = (event) => {

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		console.log('is start', product.img_url);
		setValidated(true);
		event.preventDefault();
		const params = JSON.stringify({
			"category_id": product.category_id,
			"img_url": product.img_url,
			"over_view": product.over_view,
			"price": product.price + "JD",
			"quantity": product.quantity,
			"title": product.title,
		});

		axios.post('http://localhost:3333/product', params, {

			"headers": {
				"content-type": "application/json",
				"authorization": `Berar ${Cookies.load("remember_user")}`
			},

		}).then(response => {
			console.log('this is response', response);
		}).catch((error) => {
			console.error(error, "hellllllllllooo");
		});
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Row className="mb-3">
				<Form.Group as={Col} md="4" controlId="validationCustom01">
					<Form.Label>Category Id</Form.Label>
					<Form.Control
						required
						name="category_id"
						type="text"
						placeholder="category id"
						onChange={handleChange}
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Col} md="4" controlId="validationCustom02">
					<Form.Label>Product Image</Form.Label>
					<Form.Control
						required
						name="img_url"
						type="text"
						placeholder="url"
						onChange={handleChange}
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Col} md="4" controlId="validationCustomUsername">
					<Form.Label>Overview</Form.Label>
					<InputGroup hasValidation>
						<Form.Control
							type="text"
							name="over_view"
							placeholder="EX: Iphone"
							aria-describedby="inputGroupPrepend"
							required
							onChange={handleChange}
						/>
						<Form.Control.Feedback type="invalid">
							Too long
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>
			</Row>
			<Row className="mb-3">
				<Form.Group as={Col} md="6" controlId="validationCustom03">
					<Form.Label>Price</Form.Label>
					<Form.Control type="text" placeholder="price in JD" name="price" required onChange={handleChange} />
					<Form.Control.Feedback type="invalid">
						Please provide a valid price.
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Col} md="3" controlId="validationCustom04">
					<Form.Label>Quantity</Form.Label>
					<Form.Control type="number" placeholder="Quantity" name="quantity" required  onChange={handleChange}/>
					<Form.Control.Feedback type="invalid">
						Please provide a valid state.
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Col} md="3" controlId="validationCustom05">
					<Form.Label>Product Title</Form.Label>
					<Form.Control type="text" placeholder="Title" name="title" required  onChange={handleChange}/>
					<Form.Control.Feedback type="invalid">
						Please provide a valid Title.
					</Form.Control.Feedback>
				</Form.Group>
			</Row>
			<Button className="trans" type="submit">Submit form</Button>
		</Form>
	);
}

export default Add_Items;