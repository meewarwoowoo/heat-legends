import { useState } from 'react';
import { defaultLegendsDeckJSON , defaultLegendsDeck2JSON , createdLegendsDeck3JSON , defaultLegendsDeck4JSON , createdLegendsDeck5JSON , defaultLegendsDeck6JSON , defaultDriversSpeedGridJSON , defaultPowerCardsJSON , defaultPowerDeckJSON } from './localJSON';
import { shuffleDeck , doToast } from './util/Utils';
import { shuffle , next , draft, full_throttle, impeding , nimble , reckless , slipstream , speed_limit } from './images';
import Driver from './Driver';
import './Race.css';
import './Deck.css';

const Race = (props) => {
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
		setRaceDriversResult([...raceDriversResult , driverWhoFinished]);
	};

	const setRaceDriverUnfinished = (e) => {
		const driverHTML = e.currentTarget.parentElement.parentElement; 
		const driverWhoUnfinished = driverHTML.dataset.driver;
		let workingRaceDriversResult = raceDriversResult.filter(driver => ( driver !== driverWhoUnfinished  ));
		setRaceDriversResult([...workingRaceDriversResult]);
	};

	const getDriverArticleDataResult = (driverId) => { 
		if((raceDriversResult.indexOf(driverId)+1)!==0) return raceDriversResult.indexOf(driverId)+1;
		return null
	};

	const getDriverArticleDataResultText = (driverId) => {
		return ["Winner","Runner Up","Third Placed","4th","5th","6th","7th","8th","9th","10th","11th","12th"][getDriverArticleDataResult(driverId)-1]
	};

	const getDriverArticleDataResultPoints = () => { }

	const raceProps = {
		driversJSON: props.driversJSON,
		deckCardJSON: deckJSON[deckCard],
		powerCardJSON: powerDeckJSON[powerCard],
		driversSpeedGridJSON,raceDriversResult,setRaceDriversResult,setRaceDriverFinished,setRaceDriverUnfinished,getDriverArticleDataResult,getDriverArticleDataResultText,getDriverArticleDataResultPoints,
	};
	
	return (
		<>
			<main className={props.getMainClassList()}>
				<section className="cnt--race">
					<div className="full">
						{ props.driversJSON.map((driverJSON,idx) => ( <Driver key={`${driverJSON.id}--${idx}`} driverJSON={driverJSON} {...raceProps} {...props} /> ) ) }
					</div>
				</section>
			</main>
			<section id="deck">
				<div className="cnt">
					<ul>
						<li onClick={ ()=>{ setShuffledDeck() ; setShuffledPowerDeck() ; } }><span><img src={shuffle} /></span></li>
						<li className="cards--legend">
							<ol>
								{ Array.from(deckJSON).map( (card,cardIdx) => (<li key={cardIdx} className={((deckCard)===cardIdx)?'on':'off'}><span className="card"><span className="card--number">{cardIdx+1}</span></span></li>) ) }
							</ol>
						</li>
						<li className="cards--power">
							<ol>
								{ Array.from(powerDeckJSON).map( (card,cardIdx) => (<li key={cardIdx} className={((powerCard)===cardIdx)?'on':'off'}><span className="card"><span className="card--number">{cardIdx+1}</span></span></li>) ) }
							</ol>
							{
							(props.configJSON.legendsRival || props.configJSON.legendsStar) && 
								<ul>
									{ props.configJSON.legendsRival && <li><span className="icon">&#9889;</span><img src={icons[defaultPowerCardsJSON[powerDeckJSON[powerCard].rival]?.icon]}/></li> }
									{ props.configJSON.legendsStar && <li><span className="icon">&#9733;</span><img src={icons[defaultPowerCardsJSON[powerDeckJSON[powerCard].star]?.icon]}/></li> }
								</ul>
							}
						</li>
						<li onClick={setNextCard}><span><img src={ (deckCard === (deckJSON.length-1))?shuffle:next } /></span></li>
					</ul>

				</div>
			</section>
		</>
	);
};

export default Race;