import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
		changelogged(false)
	}

	const changelogged = (logged) => {
		setIsLogged(logged)
		props.checklogged(logged)
	}

	useEffect(() => {
		getUser();
	}, [isLogged], handleLogOut);

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand>
					<ul>
						<li><Link to="/">Home</Link></li>
						{isLogged ? <li><Link to="/add">Add Items</Link></li> : ''}
					</ul>
				</Navbar.Brand>
				<Navbar.Brand >
					{isLogged ? user_name : <Login changelogged={changelogged} />}
					{isLogged ? <Button className={"signout"} onClick={handleLogOut} style={{ marginLeft: '4%' }}>LogOut</Button> : <Signup changelogged={changelogged} />}
				</Navbar.Brand>
			</Container>
		</Navbar>
	)
}

export default Header;