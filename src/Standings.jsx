import React from 'react';
import { getActiveRaceIdx , getNumberWithOrdinal , getDriverFromId , getDriverArticleDataColour , getFlagFromTrack , getResultFromRace , getPointsFromRace , getTrackFromAbbr , doToast , doConfirm } from './util/Utils';
import Header from './Header';
import './Standings.css';

const Season = (props) => {
	
	const resetSeasonJSON = () => {
		doConfirm("Are you sure you want to remove all the results from this season?", () => {
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
			standingsDriver.push({'points':standingsDriverPoints});
			if(standingsDriver[0].active){
				standings.push(standingsDriver);
			};
		});
		standings.sort((a, b) => Number(a[a.length-1].points) - Number(b[b.length-1].points)).reverse();
		let standingPoints = -1 ;
		standings.forEach((standing,standingIdx) => { 
			let l = standings[standingIdx].length-1 ;
			let p =standings[standingIdx][l].points ;
			if(standingPoints === p){
				standings[standingIdx].unshift({"position":'='});
			} else {
				standings[standingIdx].unshift({"position":getNumberWithOrdinal(standingIdx+1)});
			};
			standingPoints = p
		})
		console.table(standings)
		return standings;
	};

	const SeasonResultsBodyRow = (props) => {
		let line = '';
		if(props.standingRowIdx === 0) {
			line = <th className="position">{props.standingRow.position}</th>;
		} else if(props.standingRowIdx === 1){
			line = <th className="driver"><span className="name">{props.standingRow.name}</span><span className="team">{props.standingRow.team}</span><span className="colour">{props.standingRow.colour}</span></th>;
		} else if(props.standingRowIdx === (props.finalRowIdx-1)) {
			line = <td className="total">{props.standingRow.points}</td>;
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
				<main className={props.getMainClassList() + hasActiveRace(props.seasonJSON) }>

					<section className="cnt--results--standings">
						<Header {...props}/>
						<div className="full">
							<table>
								<thead>
									<tr>
										<th className="position">&nbsp;</th>
										<th className="driver">Driver</th>
										{ props.seasonJSON.races.map((race,raceIdx) => ( <th colSpan="2" key={race.track}><img src={getFlagFromTrack(race.track)} /></th> )) }
										<th className="total">Total</th>
									</tr>
								</thead>
								<tbody>
									{ seasonStandings.map((driverStandingRow,driverStandingRowIdx) => 
										<tr key={'driverStandingRowIdxTR'+driverStandingRowIdx} style={getDriverArticleDataColour(driverStandingRow[1])} >
											{
												driverStandingRow.map((standingRow,standingRowIdx) => (
													<SeasonResultsBodyRow key={'SeasonResultsBodyRow'+standingRowIdx} finalRowIdx={driverStandingRow.length} driverStandingRow={driverStandingRow} standingRow={standingRow} standingRowIdx={standingRowIdx} />
												))
											}
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</section>


					<footer className="cnt--actions">
						<header>
							<h3>Actions</h3>
						</header>
						<label className="action warning">
							<button onClick={resetSeasonJSON}>Reset</button>
							<span className="hdr action-do ">Reset</span>
							<span className="txt">Remove all results for The {props.seasonJSON.year} Championship.</span>
						</label>
					</footer>

				</main>
				<section id="deck"></section>
			</>
		);
	};
};
	

export default Season
