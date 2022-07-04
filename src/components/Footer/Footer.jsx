import { Github, Linkedin } from 'react-bootstrap-icons';
import './footer.scss'

function Footer () {
	return (
		<div className="footer-basic">
			<footer>
				<div className="social">
					<a href="https://github.com/Ammarhr"><Github /></a>
					<a href="https://www.linkedin.com/in/ammar-al-hariry/"><Linkedin /></a>
					<p className="copyright">Ammarhr © 2022</p>
				</div>
			</footer>
		</div>
	)
}

export default Footer;