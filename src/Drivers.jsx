import { useState } from 'react';
import { defaultDriversJSON ,defaultDriversSpeedGridJSON } from './localJSON';
import { DriverConfig } from './DriverConfig';
import { doConfirm } from './util/Utils';

import './Drivers.css';

const Drivers = (props) => {
	let localDriversSpeedGridJSON = JSON.parse(localStorage.getItem('driversSpeedGridJSON'));
		if(localDriversSpeedGridJSON===null) localDriversSpeedGridJSON = defaultDriversSpeedGridJSON ;
		const [ driversSpeedGridJSON , setDriversSpeedGridJSON ] = useState(localDriversSpeedGridJSON);

	const resetDrivers = () => {
		doConfirm("resetDrivers?", () => {
			props.setDriversJSON(defaultDriversJSON);
			localStorage.setItem('driversJSON',JSON.stringify(defaultDriversJSON));
		});
	};
	const resetDriversSpeedGrids = () => {
		doConfirm("resetDriversSpeedGrids?", () => {
			props.setDriversSpeedGridJSON(defaultDriversSpeedGridJSON);
		});
	};
		
	
	return (
		<>
			<main className={props.getMainClassList()}>
				<section className="cnt">
					<>
						{	
							props.driversJSON.map(driverJSON => 
								( <DriverConfig key={`DriverConfig--${driverJSON.id}`} driverJSON={driverJSON} driversJSON={props.driversJSON} driversSpeedGridJSON={driversSpeedGridJSON} {...props}  />  )
							)
						}
					</>
				</section>

			</main>
			<section id="deck"></section>
		</>
	);
};

export default Drivers 