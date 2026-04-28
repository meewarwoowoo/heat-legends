import { useState , useReducer } from 'react';
import { defaultPlacesJSON, defaultLegendsDeckJSON , defaultLegendsDeck2JSON , createdLegendsDeck3JSON , defaultLegendsDeck4JSON , createdLegendsDeck5JSON , defaultLegendsDeck6JSON , defaultDriversSpeedGridJSON , defaultPowerCardsJSON , defaultPowerDeckJSON } from './localJSON';

import { getActiveRaceIdx , shuffleDeck , doToast } from './util/Utils';
import { shuffle , next , draft, full_throttle, impeding , nimble , reckless , slipstream , speed_limit } from './images';
import Driver from './Driver';
import './Race.css';
import './Deck.css';


const Round = (props) => {
	const legendDecks = [ [] , defaultLegendsDeckJSON, defaultLegendsDeck2JSON , createdLegendsDeck3JSON , defaultLegendsDeck4JSON , createdLegendsDeck5JSON , defaultLegendsDeck6JSON ];
	let localDriversSpeedGridJSON = JSON.parse(localStorage.getItem('driversSpeedGridJSON'));
		if(localDriversSpeedGridJSON===null) localDriversSpeedGridJSON = defaultDriversSpeedGridJSON ;
		const [ driversSpeedGridJSON , setDriversSpeedGridJSON ] = useState(localDriversSpeedGridJSON);
	const [ deckCard , setDeckCard ] = useState(0);
	const [ deckJSON , setDeckJSON ] = useState(shuffleDeck(legendDecks[props.configJSON.legendsLevel]));
	const [ powerDeckJSON , setPowerDeckJSON ] = useState(shuffleDeck(defaultPowerDeckJSON));
	const [ powerCard , setPowerCard ] = useState(0);
	const [ raceDriversResult , setRaceDriversResult ] = useState([]);
	const icons = { full_throttle,slipstream,speed_limit,draft,impeding,nimble,reckless };
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	const setShuffledDeck = () => {
		doToast('Shuffle Legends Deck')
		shuffleDeck(deckJSON);
		setTimeout(() => {
			setDeckCard(0)
		}, "100");
	};

	const setShuffledPowerDeck = () => {
		doToast('Shuffle Power Deck')
		shuffleDeck(setPowerDeckJSON);
		setTimeout(() => {
			setPowerCard(0)
		}, "100");
	};

	const setNextCard = () => {
		const newDeckCard = deckCard + Number(1) ;
		(newDeckCard<deckJSON.length)?setDeckCard(newDeckCard):setShuffledDeck();
		const newPowerCard = powerCard + Number(1) ;
		(newPowerCard<powerDeckJSON.length)?setPowerCard(newPowerCard):setShuffledPowerDeck();
	};

	const setRaceDriverFinished = (e) => {
		const driverHTML = e.currentTarget.parentElement.parentElement; 
		const driverWhoFinished = driverHTML.dataset.driver;
		let workingSeasonJSON = {...props.seasonJSON};
		workingSeasonJSON.races[getActiveRaceIdx(workingSeasonJSON)].result.push(driverWhoFinished) ;
		const numberOfDrivers = props.driversJSON.filter((driver) => driver.active).length ;
		const numberOfDriversFinished = props.seasonJSON.races.filter((race) => race.active)[0].result.length ;
		if(numberOfDriversFinished === numberOfDrivers){
			const nextRaceIdx = Number( getActiveRaceIdx(workingSeasonJSON) + 1 )
			workingSeasonJSON.races[getActiveRaceIdx(workingSeasonJSON)].active=false;
			if(workingSeasonJSON.races[nextRaceIdx]) workingSeasonJSON.races[nextRaceIdx].active=true;
		};
		props.setSeasonJSON(workingSeasonJSON);
		forceUpdate();
		if(numberOfDriversFinished === numberOfDrivers){
			props.setMain('Results')
		};
	};

	const setRaceDriverUnfinished = (e) => {
		const driverHTML = e.currentTarget.parentElement.parentElement; 
		const driverWhoUnfinished = driverHTML.dataset.driver;
		let workingSeasonJSON = {...props.seasonJSON};
		workingSeasonJSON.races[getActiveRaceIdx(workingSeasonJSON)].result = workingSeasonJSON.races[getActiveRaceIdx(workingSeasonJSON)].result.filter((driver) => driver !== driverWhoUnfinished ) ;
		forceUpdate();
		props.setSeasonJSON(workingSeasonJSON);
	}

	const getDriverArticleDataResult = (driverId) => {
		if(props.seasonJSON.races.filter((race) => race.active)[0] && props.seasonJSON.races.filter((race) => race.active)[0].result && props.seasonJSON.races.filter((race) => race.active)[0].result.indexOf(driverId)>=0){
			return Number(props.seasonJSON.races.filter((race) => race.active)[0].result.indexOf(driverId) + 1) ;
		};
		return null 
	};

	const getDriverArticleDataResultText = (driverId) => {
		return defaultPlacesJSON[getDriverArticleDataResult(driverId)-1];
	};

	const getDriverArticleDataResultPoints = (driverId) => {
		return ( props.seasonJSON.races.filter((race) => race.active)[0].points[getDriverArticleDataResult(driverId)-1] );
	};
	const getActiveDrivers = () => {
		return props.driversJSON.filter( (driver,driverIdx)=>driver.active ).length
	};

	const raceProps = {
		driversJSON: props.driversJSON,
		deckCardJSON: deckJSON[deckCard],
		powerCardJSON: powerDeckJSON[powerCard],
		driversSpeedGridJSON,setRaceDriverFinished,setRaceDriverUnfinished,getDriverArticleDataResult,getDriverArticleDataResultText,getDriverArticleDataResultPoints,
	};


	return (
		<>
			<main className={props.getMainClassList()} style={{"--drivers": getActiveDrivers() }}>
				<section className="cnt">
					{ props.driversJSON.map((driverJSON,idx) =>  ( <Driver key={`${driverJSON.id}--${idx}`} driverJSON={driverJSON} {...raceProps} {...props} /> ) ) }
				</section>
			</main>
			<section id="deck">
				<div className="cnt">
					<ul>
						<li onClick={ ()=>{ setShuffledDeck() ; setShuffledPowerDeck() ; } }><span><img src={shuffle} /></span></li>
						<li className="cards--header">Legends Level&nbsp;{ props.configJSON.legendsLevel }</li>
						<li className="cards--legends">
							<ol>
								{ Array.from(deckJSON).map( (card,cardIdx) => (<li key={cardIdx} className={((deckCard)===cardIdx)?'on':'off'}><span className="card"><span className="card--number">{cardIdx+1}</span></span></li>) ) }
							</ol>
						</li>
						<li className="cards--header">Power Up</li>
						<li className="cards--power">
							<ol>
								{ Array.from(powerDeckJSON).map( (card,cardIdx) => (<li key={cardIdx} className={((powerCard)===cardIdx)?'on':'off'}><span className="card"><span className="card--number">{cardIdx+1}</span></span></li>) ) }
							</ol>
							<ul>
								<li><span className="icon">&#9889;</span><img src={icons[defaultPowerCardsJSON[powerDeckJSON[powerCard].rival]?.icon]}/></li>
								<li><span className="icon">&#9733;</span><img src={icons[defaultPowerCardsJSON[powerDeckJSON[powerCard].star]?.icon]}/></li>
							</ul>
						</li>
						<li className="cards--header">Next</li>
						<li onClick={setNextCard}><span><img src={ (deckCard === (deckJSON.length-1))?shuffle:next } /></span></li>
					</ul>
				</div>
			</section>
		</>
	);
};

export default Round;