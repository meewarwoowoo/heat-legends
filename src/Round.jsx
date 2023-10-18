import React, { useState , useReducer } from 'react';
import { defaultPlacesJSON, defaultDeckJSON , defaultDriversSpeedGridJSON } from './localJSON';
import { getTrackFromAbbr , getActiveRaceIdx , shuffleDeck , doToast , doConfirm } from './util/Utils';
import { nextOn , shuffleOn , shuffleOff } from './images';
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
		document.getElementById('main').classList.add('dark');
		doToast('Shuffle')
		shuffleDeck(deckJSON);
		setDeckCard(-1);
		setTimeout(() => {
			setDeckCard(0)
			document.getElementById('main').classList.remove('dark');
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
			props.setMain('Season')
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

	const raceProps = {
		driversJSON: props.driversJSON,
		deckCardJSON: deckJSON[deckCard],
		driversSpeedGridJSON,setRaceDriverFinished,setRaceDriverUnfinished,getDriverArticleDataResult,getDriverArticleDataResultText,getDriverArticleDataResultPoints,
	};

	return (
		<>
			<section id="main" className={props.getMainClassList()}>
				<header>
					<h2>{props.seasonJSON && props.seasonJSON.races && getTrackFromAbbr(props.seasonJSON.races[getActiveRaceIdx(props.seasonJSON)].track).name} {props.seasonJSON.year}</h2>
				</header>
				<main className="drivers">
					{ props.driversJSON.map((driverJSON,idx) =>  ( <Driver key={`${driverJSON.id}--${idx}`} driverJSON={driverJSON} {...raceProps} {...props} /> ) ) }
				</main>
			</section>
			<section id="deck">
				<ol className="deck">
					<>
						{ [1,2,3,4,5,6,7,8,9,10].map( (item,idx) => (<li key={idx} onClick={setCardFromDeck} className={((deckCard) === idx)?'on':'off'}>{item}</li>) ) }
					</>
					<li onClick={setShuffledDeck}><img src={shuffleOn} className="off" /><img src={shuffleOff} className="on" /></li>
				</ol>
			</section>
			<section id="next">
				<ul>
					<li onClick={setNextCard}>{ <img src={ (deckCard === (deckJSON.length-1))?shuffleOn:nextOn } />}</li>
				</ul>
			</section>
		</>
	);
};

export default Round;