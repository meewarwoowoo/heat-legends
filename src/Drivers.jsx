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

				<section className="control-panel--actions">
					<header>
						<h3>Actions</h3>
					</header>
					<label className="action warning">
						<button onClick={resetDrivers}>Reset Drivers</button>
						<span className="hdr">Reset Drivers</span>
						<span className="txt">All the driver information will be reset.</span>
					</label>
					<label className="action warning">
						<button onClick={resetDriversSpeedGrids}>Reset Driver Speed Grids</button>
						<span className="hdr">Reset Speed Grids</span>
						<span className="txt">All the different speed values on the Speed Grids will be reset.</span>
					</label>
				</section>

			</section>
			<section id="deck"></section>
			<section id="next"></section>
		</>
	);
};

export default Drivers 