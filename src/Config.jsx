import React , { useState , useReducer } from 'react';
import { defaultConfigJSON } from './localJSON';
import { doToast , doConfirm } from './util/Utils';
		
const Config = (props) => {
	const [ showNumber , setShowNumber ] = useState(props.configJSON.showNumber);
    const [ showTeams , setShowTeams ] = useState(props.configJSON.showTeams);
    const [ showColours , setShowColours ] = useState(props.configJSON.showColours);
    const [ showSplitNumbers , setShowSplitNumbers ] = useState(props.configJSON.showSplitNumbers);
    const [ showMoreWhite , setShowMoreWhite  ] = useState(props.configJSON.showMoreWhite);
    const [ showFinishOnRace , setShowFinishOnRace ] = useState(props.configJSON.showFinishOnRace);
    const [ showGrid , setShowGrid ] = useState(props.configJSON.showGrid);
    const [ useNew1963 , setUseNew1963 ] = useState(props.configJSON.useNew1963);
	const [, forceUpdate] = useReducer(x => x + 1, 0);

    function setLocalConfigJSON(valueToSet,valueToEdit){
		let workingConfigJSON = {...props.configJSON};
		workingConfigJSON[valueToEdit] = valueToSet ;
		props.setConfigJSON(workingConfigJSON);
    };
	
	const resetSettings = () => {
		doConfirm("resetSettings?", () => {
			/*
			setShowNumber(defaultConfigJSON.showNumber); setLocalConfigJSON(defaultConfigJSON.showNumber,'showNumber') ;
			setShowTeams(defaultConfigJSON.showTeams); setLocalConfigJSON(defaultConfigJSON.showTeams,'showTeams') ;
			setShowColours(defaultConfigJSON.showColours); setLocalConfigJSON(defaultConfigJSON.showColours,'showColours') ;
			setShowSplitNumbers(defaultConfigJSON.showSplitNumbers); setLocalConfigJSON(defaultConfigJSON.showSplitNumbers,'showSplitNumbers') ;
			setShowMoreWhite(defaultConfigJSON.showMoreWhite); setLocalConfigJSON(defaultConfigJSON.showMoreWhite,'showMoreWhite') ;
			setShowFinishOnRace(defaultConfigJSON.showFinishOnRace); setLocalConfigJSON(defaultConfigJSON.showFinishOnRace,'showFinishOnRace') ;
			setShowGrid(defaultConfigJSON.showGrid); setLocalConfigJSON(defaultConfigJSON.showGrid,'showGrid') ;
			setUseNew1963(defaultConfigJSON.useNew1963); setLocalConfigJSON(defaultConfigJSON.useNew1963,'useNew1963') ;
			forceUpdate()
			*/
			props.setMain("Race") ;
		});
	};
	

	return (
		<>
			<main className={props.getMainClassList()}>
				<header>
					<h2>App Settings</h2>
				</header>
				<section className="control-panel--config">
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
								<span className="txt">When selected this will add a team name after the driver's name.  This team name can be customised for each driver.</span>
							</label>
						</li>
						<li className="switch">
							<label><input type="checkbox" checked={showColours} onChange={(e) => { setShowColours(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'showColours') }} />
								<span className="hdr">Show car colours as text</span>
								<span className="txt">When selected this will add the words "Yellow", "Purple", or "Black" after the driver and team names.</span>
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
				<section className="control-panel--config">
					<header>
						<h3>Season Settings</h3>
					</header>
					<ul>
						<li className="switch">
							<label><input type="checkbox" checked={useNew1963} onChange={(e) => { setUseNew1963(e.currentTarget.checked) ; setLocalConfigJSON(e.currentTarget.checked,'useNew1963') }} />
								<span className="hdr">Use New 1963</span>
								<span className="txt">The four race 1963 season included in the original Heat game, to me, feels too long and so I have created a new 1963 and a 1964 season.  If this optionis selected then those seasons are used.</span>
							</label>
						</li>
					</ul>
				</section>
				<section className="control-panel--config">
					<header>
						<h3>Layout Settings</h3>
					</header>
					<ul>
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
			</main>
			<section id="deck"></section>
			<section id="next"></section>
		</>
	);
};

export default Config;
