//import jsonData from './assets/jsons/CountDown.json';// Data is currently hardcoded to the json file, using ncaa-grab.py and gathering boxscore
import './CountDown.css';

/*
  using the hockey widget as a base, This is just a hardcoded prototype widget to show a count down to the next scheduled game
  CountDown.json needs to be made
*/

//const data = jsonData;
console.log("test1");

//const millsecToSec = 1000
//const secToMin = 60
//const MinToHour = 60
//const HourToDay = 24

//curent time in milliseconds
const CurTime = (Date.now()/100000000);

//plug in the hard codded days till game, then the hour and minute the game in on
//const gameDaysFromNow = 0
//const gameHourOnDay = 15
//const gameMinuteOnDay = 0

//convert curtime to curday
//const curDay = CurTime / millsecToSec / secToMin / MinToHour / HourToDay

//const gameData: GameData = jsonData;// Holds all the data from the json, accessed using the interfaces
function CountDown(){
  //Have to use this to get the team names from the json as only team id and state name are given
  /*
  const teamIdToShortName = gameData.meta.teams.reduce((map, team) => {
    map[team.id] = team.shortName;
    return map;
  }, {} as Record<string, string>);
  */
  return (
    //Formatting the data to be displayed in the widget
    <div className="countdown-container">
    
      <h3>{"Next game:"}</h3>
      <div className="teams">
        <p>{"Umaine Vs Binghamton"}</p>
        <p>{"Sport: Baseball"}</p>
        <p>{"INSERT TIMER HERE"}</p>
        <p>{CurTime}</p>
        
        
      </div>
    </div>
  );

}

export default CountDown;