import React , { useState , useEffect } from 'react';
import { defaultDriversJSON, defaultConfigJSON } from './localJSON';
import Race from './Race';
import Drivers from './Drivers';
import Config from './Config';
import Season from './Season';
import Seasons from './Seasons';
import Round from './Round';

const Main = (props) => {

	let localDriversJSON = JSON.parse(localStorage.getItem('driversJSON'));
	if(localDriversJSON===null) localDriversJSON = defaultDriversJSON ;
	const [ driversJSON , setDriversJSON ] = useState(localDriversJSON);
	
	let localConfigJSON = JSON.parse(localStorage.getItem('configJSON'));
	if(localConfigJSON===null) localConfigJSON = defaultConfigJSON ;
	const [ configJSON , setConfigJSON ] = useState(localConfigJSON);
    useEffect(() => {
        localStorage.setItem('configJSON',JSON.stringify(configJSON));
    }, [configJSON]);

	const [ reminder , setReminder ] = useState(null);

	const getMainClassList = () => {
		let exportClassList = []
		if(configJSON.showNumber) exportClassList.push('show--number')
		if(configJSON.showTeams) exportClassList.push('show--teams')
		if(configJSON.showColours) exportClassList.push('show--colours')
		if(configJSON.showSplitNumbers) exportClassList.push('move--split')
		if(configJSON.showMoreWhite) exportClassList.push('show--more-white')
		if(configJSON.showFinishOnRace) exportClassList.push('show--finish')
		if(configJSON.showGrid) exportClassList.push('show--grid')
		if(configJSON.useNew1963) exportClassList.push('use--new-1963')
		return exportClassList.join(' ');
	};

	const backboneProps = {
		seasonJSON: props.seasonJSON ,setSeasonJSON: props.setSeasonJSON ,
		driversJSON , setDriversJSON , configJSON , setConfigJSON , reminder , setReminder , getMainClassList
	};

	if (props.main === 'Race') {
		return <Race {...props} {...backboneProps} />
	};
	if (props.main === 'Seasons') {
		return <Seasons {...props} {...backboneProps} />
	};
	if (props.main === 'Season') {
		return <Season {...props} {...backboneProps} />
	};
	if (props.main === 'Round') {
		return <Round {...props} {...backboneProps} />
	};
	if (props.main === 'Drivers') {
		return <Drivers {...props} {...backboneProps} />
	};
	if (props.main === 'Config') {
		return <Config {...props} {...backboneProps} />
	};
}
export default Main