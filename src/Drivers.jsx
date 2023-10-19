import React, { useState } from 'react';
import { defaultDriversJSON ,defaultDriversSpeedGridJSON } from './localJSON';
import { DriverConfig } from './DriverConfig';
import { doToast , doConfirm } from './util/Utils';

import './Drivers.css';

const Drivers = (props) => {
	let localDriversSpeedGridJSON = JSON.parse(localStorage.getItem('driversSpeedGridJSON'));
		if(localDriversSpeedGridJSON===null) localDriversSpeedGridJSON = defaultDriversSpeedGridJSON ;
    	const [ driversSpeedGridJSON , setDriversSpeedGridJSON ] = useState(localDriversSpeedGridJSON);

	const resetDrivers = () => {
		doConfirm("resetDrivers?", () => {
			props.setDriversJSON(defaultDriversJSON);
		});
	};
	const resetDriversSpeedGrids = () => {
		doConfirm("resetDriversSpeedGrids?", () => {
			props.setDriversSpeedGridJSON(defaultDriversSpeedGridJSON);
		});
	};
		
	
	return (
		<>
			<section id="main" className={props.getMainClassList()}>
				<header>
					<h2>Drivers</h2>
				</header>
				<section className="control-panel--drivers">
					<>
						{	
							props.driversJSON.map((driverJSON,idx) => 
								( <DriverConfig key={`DriverConfig--${driverJSON.id}`} driverJSON={driverJSON} driversJSON={props.driversJSON} driversSpeedGridJSON={driversSpeedGridJSON} {...props}  />  )
							)
						}
					</>
				</section>

			</section>
			<section id="deck"></section>
			<section id="next"></section>
		</>
	);
};

export default Drivers 