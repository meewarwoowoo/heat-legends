import React from 'react';
import { defaultSeasonsJSON , defaultSeasonEventsJSON , defaultPointsJSON } from './localJSON';
import { getFlagFromTrack , getTrackFromAbbr , doToast , doConfirm } from './util/Utils';
import './Seasons.css';

const Seasons = (props) => {
	const  loadSeasonJSON = (seasonYearIdx) => {
		doConfirm("Are you sure you want to start a new season?", ()=> {
			let workingSeasonJSON = defaultSeasonsJSON[seasonYearIdx];
			workingSeasonJSON.races.map( (race,idx) => { 
				race.active = false;
				race.result = [];
				race.points = defaultPointsJSON ;
			});
			workingSeasonJSON.races[0].active = true ;
			if(workingSeasonJSON.year==='1961'){
				workingSeasonJSON.races[0].event = defaultSeasonEventsJSON[workingSeasonJSON.races[0].event];
				workingSeasonJSON.races[1].event = defaultSeasonEventsJSON[workingSeasonJSON.races[1].event];
				workingSeasonJSON.races[2].event = defaultSeasonEventsJSON[workingSeasonJSON.races[2].event];
				workingSeasonJSON.races[2].points =  [11,6,4,3,2,1,0,0,0,0]
			};
			if(workingSeasonJSON.year==='1962'){
				workingSeasonJSON.races[0].event = defaultSeasonEventsJSON[workingSeasonJSON.races[0].event];
				workingSeasonJSON.races[1].event = defaultSeasonEventsJSON[workingSeasonJSON.races[1].event];
				workingSeasonJSON.races[2].event = defaultSeasonEventsJSON[workingSeasonJSON.races[2].event];
				workingSeasonJSON.races[2].points = [10,7,5,3,2,1,0,0,0,0]
			};
			if(workingSeasonJSON.year==='1963 Legacy'){
				workingSeasonJSON.races[3] // LOads of Stuff
				workingSeasonJSON.races[0].event = defaultSeasonEventsJSON[workingSeasonJSON.races[0].event];
				workingSeasonJSON.races[1].event = defaultSeasonEventsJSON[workingSeasonJSON.races[1].event];
				workingSeasonJSON.races[2].event = defaultSeasonEventsJSON[workingSeasonJSON.races[2].event];
				workingSeasonJSON.races[3].event = defaultSeasonEventsJSON[workingSeasonJSON.races[3].event];
			};
			if(workingSeasonJSON.year==='1963'){
				workingSeasonJSON.races[2].points = [14,9,6,5,3,2,0,0,0,0]
				workingSeasonJSON.races[0].event = defaultSeasonEventsJSON[workingSeasonJSON.races[0].event];
				workingSeasonJSON.races[1].event = defaultSeasonEventsJSON[workingSeasonJSON.races[1].event];
				workingSeasonJSON.races[2].event = defaultSeasonEventsJSON[workingSeasonJSON.races[2].event];
			};
			if(workingSeasonJSON.year==='1964'){
				workingSeasonJSON.races[2].points =  [10,8,6,3,2,1,0,0,0,0]
				workingSeasonJSON.races[0].event = defaultSeasonEventsJSON[workingSeasonJSON.races[0].event];
				workingSeasonJSON.races[1].event = defaultSeasonEventsJSON[workingSeasonJSON.races[1].event];
				workingSeasonJSON.races[2].event = defaultSeasonEventsJSON[workingSeasonJSON.races[2].event];
			};
			props.setSeasonJSON(workingSeasonJSON)
			props.setMain('Season')
			doToast('Starting Year ' + workingSeasonJSON.year);
		});
	};

	const resetSeasonJSON = () => {
		doConfirm("Reset and delete all the season?", () => {
			props.setSeasonJSON(null);
			props.setMain('Seasons');
			window.scrollTo(0, 0)
		});
	};
	
	return (
		<>
			<section id="main" className={props.getMainClassList()}>
				<section className="control-panel--seasons--pick-season">
					<header>
						<h2>Championships</h2>
					</header>
					{ defaultSeasonsJSON.map( (season,idx) => (
						<article key={'season-'+(season.year).replace(' ','-').toLowerCase()} className={ (props.seasonJSON && (season.year==props.seasonJSON.year)?"on":"off") +' '+ ("season-"+(season.year).replace(' ','-').toLowerCase()) }>
							<label>
								<button onClick={(e) => { loadSeasonJSON(Number(idx)) }}>Start {season.year}</button>
								<h3>{season.year}</h3>
								<div className="season">
									{ 
										season.races.map( (race,raceIdx) =>  (  
											<ul key={raceIdx}>
												<li className="flag"><img src={getFlagFromTrack(race.track)} /></li>
												<li className="name">{getTrackFromAbbr(race.track).name}</li>
												<li className="laps">{getTrackFromAbbr(race.track).laps} Laps</li>
											</ul>
										))
									}
								</div>
							</label>
						</article>
					))}
				</section>

				<section className="control-panel--actions">
					<header>
						<h3>Actions</h3>
					</header>

					{ defaultSeasonsJSON.map( (season,idx) => (
						<label className={"action season-"+(season.year).replace(' ','-').toLowerCase()}>
							<button onClick={(e) => { loadSeasonJSON(Number(idx)) }}>{season.year}</button>
							<span className="hdr">{season.year}</span>
							<span className="txt">Start the {season.year} Championship.</span>
						</label>
					))}

					<label className="action">
						<button onClick={() => { props.setMain("Config") ; }}>Settings</button>
						<span className="hdr">Settings</span>
						<span className="txt">Change the number of races in the 1963 Championship.</span>
					</label>

					<label className="action warning">
						<button onClick={resetSeasonJSON}>Reset</button>
						<span className="hdr">Reset</span>
						<span className="txt">Remove all results for the current Championship.</span>
					</label>
				</section>

			</section>
			<section id="deck"></section>
			<section id="next"></section>
		</>
	)
}



export default Seasons;
