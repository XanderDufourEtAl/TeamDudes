//import jsonData from './assets/jsons/CountDown.json';// Data is currently hardcoded to the json file, using ncaa-grab.py and gathering boxscore
import './CountDown.css';

/*
  using the hockey widget as a base, This is just a hardcoded prototype widget to show a count down to the next scheduled game
  CountDown.json needs to be made
*/

//const data = jsonData;
console.log("test1");


//const gameData: GameData = jsonData;// Holds all the data from the json, accessed using the interfaces
function CountDown(){
  //Have to use this to get the team names from the json as only team id and state name are given
  /*
  const teamIdToShortName = gameData.meta.teams.reduce((map, team) => {
    map[team.id] = team.shortName;
    return map;
  }, {} as Record<string, string>);
  return (
    // Formatting the data to be displayed in the widget
    <div className="countdown-container">
      <h3>{gameData.meta.description}</h3>
      <div className="teams">
        <p>{teamIdToShortName[gameData.teams[0].teamId.toString()]} | {teamIdToShortName[gameData.teams[1].teamId.toString()]}</p>
        <p>{gameData.teams[0].totalStats.goals} - {gameData.teams[1].totalStats.goals}</p>
      </div>
    </div>
  );
  */
}

export default CountDown;