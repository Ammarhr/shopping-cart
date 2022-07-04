import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'react-cookies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import './AddItems.scss'

function Add_Items (props) {
	const [validated, setValidated] = useState(false);
	const [product, setProduct] = useState({})
	const [isLogged, setIsLogged] = useState(false);
	
	const navigate = useNavigate();
	const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value })
	const checkLogged = (logged) => setIsLogged(logged);
	const handleSubmit = (event) => {

		setValidated(true);
		event.preventDefault();
		const params = JSON.stringify({
			"category_id": product.category_id || "1",
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
			navigate('/')
		}).catch((error) => {
			console.error(error, "error:");
		});
	};

	return (
		<div className="form-container">
			<Header checkLogged={checkLogged}/>

			<Form noValidate validated={validated} id='form-add-items' onSubmit={handleSubmit}>
				<Row className="mb-3">
					<Form.Group as={Col} md="4">
						<Form.Label>Category</Form.Label>
						<Form.Select type={"select"} size='2' onChange={handleChange} required name="category_id">
							<option value={"1"}>Electronics</option>
							<option value={"2"}>Clothes</option>
							<option value={"3"}>Books</option>
						</Form.Select >
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} md="4" >
						<Form.Label>Product Image</Form.Label>
						<Form.Control
							required
							name="img_url"
							type="text"
							placeholder="url"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group as={Col} md="4">
						<Form.Label>Overview</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								type="text"
								name="over_view"
								placeholder="EX: Iphone"
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
					<Form.Group as={Col} md="6" >
						<Form.Label>Price</Form.Label>
						<Form.Control type="text" placeholder="price in JD" name="price" required onChange={handleChange} />
						<Form.Control.Feedback type="invalid">
							Please provide a valid price.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} md="3">
						<Form.Label>Quantity</Form.Label>
						<Form.Control type="number" placeholder="Quantity" name="quantity" required onChange={handleChange} />
						<Form.Control.Feedback type="invalid">
							Please provide a valid state.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} md="3" >
						<Form.Label>Product Title</Form.Label>
						<Form.Control type="text" placeholder="Title" name="title" required onChange={handleChange} />
					</Form.Group>
				</Row>
				<Button className="trans" type="submit" >Submit form</Button>
			</Form>
			<Footer />
		</div>
	);
}

export default Add_Items;