import { getDriverArticleDataColour , getDriverArticleDataColourContrast } from './util/Utils';
import { defaultPowerCardsJSON } from './localJSON';
import { finish , unfinish , draft, full_throttle, impeding , nimble , reckless , slipstream , speed_limit } from './images';

const Driver = (props) => {
	const driverJSON = props.driverJSON;
	const deckCardJSON = props.deckCardJSON; 
	const driversSpeedGridJSON = props.driversSpeedGridJSON; 
	const pcR = props.powerCardJSON.rival;
	const pcS = props.powerCardJSON.star;

	const icons = { full_throttle,slipstream,speed_limit,draft,impeding,nimble,reckless };

	let idxLock = 0 ;
		driversSpeedGridJSON.map((driverSpeedGridJSON,idx) => { if(driverSpeedGridJSON.id===props.driverJSON.id) idxLock=idx });
		const driverSpeedGridJSON = driversSpeedGridJSON[idxLock];

	const move = (driverJSON) => {
		const driver = driverJSON.id ;
		const useCard = driverSpeedGridJSON['card'].indexOf(Number(deckCardJSON[driver]));
		let fast , bend , exit , star , rival_icon ,  star_icon = '';
		if(props.configJSON.showGrid){
			fast = driverSpeedGridJSON['fast'][useCard];
			bend = driverSpeedGridJSON['bend'][useCard];
			exit = driverSpeedGridJSON['exit'][useCard];
			star = driverSpeedGridJSON['star'][useCard];
		}
		else if(deckCardJSON[driver]){
			const mf = deckCardJSON[driver][0]
			fast = mf;
			bend = corner(mf);
			exit = corner(mf);
			star = deckCardJSON[driver][1];
			
			if(props.configJSON.legendsRival && driverJSON.rival){
				if(pcR == 0){
					fast = 20;
					bend = 0;
				}
				rival_icon = pcR
			}
			if(props.configJSON.legendsStar && star){
				if(pcS == 0){
					fast = 20;
					bend = 0;
				}
				star_icon = pcS
			}
		}
		return {
			"fast": fast, "bend": bend, "exit": exit, "star": star, "star_icon": star_icon , "rival_icon": rival_icon ,
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
		return move(driverJSON).fast;
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
						{props.configJSON.legendsStar && 
						<>
							<div className="move--star"><span>{move(driverJSON).star?<>&#9733;</>:<></>}</span></div>
							<div className="move--star_icon"><span><img src={icons[defaultPowerCardsJSON[move(driverJSON).star_icon]?.icon]}/></span></div>
						</>}
						{props.configJSON.legendsRival && 
						<>
							<div className="move--rival">{driverJSON.rival?<>&#9889;</>:<></>}</div>
							<div className="move--rival_icon"><span><img src={icons[defaultPowerCardsJSON[move(driverJSON).rival_icon]?.icon]}/></span></div>
						</>}
						<div className="move--fast"><span>{move(driverJSON).fast}</span></div>
						<div className="move--bend"><span>{move(driverJSON).bend}</span></div>
						<div className="move--exit"><span className={getDriverArticleDataColourContrast(driverJSON)}>{move(driverJSON).exit}</span></div>
					</div>
					<div className="race">
						<div className="race--result">{props.getDriverArticleDataResultText(getDriverArticleDataDriver())}</div>
						<div className="icon race--finish" onClick={props.setRaceDriverFinished}><img src={finish} /></div>
						<div className="icon race--unfinish" onClick={props.setRaceDriverUnfinished}><img src={unfinish} /></div>
					</div>
				</article>
			);
		}
	}
}

export default Driver
