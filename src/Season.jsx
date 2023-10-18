import React from 'react';
import { getNumberWithOrdinal , getDriverFromId , getDriverArticleDataColour , getFlagFromTrack , getResultFromRace , getPointsFromRace , getTrackFromAbbr , doToast , doConfirm } from './util/Utils';
import './Season.css';

const Season = (props) => {
	
	const resetSeasonJSON = () => {
		doConfirm("Reset and delete all the season?", () => {
			props.setSeasonJSON(null);
			props.setMain('Seasons');
		});
	};

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

	if(!props.seasonJSON){
		return <p>Error: !seasonJSON</p>
	}
	else{
		const seasonStandings = seasonStandingsCreate(props);
		return (
			<>
				<section id="main" className={props.getMainClassList() + hasActiveRace(props.seasonJSON) }>
					<header className="header--season--pick-race">
						<h2>{props.seasonJSON.year} Races</h2>
					</header>

					<section className="control-panel--season--pick-race">
						{ 
							props.seasonJSON.races.map( 
								(race,raceIdx) =>  (  
									<article key={raceIdx} className={(race.active?"on":"off") +' '+  (isRaceFinished(race)?"results":"no-results")}>
										<label>
											<SeasonRaceStartButton race={race} raceIdx={raceIdx} {...props}/>
											<h3>{getTrackFromAbbr(race.track).name}</h3>
											<ul>
												<li className="flag"><img src={getFlagFromTrack(race.track)} /></li>
												<li className="name">{getTrackFromAbbr(race.track).name}</li>
												<li className="item laps">{getTrackFromAbbr(race.track).laps} Laps</li>
												<li className="item press">Press Corner is {race.cameras}</li>
												<li className="item card">{race.sponsors} Sponsor Card{race.sponsors===1?'':'s'}</li>
												<li className="item event">{race.event}</li>
											</ul>
											<SeasonRaceWinner race={race} {...props} />
										</label>
									</article>
								) 
							)
						}
					</section>

					<header className="header--season--standings">
						<h2>{props.seasonJSON.year} Standings</h2>
					</header>

					<section className="control-panel--season--standings">
						<table>
							<thead>
								<tr>
									<th className="position">&nbsp;</th>
									<th className="driver">Driver</th>
									<th className="team">Team</th>
									<th className="colour">Colour</th>
									{ props.seasonJSON.races.map((race,raceIdx) => ( <th colSpan="2" key={race.track}><img src={getFlagFromTrack(race.track)} /></th> )) }
									<th className="total">Total</th>
								</tr>
							</thead>
							<tbody>
								{ seasonStandings.map((driverStandingRow,driverStandingRowIdx) => 
									<tr key={'driverStandingRowIdxTR'+driverStandingRowIdx} style={getDriverArticleDataColour(driverStandingRow[0])} >
										<th key={'driverStandingRowIdxTH'+driverStandingRowIdx} className="position">{getNumberWithOrdinal(driverStandingRowIdx+1)}</th>
										{
											driverStandingRow.map((standingRow,standingRowIdx) => (
												<SeasonResultsBodyRow key={'SeasonResultsBodyRow'+standingRowIdx} finalRowIdx={driverStandingRow.length} driverStandingRow={driverStandingRow} standingRow={standingRow} standingRowIdx={standingRowIdx} />
											))
										}
									</tr>
								)}
							</tbody>
						</table>
					</section>

					<section className="control-panel--reset">
						<label className="button--large">
							<button onClick={resetSeasonJSON}>Reset</button>
							<span className="hdr">Reset</span>
							<span className="txt">This will remove the results and points for this season.</span>
						</label>
					</section>

				</section>
				<section id="deck"></section>
				<section id="next"></section>
			</>
		);
	};
};
	

export default Season
