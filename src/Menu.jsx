import React , { useReducer } from 'react';
import { season, seasons , cog , drivers , race } from './images';
import { getFlagFromTrack } from './util/Utils';
import './Menu.css';

const Menu = (props) => {
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	const setActiveRace = (newActiveRace) => {
		let workingSeasonJSON = {...props.seasonJSON};
		workingSeasonJSON.races.map((race,raceIdx) => race.active = (raceIdx==newActiveRace) )
		props.setSeasonJSON(workingSeasonJSON);
	};

	return (
		<nav id="menu">
			<div className="fix">
				<ul>
					<li className={(props.main==='Race')?'on':'off'} onClick={() => { props.setMain("Race") ; }}><span><img src={race} /></span></li>
				</ul>
				<ul>
					<li className={(props.main==='Seasons')?'on':'off'} onClick={() => { props.setMain("Seasons") ; }}><span><img src={seasons} /></span></li>
					{props.seasonJSON ? 
						<>
							<li className={(props.main==='Season')?'on':'off'} onClick={() => { props.setMain("Season") ; }}><span><img src={season} /></span></li>
						</>
						:null}
					{props.seasonJSON ? 
						props.seasonJSON.races.map((race,raceIdx) => ( 
							<li key={raceIdx} className={((props.main==='Round' && race.active)?'on':'off')} onClick={(e) => { setActiveRace(raceIdx) ; props.setMain("Round") ; forceUpdate() }}><span><img src={getFlagFromTrack(race.track,true)} /></span></li>
						))
					:null}
				</ul>
				<ul>
					<li className={(props.main==='Drivers')?'on':'off'} onClick={() => { props.setMain("Drivers") ; }}><span><img src={drivers} /></span></li>
					<li className={(props.main==='Config')?'on':'off'} onClick={() => { props.setMain("Config") ; }}><span><img src={cog} /></span></li>
				</ul>
			</div>
		</nav>
	);
}

export default Menu