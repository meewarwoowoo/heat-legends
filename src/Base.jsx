import './Base.css';

const Base = (props) => {

	return (
		<section id="base">
			<div className="cnt">
				<div className="legends-level">
					<span className="txt">Legends Level { props.configJSON.legendsLevel }</span>
				</div>
			</div>
		</section>

	);
}

export default Base