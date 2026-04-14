import { useState , useReducer } from 'react';
import { defaultConfigJSON, defaultDriversJSON } from './localJSON';
		
const Config = (props) => {
	const [ showNumber , setShowNumber ] = useState(props.configJSON.showNumber);
    const [ showTeams , setShowTeams ] = useState(props.configJSON.showTeams);
    const [ showColours , setShowColours ] = useState(props.configJSON.showColours);
    const [ showSplitNumbers , setShowSplitNumbers ] = useState(props.configJSON.showSplitNumbers);
    const [ showMoreWhite , setShowMoreWhite  ] = useState(props.configJSON.showMoreWhite);
    const [ showFinishOnRace , setShowFinishOnRace ] = useState(props.configJSON.showFinishOnRace);
    const [ showCards , setShowCards ] = useState(props.configJSON.showCards);
    const [ showGrid , setShowGrid ] = useState(props.configJSON.showGrid);
    const [ legendsLevel , setLegendsLevel ] = useState(props.configJSON.legendsLevel);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    function setLocalConfigJSON(valueToSet,valueToEdit){
		let workingConfigJSON = {...props.configJSON};
		workingConfigJSON[valueToEdit] = valueToSet ;
		props.setConfigJSON(workingConfigJSON);
    };
	
	return (
		<>
			<main className={props.getMainClassList()}>
				<header>
					<h2>Legends Level</h2>
				</header>
				<section className="cnt--config">
					<ul>
						<li className="select">
							<span className="label">
								<span className="hdr">Legends Levels as established in Heat: Legends Expansion</span>
								<span className="ipt">
									<select onChange={(e) => { setLegendsLevel(e.target.value) ; setLocalConfigJSON(e.target.value,'legendsLevel') ; }}>
										{ legendsLevel==1 ? <option value="1" selected="selected">Level 1</option> : <option value="1" >Level 1</option> }
										{ legendsLevel==2 ? <option value="2" selected="selected">Level 2</option> : <option value="2" >Level 2 Green Deck</option> }
										{ legendsLevel==3 ? <option value="3" selected="selected">Level 3</option> : <option value="3" >Level 3 Green &amp; Yellow Deck</option> }
										{ legendsLevel==4 ? <option value="4" selected="selected">Level 4</option> : <option value="4" >Level 4 Yellow Deck</option> }
										{ legendsLevel==5 ? <option value="5" selected="selected">Level 5</option> : <option value="5" >Level 5 Yellow &amp; Red Deck</option> }
										{ legendsLevel==6 ? <option value="6" selected="selected">Level 6</option> : <option value="6" >Level 6 Red Deck</option> }
									</select>
								</span>
								<span className="txt">
									Level 1 is the base game system with four extra cars extrapolated in and allows for only ten legend cars.<br/><br/>
									Level 2 to 6 allow for twelve legend cars.<br/><br/>
									Level 2, 4, and 6 offer twelve cards mapped to the Green, Yellow and Red decks.<br/><br/>
									Level 3 is the Green and Yellow decks shuffled together.  Level 5 is the Yellow and Red decks combined.
								</span>
							</span>
						</li>
					</ul>
				</section>
				<header>
					<h2>Settings</h2>
				</header>
				<section className="cnt--config">
					<ul>
						<li className="switch">
							<label><input type="checkbox" checked={showNumber} onChange={(e) => { setShowNumber(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'showNumber') }} />
								<span className="hdr">Show car numbers</span>
								<span className="txt">When selected this will add a number for each driver.  This number can be customised for each driver.</span>
							</label>
						</li>
						<li className="switch">
							<label><input type="checkbox" checked={showTeams} onChange={(e) => { setShowTeams(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'showTeams') }} />
								<span className="hdr">Show team names</span>
								<span className="txt">When selected this will add a team name after the driver&rsquo;s name.  This team name can be customised for each driver.</span>
							</label>
						</li>
						<li className="switch">
							<label><input type="checkbox" checked={showColours} onChange={(e) => { setShowColours(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'showColours') }} />
								<span className="hdr">Show car colours as text</span>
								<span className="txt">When selected this will add the words &ldquot;Yellow&rdquot;, &ldquot;Purple&rdquot;, or &ldquot;Black&rdquot; after the driver and team names.</span>
							</label>
						</li>
						<li className="switch">
							<label><input type="checkbox" checked={showSplitNumbers} onChange={(e) => { setShowSplitNumbers(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'showSplitNumbers') }} />
								<span className="hdr">Show split values for corner speeds</span>
								<span className="txt">By default the corner exit and distance to corner values - which are the same with the standard Legend rules - are shown as one number.  Selecting this option will show both values however options set under Season will ignore this setting and always show both values.</span>
							</label>
						</li>
						<li className="switch">
							<label><input type="checkbox" checked={showGrid} onChange={(e) => { setShowGrid(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'showGrid') }} />
								<span className="hdr">Use Speed Grid</span>
								<span className="txt">The Speed Grid allows you to change the Legend Cards individually.</span>
							</label>
						</li>
					</ul>
				</section>
				<section className="cnt--config">
					<header>
						<h3>Layout Settings</h3>
					</header>
					<ul>
						<li className="switch">
							<label><input type="checkbox" checked={showCards} onChange={(e) => { setShowCards(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'showCards') }} data-value="showCards" />
								<span className="hdr">Show cards</span>
								<span className="txt">Displays the Legends cards from the deck.</span>
							</label>
						</li>
						<li className="switch">
							<label><input type="checkbox" checked={showMoreWhite} onChange={(e) => { setShowMoreWhite(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'showMoreWhite') }} data-value="showMoreWhite" />
								<span className="hdr">Show more white space</span>
								<span className="txt">A personal preference that, when there is more space on the screen, some of that space is used for rounded corners and healthy gutters.</span>
							</label>
						</li>
						<li className="switch">
							<label><input type="checkbox" checked={showFinishOnRace} onChange={(e) => { setShowFinishOnRace(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'showFinishOnRace') }}/>
								<span className="hdr">Show Finish Button on Single Races</span>
								<span className="txt">When selected a button is added to Legend Cards on a single race to allow you to mark cars as finished.</span>
							</label>
						</li>
					</ul>
				</section>

				<section className="cnt--config">
					<header>
						<h3>Export</h3>
					</header>
					<ul>
						<li className="button">
							<div className="label">
								<span className="hdr">Export</span>
								<span className="txt">Copy the JSON files for this project.</span>
								<span className="action-do" id="over--clear" onClick={(e)=> { props.setMain("Export") ; }}>Export</span>
							</div>
						</li>
					</ul>
				</section>

				<section className="cnt--config">
					<header>
						<h3>Reset</h3>
					</header>
					<ul>
						<li className="button">
							<div className="label">
								<span className="hdr">Emergency Reset</span>
								<span className="txt">If you are used the previous version of this app, and you are having problems, you can delete your Local Storage files.</span>
								<span className="action-do" id="over--clear" onClick={(e)=> { localStorage.clear() ; location.reload() ; }}>Delete Local Storage &amp; Reboot</span>
							</div>
						</li>
					</ul>
				</section>


			</main>
			<section id="deck"></section>
		</>
	);
};

export default Config;
