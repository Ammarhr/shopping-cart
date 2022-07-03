import { Navbar, Container, Button } from 'react-bootstrap';
import {
	Link
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'react-cookies';
import jwt_decode from 'jwt-decode';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import './header.scss';

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
			<Navbar bg="dark" variant="dark">
				{/* {console.log(jwt_decode(Cookies.get('remember token')))} */}
				<Container>
					<Navbar.Brand href="#home">	
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/add">Add Items</Link></li>
						</ul>
					</Navbar.Brand>
					<Navbar.Brand >
						{isLogged ? user_name : <Login changeLogged={changeLogged} />}
						{isLogged ? <Button className={"signout"} onClick={handleLogOut}>LogOut</Button> : <Signup changeLogged={changeLogged} />}
					</Navbar.Brand>
				</Container>
			</Navbar>
	)
}

export default Header;