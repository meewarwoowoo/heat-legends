import './Head.css';

const Head = (props) => {
	return (
		<header id="head">
			<h1>Heat: Legends &amp; Championships</h1>
			{props.head}
		</header>
	);
}

export default Head;