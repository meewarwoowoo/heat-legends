import React, { useState } from 'react';


const Hail = (props) => {
	const [ hailed , setHailed ] = useState(props.configJSON.hailed);

    function setLocalConfigJSON(valueToSet,valueToEdit){
		let workingConfigJSON = {...props.configJSON};
		workingConfigJSON[valueToEdit] = valueToSet ;
		props.setConfigJSON(workingConfigJSON);
    };	

	return (
        !hailed &&
		<div id="hail">
            <div className="ins">
                <p>Heat: Legends &amp; Championships</p>
                <ul className="notes">
                    <li>This is the test area for this app.  You might want to go to <a href="//heat.boardinthevillage.co.uk">The Real App</a></li>
                </ul>
                <ul className="actions">
                    <li className="action-do" id="over--cancel" onClick={(e)=>{ setLocalConfigJSON(true,'hailed') ; setHailed(true);}}>Close</li>
                    <li className="action-do" id="over--close" onClick={(e)=>{ setHailed(true);}}>Close, but show again</li>
                </ul>
            </div>
        </div>
	);
};

export default Hail;