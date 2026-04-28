import { useState , useReducer } from 'react';
import { defaultConfigJSON, defaultDriversJSON } from './localJSON';
		
const Export = (props) => {
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	function setLocalConfigJSON(valueToSet,valueToEdit){
		let workingConfigJSON = {...props.configJSON};
		workingConfigJSON[valueToEdit] = valueToSet ;
		props.setConfigJSON(workingConfigJSON);
   }
	
	return (
		<>
			<main>
				<header>
					<h2>Settings / Export</h2>
				</header>
				<section className="cnt">
					<ul>
						<li className="export">
							
							<label><input type="text" defaultValue={JSON.stringify(props.driversJSON)} readonly="readonly" />
								<span className="hdr">Read Only</span>
								<span className="txt">xxx</span>
							</label>
							<label><input type="text" id="leo" defaultValue="" onKeyUp={ () => {
									document.getElementById("leo--text").innerHTML='Valid';
									try { JSON.parse(document.getElementById("leo").value) } 
									catch (e) { document.getElementById("leo--text").innerHTML='Invalid' ; }
								}
							}/>
								<span className="hdr">Drivers</span>
								<span className="txt">
									
									<span id="leo--text"></span>
								</span>
							</label>
						</li>
					</ul>
					<ul>
						<li className="export">
							<label><input type="text" defaultValue={JSON.stringify(props.driversSpeedGridJSON)} />
								<span className="hdr">Drivers Speed Grid</span>
								<span className="txt">XXX</span>
							</label>
						</li>
					</ul>
					<ul>
						<li className="export">
							<label><input type="text" defaultValue={JSON.stringify(props.seasonJSON)} />
								<span className="hdr">seasonJSON</span>
								<span className="txt">XXX</span>
							</label>
						</li>
					</ul>
					<ul>
						<li className="export">
							<label><input type="text" defaultValue={JSON.stringify(props.configJSON)} />
								<span className="hdr">configJSON</span>
								<span className="txt">XXX</span>
							</label>
						</li>
					</ul>
				</section>


			</main>
			<section id="deck"></section>
		</>
	);
};

export default Export;
