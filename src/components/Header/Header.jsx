/* eslint-disable react/jsx-pascal-case */
import { Navbar, Container, Button } from 'react-bootstrap';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'react-cookies';
import jwt_decode from 'jwt-decode';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Add_Items from '../Add_Items/Add_Items';
import './header.scss';
// import Home from '../Home/Home'

function Header (props) {
	const [isLogged, setIsLogged] = useState(false);
	const [user_name, setUser_name] = useState('');

	const getUser = async () => {

		let token = Cookies.load('remember_user');

		if (token) {
			let userName = await jwt_decode(token).user_name;
			setIsLogged(true)
			setUser_name(userName)
		} else {
			setIsLogged(false)
		}
	}

	const handleLogOut = () => {

		Cookies.remove('remember_user');

		setIsLogged(false)
	}

	const changeLogged = (logged) => {
		setIsLogged(logged)
	}

	useEffect(() => {
		getUser();
	}, [isLogged], handleLogOut);

	return (

		<Router>
			<Navbar bg="dark" variant="dark">
				{/* {console.log(jwt_decode(Cookies.get('remember token')))} */}
				<Container>
					{/* <Navbar.Brand href="#home">
						
					</Navbar.Brand> */}
					<Link to="/">Shopping Cart</Link>
					<Link to="/add">add Items</Link>
					<Navbar.Brand >
						{isLogged ? user_name : <Login changeLogged={changeLogged} />}
						{isLogged ? <Button className={"signout"} onClick={handleLogOut}>LogOut</Button> : <Signup changeLogged={changeLogged} />}
					</Navbar.Brand>
				</Container>
			</Navbar>
			<Routes>
				<Route exact path='/add' element={<Add_Items />}></Route>
			</Routes>
		</Router>
	)
}

export default Header;