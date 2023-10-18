import React, { useState } from 'react';
import { defaultDriversSpeedGridJSON } from './localJSON';
import { DriverConfig } from './DriverConfig';
import './Drivers.css';

const Drivers = (props) => {
	let localDriversSpeedGridJSON = JSON.parse(localStorage.getItem('driversSpeedGridJSON'));
		if(localDriversSpeedGridJSON===null) localDriversSpeedGridJSON = defaultDriversSpeedGridJSON ;
    	const [ driversSpeedGridJSON , setDriversSpeedGridJSON ] = useState(localDriversSpeedGridJSON);

	return (
		<>
			<section id="main" className={props.getMainClassList()}>
				<header>
					<h2>Drivers</h2>
				</header>
				<main className="control-panel--drivers">
					<>
						{	
							props.driversJSON.map((driverJSON,idx) => 
								( <DriverConfig key={`DriverConfig--${driverJSON.id}`} driverJSON={driverJSON} driversJSON={props.driversJSON} driversSpeedGridJSON={driversSpeedGridJSON} {...props}  />  )
							)
						}
					</>
				</main>
			</section>
			<section id="deck"></section>
			<section id="next"></section>
		</>
	);
};

export default Drivers 