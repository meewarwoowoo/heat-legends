import { getDriverArticleDataColour , getDriverArticleDataColourContrast } from './util/Utils';
import { finish , unfinish } from './images';

const Driver = (props) => {
	const driverJSON = props.driverJSON;
	const deckCardJSON = props.deckCardJSON; 
	const driversSpeedGridJSON = props.driversSpeedGridJSON; 

	let idxLock = 0 ;
		driversSpeedGridJSON.map((driverSpeedGridJSON,idx) => { if(driverSpeedGridJSON.id===props.driverJSON.id) idxLock=idx });
		const driverSpeedGridJSON = driversSpeedGridJSON[idxLock];


	const move = (driver) => {
		const useCard = driverSpeedGridJSON['card'].indexOf(Number(deckCardJSON[driver]));
		if(deckCardJSON[driver]){
			return {
				"fast": props.configJSON.showGrid?driverSpeedGridJSON['fast'][useCard]:deckCardJSON[driver][0],
				"bend": props.configJSON.showGrid?driverSpeedGridJSON['bend'][useCard]:corner(deckCardJSON[driver][0]),
				"exit": props.configJSON.showGrid?driverSpeedGridJSON['exit'][useCard]:corner(deckCardJSON[driver][0]),
				"star": props.configJSON.showGrid?driverSpeedGridJSON['star'][useCard]:deckCardJSON[driver][1]
			}
		}
		else{
			return {
				"fast": props.configJSON.showGrid?driverSpeedGridJSON['fast'][useCard]:'',
				"bend": props.configJSON.showGrid?driverSpeedGridJSON['bend'][useCard]:false,
				"exit": props.configJSON.showGrid?driverSpeedGridJSON['exit'][useCard]:false,
				"star": props.configJSON.showGrid?driverSpeedGridJSON['star'][useCard]:0
			}
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
						<div className="driver--name">
							{driverJSON.name}
							{driverJSON.rival?<span className="driver--rival">&#9889;</span>:<></>}
						</div>
						<div className="driver--team">{driverJSON.team}</div>
						<div className="driver--colour">{driverJSON.colour}</div>
					</div>
					<div key="move" className="move">
						<div className="move__star"><span>{move(driverJSON.id).star?<>&#9733;</>:<></>}</span></div>
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
