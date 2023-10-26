import React, { useState , useReducer } from 'react';
import { defaultPlacesJSON, defaultDeckJSON , defaultDriversSpeedGridJSON } from './localJSON';
import { getActiveRaceIdx , shuffleDeck } from './util/Utils';
import { shuffle , next } from './images';
import Header from './Header';
import Driver from './Driver';
import './Race.css';

const Round = (props) => {
	let localDriversSpeedGridJSON = JSON.parse(localStorage.getItem('driversSpeedGridJSON'));
		if(localDriversSpeedGridJSON===null) localDriversSpeedGridJSON = defaultDriversSpeedGridJSON ;
    	const [ driversSpeedGridJSON , setDriversSpeedGridJSON ] = useState(localDriversSpeedGridJSON);
	const [ deckCard , setDeckCard ] = useState(0);
	const [ deckJSON , setDeckJSON ] = useState(defaultDeckJSON);
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	const setShuffledDeck = () => {
		shuffleDeck(deckJSON);
		setDeckCard(-1);
		setTimeout(() => {
			setDeckCard(0)
		}, "250");
	};
	
	const setCardFromDeck = (e) => {
		const newDeckCard = Number(Array.prototype.slice.call(document.getElementById('deck').querySelector('ol').querySelectorAll('li')).indexOf(e.currentTarget));
		setDeckCard(newDeckCard) ;
	};

	const setNextCard = () => {
		const newDeckCard = deckCard + Number(1) ;
		(newDeckCard<10)?setDeckCard(newDeckCard):setShuffledDeck();
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
		driversSpeedGridJSON,setRaceDriverFinished,setRaceDriverUnfinished,getDriverArticleDataResult,getDriverArticleDataResultText,getDriverArticleDataResultPoints,
	};


	return (
		<>
			<main className={props.getMainClassList()} style={{"--drivers": getActiveDrivers() }}>
				<section className="cnt--race">
					<Header {...props}/>
					<div className="full">
						{ props.driversJSON.map((driverJSON,idx) =>  ( <Driver key={`${driverJSON.id}--${idx}`} driverJSON={driverJSON} {...raceProps} {...props} /> ) ) }
					</div>
				</section>
			</main>
			<section id="deck">
				<div className="cnt">
					<ul>
						<li onClick={setShuffledDeck}><span><img src={shuffle} /></span></li>
						<li className="cards">
							<ol>
								{ [1,2,3,4,5,6,7,8,9,10].map( (card,cardIdx) => (<li key={cardIdx} onClick={setCardFromDeck} className={((deckCard)===cardIdx)?'on':'off'}><span className="number">{card}</span></li>) ) }
							</ol>
						</li>
						<li onClick={setNextCard}><span><img src={ (deckCard === (deckJSON.length-1))?shuffle:next } /></span></li>
					</ul>
				</div>
			</section>
		</>
	);
};

export default Round;