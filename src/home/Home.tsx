import { Link } from "react-router-dom";
import "./styles/home.css";

export default function Home() {
	return (
		<>
			<h1>ISecure</h1>
			<div id="list">
				<article>
					<h2>Password Validator</h2>
					<p>
						Here you can validate a password to see how can you
						upgrade it.
					</p>
					<Link to="/pvalidator">Go!</Link>
				</article>
				<article>
					<h2>Password Generator</h2>
					<p>
						Here you can generate a password indicating some
						parameters.
					</p>
					<Link to="/pgenerator">Go!</Link>
				</article>
				<article>
					<h2>Encrypter</h2>
					<p>
						Here you can encrypt and decrypt text using different
						algorithms.
					</p>
					<Link to="/encrypter">Go!</Link>
				</article>
			</div>
		</>
	);
}
