import { usa , gbr , fra , ita , ned , mex , jap , esp , icon_esp , icon_usa , icon_gbr , icon_fra , icon_ita , icon_ned , icon_mex , icon_jap} from '../images';
import { defaultTracksJSON , defaultColoursJSON } from '../localJSON';

const shuffleDeck = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j]; 
        a[j] = x;
        }
    return a;
};


const doToast = (txt) => {
//    alert(txt)
    console.log(txt)
}

const doConfirm = (txt,callback,shortCircuit) => {
    if(shortCircuit){
        callback();
        return false;
    }
    else{
        document.getElementById('root').insertAdjacentHTML("afterend",'<div id="over"><div class="ins"><p>'+txt+'</p><ul><li class="action-do" id="over--confirm">Yes</li><li class="action-do" id="over--reject">No</li></ul></div></div>');
        document.getElementById('over--confirm').addEventListener('click',()=>{
            document.getElementById('over').remove();
            callback();
        })
        document.getElementById('over--reject').addEventListener('click',()=>{
            document.getElementById('over').remove();
        })
    }
}
const getTrackFromAbbr = (abbr) => {
    let lockIdx = false;
    defaultTracksJSON.map( (track,idx) => { if(track.abbr===abbr) lockIdx = idx } )
    if(lockIdx!==false) return defaultTracksJSON[lockIdx]
};

const getNameFromDriverId = (driversJSON,driverId) => {
    let lockIdx = false;
    driversJSON.map( (driver,idx) => { if(driver.id===driverId) lockIdx = idx  } )
    if(lockIdx!==false) return driversJSON[lockIdx].name
};

const getDriverFromId = (driversJSON,driverId) => {
    let lockIdx = false;
    driversJSON.map( (driver,idx) => { if(driver.id===driverId) lockIdx = idx  } )
    if(lockIdx!==false) return driversJSON[lockIdx]
};

const getResultFromRace = (race,driver) => {
    if(race && race.result){
        return getNumberWithOrdinal(race.result.indexOf(driver) + 1) ;
    }
};

const getNumberWithOrdinal = (number) => {
    if(number===1){
        return number+'st';
    }
    if(number===2){
        return number+'nd';
    }
    if(number===3){
        return number+'rd'
    }
    if(number<=0){
        return false ;
    }
    return number + 'th';
};


const getPointsFromRace = (race,driver) => {
    if(race && race.result && race.result.indexOf(driver)>=0 ) return race.points[race.result.indexOf(driver)];
    return false
};

const getActiveRaceIdx = (seasonJSON) => {
    return Number(seasonJSON.races.indexOf(seasonJSON.races.find((race,idx)=>race.active)))
}

const getFlagFromTrack = (raceTrack,icon=false) => {
    if(icon===true){
        if(raceTrack==='GBR') return icon_gbr
        if(raceTrack==='JAP') return icon_jap
        if(raceTrack==='ESP') return icon_esp
        if(raceTrack==='NED') return icon_ned
        if(raceTrack==='MEX') return icon_mex
        if(raceTrack==='FRA') return icon_fra
        if(raceTrack==='USA') return icon_usa
        if(raceTrack==='ITA') return icon_ita
    } else {
        if(raceTrack==='GBR') return gbr
        if(raceTrack==='JAP') return jap
        if(raceTrack==='ESP') return esp
        if(raceTrack==='NED') return ned
        if(raceTrack==='MEX') return mex
        if(raceTrack==='FRA') return fra
        if(raceTrack==='USA') return usa
        if(raceTrack==='ITA') return ita
    }
};

const getDriverArticleDataColour = (driver) => { 
    return {
        "--bkg": defaultColoursJSON.find(el=>el.name===driver.colour).bkg , 
        "--txt": defaultColoursJSON.find(el=>el.name===driver.colour).txt 
    };
}
const getDriverArticleDataColourContrast = (driver) => { 
    if(defaultColoursJSON.find(el=>el.name===driver.colour).txt==='rgb(255,255,255)') return 'blk';
}

export {  getNumberWithOrdinal, getDriverFromId , getDriverArticleDataColour, getDriverArticleDataColourContrast , getFlagFromTrack , getNameFromDriverId, getActiveRaceIdx , getResultFromRace , getPointsFromRace , getTrackFromAbbr , shuffleDeck , doToast , doConfirm }