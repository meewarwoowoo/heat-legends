import React from 'react';


const SeasonHeader = (props) => {
	return (
		<header className="championship">
			<h2>Championship</h2>
			<h3><span>{props.seasonJSON.year}</span></h3>
			<ul>
				<li className={(props.main==='Results')?'on':'off'}  onClick={() => { props.setMain("Results") ; }}><span>Results</span></li>
				<li className={(props.main==='Standings')?'on':'off'}  onClick={() => { props.setMain("Standings") ; }}><span>Standings</span></li>
				<li className={(props.main==='Round')?'on':'off'}  onClick={() => { props.setMain("Round") ; }}><span>Race</span></li>
			</ul>
		</header>
	)
}

export default SeasonHeader;