import { useReducer } from 'react';
import { results, seasons , cog , drivers , race, standings , cross } from './images';
import { getFlagFromTrack , resetSeasonJSON } from './util/Utils';
import './Menu.css';

const Menu = (props) => {
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	const setActiveRace = (newActiveRace) => {
		let workingSeasonJSON = {...props.seasonJSON};
		workingSeasonJSON.races.map((race,raceIdx) => race.active = (raceIdx==newActiveRace) )
		props.setSeasonJSON(workingSeasonJSON);
	};

	return (
		<>
			<nav id="menu">
				<div className="cnt">
					<ul>
						<li className={(props.main==='Race')?'on':'off'} onClick={() => { props.setMain("Race") ; }}><span className="item"><img src={race} /><span className="txt">One&nbsp;Race</span></span></li>
						<li className={(props.main==='Seasons' || props.main==='Standings' || props.main==='Results' || props.main==='Round')?'on':'off'} onClick={() => { props.setMain("Seasons") ; }}><span className="item"><img src={seasons} /><span className="txt">Season</span></span></li>
						<li className={(props.main==='Drivers')?'on':'off'} onClick={() => { props.setMain("Drivers") ; }}><span className="item"><img src={drivers} /><span className="txt">Drivers</span></span></li>
						<li className={(props.main==='Config')?'on':'off'} onClick={() => { props.setMain("Config") ; }}><span className="item"><img src={cog} /><span className="txt">Settings</span></span></li>
					</ul>
				</div>
			</nav>
			<nav id="subm">
				{ (props.main==='Seasons' || props.main==='Standings' || props.main==='Results' || props.main==='Round') &&
					props.seasonJSON ?
						<div className="cnt">
							<ul>
								<li className="hdr"><span className="txt">{ props.seasonJSON.year}</span></li>
							</ul>
							<ul>
								<li className={(props.main==='Results')?'on':'off'} onClick={() => { props.setMain("Results") ; }}><span className="item"><img src={results} /><span className="txt">Results</span></span></li>
								<li className={(props.main==='Standings')?'on':'off'} onClick={() => { props.setMain("Standings") ; }}><span className="item"><img src={standings} /><span className="txt">Standings</span></span></li>
								{
									props.seasonJSON.races.map((race,raceIdx) => ( 
										race.active?<li key={raceIdx} className={((props.main==='Round' && race.active)?'on':'off')} onClick={(e) => { setActiveRace(raceIdx) ; props.setMain("Round") ; forceUpdate() }}><span className="item"><img src={getFlagFromTrack(race.track,true)} /><span className="txt">Current Race</span></span></li>:null
									))
								}
							</ul>
							<ul>
								<li onClick={() => { resetSeasonJSON(props.setSeasonJSON,props.setMain) ; }}><span className="item"><img src={cross} /><span className="txt">Abandon Season</span></span></li>
							</ul>
						</div>
					:null
				}
			</nav>
		</>
	);
}

export default Menu