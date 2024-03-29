import React from 'react';
import { getNumberWithOrdinal , getDriverFromId , getDriverArticleDataColour , getFlagFromTrack , getResultFromRace , getPointsFromRace , getTrackFromAbbr , doConfirm } from './util/Utils';
import Header from './Header';
import './Results.css';

const Season = (props) => {
	
	const SeasonRaceStartButton = (props) => {
		return <button onClick={((e) => { setActiveRace(props.raceIdx) ; props.setMain('Round') ; })}>Go To Race</button>
	};

	const setActiveRace = (newActiveRace) => {
		let workingSeasonJSON = {...props.seasonJSON};
		workingSeasonJSON.races.map((race,raceIdx) => race.active = (raceIdx==newActiveRace) );
		props.setSeasonJSON(workingSeasonJSON)
	};

	const SeasonRaceWinner = (props) => {
		if(props.race.result.length>0) {
			return (
				<ol className="results"> { props.race.result.map((driver,driverIdx) => ( 
				<li key={driverIdx} style={getDriverArticleDataColour(getDriverFromId(props.driversJSON,driver))}>
					<span className="position">{getNumberWithOrdinal(driverIdx + 1)}</span>
					<span className="driver">{getDriverFromId(props.driversJSON,driver).name}</span>
				</li> ))} 
				</ol>
			);
		}
		return <ol className="no-results"><li>No results</li></ol>
	};

	const seasonStandingsCreate = (props) => {
		let standings = new Array();
		props.driversJSON.forEach((driver,idx) => { 
			let standingsDriver = [driver];
			let standingsDriverPoints = Number(0);
			props.seasonJSON.races.forEach((race,raceIdx) => {
				standingsDriver.push({ result: getResultFromRace(race,driver.id) , points: getPointsFromRace(race,driver.id) });
				standingsDriverPoints = Number(standingsDriverPoints) + Number(getPointsFromRace(race,driver.id)) ;
			});
			standingsDriver.push(standingsDriverPoints);
			if(standingsDriver[0].active){
				standings.push(standingsDriver);
			};
		});
		standings.sort((a, b) => a[a.length-1] - b[b.length-1]).reverse();
		return standings;
	};

	const SeasonResultsBodyRow = (props) => {
		let line = '';
		if(props.standingRowIdx === 0) {
			line = <><th className="driver">{props.standingRow.name}</th><td className="team">{props.standingRow.team}</td><td className="colour">{props.standingRow.colour}</td></>;
		} else if(props.standingRowIdx === (props.finalRowIdx-1)) {
			line = <><td className="total">{props.standingRow}</td></>;
		} else {
			line = <><td className="result">{props.standingRow.result}</td><td className="result">{props.standingRow.points}</td></>;
		}
		return line 
	};
	const isRaceFinished = (race) => {
		return (race && race.result && race.result.length>0)
	}

	const hasActiveRace = (seasonJSON) => {
		return seasonJSON.races.indexOf(seasonJSON.races.find((race,idx)=>race.active))>=0?' season-ongoing ':' season-over ';
	}

	const resetSeasonJSON = () => {
		doConfirm("Are you sure you want to remove all the results from this season?", () => {
			props.setSeasonJSON(null);
			props.setMain('Seasons');
			window.scrollTo(0, 0)
		});
	};
	
	const hasPressCorner = (camera) => {
		return (camera === '')?<li className="item press">No Press Corner</li>:<li className="item press">Press Corner is {camera}</li>
	}

	const hasSponsorCards = (sponsor) => {
		return (sponsor === 0)?<li className="item card">No Sponsor Cards</li>:<li className="item card">{sponsor} Sponsor Card{sponsor===1?'':'s'}</li>
	}


	if(!props.seasonJSON){
		return <p>Error: !seasonJSON</p>
	}
	else{
		const seasonStandings = seasonStandingsCreate(props);
		return (
			<>
				<main className={props.getMainClassList() + hasActiveRace(props.seasonJSON) }>
					<section className="cnt--results--pick-race">
						<Header {...props}/>
						<div className="full">
							{ 
								props.seasonJSON.races.map( 
									(race,raceIdx) =>  (  
										<article key={raceIdx} className={(race.active?"on":"off") +' '+  (isRaceFinished(race)?"results":"no-results")}>
											<label>
												<h3>{getTrackFromAbbr(race.track).name}</h3>
												<ul>
													<li className="flag"><img src={getFlagFromTrack(race.track)} /></li>
													<li className="name">{getTrackFromAbbr(race.track).name}</li>
													<li className="action"><SeasonRaceStartButton race={race} raceIdx={raceIdx} {...props}/></li>
													<li className="item laps">{getTrackFromAbbr(race.track).laps} Laps</li>
													{hasPressCorner(race.cameras) }
													{hasSponsorCards(race.sponsors) }
													<li className="item event">{race.event}</li>
												</ul>
												<SeasonRaceWinner race={race} {...props} />
											</label>
										</article>
									) 
								)
							}
						</div>
					</section>


					<section className="cnt--actions">
						<header>
							<h3>Actions</h3>
						</header>
						<label className="action warning">
							<button onClick={resetSeasonJSON}>Reset</button>
							<span className="hdr action-do">Reset</span>
							<span className="txt">Remove all results for The {props.seasonJSON.year} Championship.</span>
						</label>
					</section>

				</main>
				<section id="deck"></section>
			</>
		);
	};
};
	

export default Season
