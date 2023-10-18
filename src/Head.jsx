import './Head.css';

const Head = (props) => {
	return (
		<header id="head">
			<h1>{props.head}</h1>
		</header>
	);
}

export default Head;