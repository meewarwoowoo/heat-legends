import React, { useState } from 'react';
import { defaultColoursJSON } from './localJSON';

const DriverConfig = (props) => {
    const coloursJSON = defaultColoursJSON ;
    const driversSpeedGridJSON = props.driversSpeedGridJSON ;
    let idxLock = 0 ;
        driversSpeedGridJSON.map((driverSpeedGridJSON,idx) => { if(driverSpeedGridJSON.id===props.driverJSON.id) idxLock=idx });
        const driverSpeedGridJSON = driversSpeedGridJSON[idxLock];
    const [ driverActive , setDriverActive ] = useState(props.driverJSON.active);
    const [ driverHuman , setDriverHuman ] = useState(props.driverJSON.human);
    const [ driverNumber , setDriverNumber ] = useState(props.driverJSON.number);
    const [ driverName , setDriverName ] = useState(props.driverJSON.name);
    const [ driverTeam , setDriverTeam ] = useState(props.driverJSON.team);
    const [ driverColour , setDriverColour ] = useState(props.driverJSON.colour);


    function setLocalDriverJSON(driver_id,valueToEnter,valueToEdit){
        let workingDriversJSON = props.driversJSON ;
        let idxLock = 0 ;
        workingDriversJSON.map((driverJSON,idx) => { if(driverJSON.id===driver_id) idxLock=idx });
        workingDriversJSON[idxLock][valueToEdit] = valueToEnter ;
//        localStorage.setItem('driversJSON',JSON.stringify(workingDriversJSON));
        props.setDriversJSON(workingDriversJSON);
    }

    function setCardFromDeck(driver_id,valueToEnter,valueToEdit,cardNumber){
        let idxLock = 0 ;
        driversSpeedGridJSON.map((driver,idx) => { if(driver.id===driver_id) idxLock=idx });
        driversSpeedGridJSON[idxLock][valueToEdit][cardNumber] = valueToEnter ;
        localStorage.setItem('driversSpeedGridJSON',JSON.stringify(driversSpeedGridJSON));
    }


	const getDriverArticleDataColour = () => { 
		return {
			"--bkg": defaultColoursJSON.find(el=>el.name===props.driverJSON.colour).bkg , 
			"--txt": defaultColoursJSON.find(el=>el.name===props.driverJSON.colour).txt 
		}
	};

    return(
        <article style={getDriverArticleDataColour()} >
            <ul className="driver" data-driver={props.driverJSON.id}>
                <li className="input--toggle"><label className="driver--active"><input type="checkbox" checked={driverActive} onChange={(e) => { setDriverActive(e.currentTarget.checked) ; setLocalDriverJSON(props.driverJSON.id,e.currentTarget.checked,'active') }} /><span><span className="on">Active</span><span className="off">Off</span></span></label></li>
                <li className="input--text"><span className="driver--number"><input type="text" value={driverNumber} onChange={(e) => { setDriverNumber(e.currentTarget.value) ; setLocalDriverJSON(props.driverJSON.id,e.currentTarget.value,'number') }} /><i>No.</i></span></li>
                <li className="input--text"><span className="driver--name"><input type="text" value={driverName} onChange={(e) => { setDriverName(e.currentTarget.value) ; setLocalDriverJSON(props.driverJSON.id,e.currentTarget.value,'name') }} /><i>Name</i></span></li>
                <li className="input--text"><span className="driver--team"><input type="text" value={driverTeam} onChange={(e) => { setDriverTeam(e.currentTarget.value) ; setLocalDriverJSON(props.driverJSON.id,e.currentTarget.value,'team') }} /><i>Team</i></span></li>
                <li className="input--text"><span className="driver--colour"><select value={driverColour} onChange={(e) => { setDriverColour(e.currentTarget.value) ; setLocalDriverJSON(props.driverJSON.id,e.currentTarget.value,'colour') }}>
                {
                    coloursJSON.map((colourJSON,i) => (<option value={colourJSON.name} key={colourJSON.name+'--colour'}>{colourJSON.name}</option>))
                }
                </select><i>Colour</i></span></li>
                <li className="input--toggle"><label className="driver--human"><input type="checkbox" checked={driverHuman} onChange={(e) => { setDriverHuman(e.currentTarget.checked) ; setLocalDriverJSON(props.driverJSON.id,e.currentTarget.checked,'human') }} /><span><span className="on">Human</span><span className="off">Legend</span></span></label></li>
            </ul>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        {
                            [1,2,3,4,5,6,7,8,9,10].map((card,cardNumber) => (<td key={'Card--'+cardNumber}>{card}</td>))
                        }
                    </tr>
                    <tr>
                        <th>Legend&nbsp;Speed</th>
                        {
                            driverSpeedGridJSON['fast'].map((card,cardNumber) => {
                                const [cardValue, setCardFromDeckValue] = useState(card);
                                return (<td key={'card--'+cardNumber+'--fast'}><input type="text" value={cardValue} onChange={(e) => { setCardFromDeckValue(e.currentTarget.value) ; setCardFromDeck(props.driverJSON.id,e.currentTarget.value,'fast',cardNumber)  }} /></td>) 
                            })
                        }
                    </tr>
                    <tr>
                        <th><span className="monospace">&#9671;</span>&nbsp;Before&nbsp;Legend&nbsp;Line</th>
                        {
                            driverSpeedGridJSON['bend'].map((card,cardNumber) => {
                                const [cardValue, setCardFromDeckValue] = useState(card);
                                return (<td key={'card--'+cardNumber+'--bend'}><input type="text" value={cardValue} onChange={(e) => { setCardFromDeckValue(e.currentTarget.value) ; setCardFromDeck(props.driverJSON.id,e.currentTarget.value,'bend',cardNumber)  }} /></td>) 
                            })
                        }
                    </tr>
                    <tr>
                        <th><span className="monospace">&#9632;</span>&nbsp;After&nbsp;Legend&nbsp;Line</th>
                        {
                            driverSpeedGridJSON['exit'].map((card,cardNumber) => {
                                const [cardValue, setCardFromDeckValue] = useState(card);
                                return (<td key={'card--'+cardNumber+'--exit'}><input type="text" value={cardValue} onChange={(e) => { setCardFromDeckValue(e.currentTarget.value) ; setCardFromDeck(props.driverJSON.id,e.currentTarget.value,'exit',cardNumber)  }} /></td>) 
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </article>
    )

};

export { DriverConfig }