import React from 'react';
import { getActiveRaceIdx , getNumberWithOrdinal , getDriverFromId , getDriverArticleDataColour , getFlagFromTrack , getResultFromRace , getPointsFromRace , getTrackFromAbbr , doToast , doConfirm } from './util/Utils';
import './Standings.css';

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

					<section className="control-panel--season--standings">
						<header>
							<h2>The {props.seasonJSON.year} Championship Standings</h2>
						</header>
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


					<section className="control-panel--actions">
						<header>
							<h3>Actions</h3>
						</header>
						<label className="action">
							<button onClick={() => { props.setMain("Round") ; }}>Race</button>
							<span className="hdr">Race</span>
							<span className="txt">The {getTrackFromAbbr(props.seasonJSON.races[getActiveRaceIdx(props.seasonJSON)].track).name} Race from The {props.seasonJSON.year} Championship.</span>
						</label>
						<label className="action">
							<button onClick={() => { props.setMain("Season") ; }}>Championship</button>
							<span className="hdr">Championship</span>
							<span className="txt">See The {props.seasonJSON.year} Championship.</span>
						</label>
						<label className="action warning">
							<button onClick={resetSeasonJSON}>Reset</button>
							<span className="hdr">Reset</span>
							<span className="txt">Remove all results for The {props.seasonJSON.year} Championship.</span>
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