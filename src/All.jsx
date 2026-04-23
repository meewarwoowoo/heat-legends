import { useState , useEffect } from 'react';
import Menu from './Menu';
import Main from './Main';

const All = () => {
    const [ main , setMain ] = useState('Race');
    useEffect(() => {
        document.getElementById('root').setAttribute('data-view',main.toLowerCase());
        window.scrollTo(0,0);
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
            <Menu {...backboneProps} />
            <Main {...backboneProps} />
        </>
    )
}
export default All