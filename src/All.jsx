import React , {useState , useEffect } from 'react';
import Head from './Head';
import Menu from './Menu';
import Main from './Main';

const All = () => {
    const [ main , setMain ] = useState('Race');
    useEffect(() => {
        document.getElementById('root').setAttribute('data-view',main.toLowerCase())
    }, [main]);

    let localSeasonJSON = JSON.parse(localStorage.getItem('seasonJSON'));
	if(localSeasonJSON===null) localSeasonJSON = null ;
	const [ seasonJSON, setSeasonJSON ] = useState(localSeasonJSON);

    useEffect(() => {
        localStorage.setItem('seasonJSON',JSON.stringify(seasonJSON));
    }, [seasonJSON]);



    const backboneProps = { main , setMain , seasonJSON , setSeasonJSON }
	return (
        <>
            <Head {...backboneProps}/>
            <Menu {...backboneProps} />
            <Main {...backboneProps} />
        </>
    )
}
export default All