import React, { useState } from 'react';
import { defaultDeckJSON , defaultDriversSpeedGridJSON } from './localJSON';
import { shuffleDeck , doToast , doConfirm } from './util/Utils';
import { shuffle , next  } from './images';
import Driver from './Driver';
import './Race.css';
import './Deck.css';

const Race = (props) => {
	let localDriversSpeedGridJSON = JSON.parse(localStorage.getItem('driversSpeedGridJSON'));
		if(localDriversSpeedGridJSON===null) localDriversSpeedGridJSON = defaultDriversSpeedGridJSON ;
    	const [ driversSpeedGridJSON , setDriversSpeedGridJSON ] = useState(localDriversSpeedGridJSON);
	const [ deckCard , setDeckCard ] = useState(0);
	const [ deckJSON , setDeckJSON ] = useState(defaultDeckJSON);
	const [ raceDriversResult , setRaceDriversResult ] = useState([]);

	const setShuffledDeck = () => {
		doToast('Shuffle')
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
		setRaceDriversResult([...raceDriversResult , driverWhoFinished]);
	};

	const setRaceDriverUnfinished = (e) => {
		const driverHTML = e.currentTarget.parentElement.parentElement; 
		const driverWhoUnfinished = driverHTML.dataset.driver;
		let workingRaceDriversResult = raceDriversResult.filter((driver,driverIdx) => ( driver !== driverWhoUnfinished  ));
		setRaceDriversResult([...workingRaceDriversResult]);
	};

	const getDriverArticleDataResult = (driverId) => { 
		if((raceDriversResult.indexOf(driverId)+1)!==0) return raceDriversResult.indexOf(driverId)+1;
		return null
		
	};

	const getDriverArticleDataResultText = (driverId) => {
		return ["Winner","Runner Up","Third Placed","4th","5th","6th","7th","8th","9th","10th"][getDriverArticleDataResult(driverId)-1]
	};

	const getDriverArticleDataResultPoints = (driverId) => { }

	const raceProps = {
		driversJSON: props.driversJSON,
		deckCardJSON: deckJSON[deckCard],
		driversSpeedGridJSON,raceDriversResult,setRaceDriversResult,setRaceDriverFinished,setRaceDriverUnfinished,getDriverArticleDataResult,getDriverArticleDataResultText,getDriverArticleDataResultPoints,
	};
	
	return (
		<>
			<main className={props.getMainClassList()}>
				<section className="cnt--race">
					<header>
						<h2>Legends</h2>
					</header>
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

export default Race;