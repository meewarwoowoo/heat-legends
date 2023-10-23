import React from 'react';
import { defaultTracksJSON } from './localJSON';
import { getDriverArticleDataColour , getDriverArticleDataColourContrast } from './util/Utils';
import { finish , unfinish } from './images';

const Driver = (props) => {
	const driverJSON = props.driverJSON;
	const deckCardJSON = props.deckCardJSON; 
	const driversSpeedGridJSON = props.driversSpeedGridJSON; 

	let idxLock = 0 ;
    	driversSpeedGridJSON.map((driverSpeedGridJSON,idx) => { if(driverSpeedGridJSON.id===props.driverJSON.id) idxLock=idx });
    	const driverSpeedGridJSON = driversSpeedGridJSON[idxLock];


	const Track = () => {
		const trackJSON = defaultTracksJSON[0];
		console.log(trackJSON.track.length)
		return (
			<ul>
				{
					Array.from(trackJSON.track).map((element,idx) => ( TrackSection(element) ))
				}
			</ul>
		)
	}
	const TrackSection = (section) => {
		let HTML = '';
		if(section.substring(0,1)==='s'){
			for(let n = Number(section.substring(1)) ; n >=0 ; n--){
				HTML+=`<li>${n}</li>`
			};
		}
		if(section.substring(0,1)==='c'){
			HTML+=`<li>Corner: ${section.substring(1)}</li>`
		}
		return HTML
	}
	
	const move = (driver) => {
		const useCard = driverSpeedGridJSON['card'].indexOf(Number(deckCardJSON[driver]));
		return {
			"fast": props.configJSON.showGrid?driverSpeedGridJSON['fast'][useCard]:deckCardJSON[driver],
			"bend": props.configJSON.showGrid?driverSpeedGridJSON['bend'][useCard]:corner(deckCardJSON[driver]),
			"exit": props.configJSON.showGrid?driverSpeedGridJSON['exit'][useCard]:corner(deckCardJSON[driver]),
		}
	};
	
	const corner = (speed) => {
		return (speed<=11)?0:(speed<= 14)?1:(speed<= 17)?2:3
	};

	const getDriverArticleDataDriver = () => {
		return props.driverJSON.id
	};

	const getDriverArticleDataSpeed = () => {
		if(props.driverJSON.human) return null;
		return move(driverJSON.id).fast;
	};

	const getDriverArticleDataHuman = () => {
		if(props.driverJSON.human) return 'human';
		return null
	};

	if(deckCardJSON){
		if( driverJSON.active || driverJSON.active==='on' ){
			return(
				<article data-driver={getDriverArticleDataDriver()}  style={getDriverArticleDataColour(driverJSON)} data-speed={getDriverArticleDataSpeed()} data-human={getDriverArticleDataHuman()} data-result={props.getDriverArticleDataResult(getDriverArticleDataDriver())}>
					<div className="driver--number">{driverJSON.number}</div>
					<div className="driver">
						<div className="driver--name">{driverJSON.name}</div>
						<div className="driver--team">{driverJSON.team}</div>
						<div className="driver--colour">{driverJSON.colour}</div>
					</div>
					<div key="move" className="move">
						<div className="move__fast"><span>{move(driverJSON.id).fast}</span></div>
						<div className="move__bend"><span>{move(driverJSON.id).bend}</span></div>
						<div className="move__exit"><span className={getDriverArticleDataColourContrast(driverJSON)}>{move(driverJSON.id).exit}</span></div>
					</div>
					<div className="race">
						<div className="race__result">{props.getDriverArticleDataResultText(getDriverArticleDataDriver())}</div>
						<div className="icon race__finish" onClick={props.setRaceDriverFinished}><img src={finish} /></div>
						<div className="icon race__unfinish" onClick={props.setRaceDriverUnfinished}><img src={unfinish} /></div>
					</div>
				</article>
			);
		}
	}
}

export default Driver
