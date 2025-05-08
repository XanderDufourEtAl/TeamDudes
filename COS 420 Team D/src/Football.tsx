import jsonData from './assets/jsons/Football.json';// Data is currently hardcoded to the json file, using ncaa-grab.py and gathering boxscore
import './Football.css';

/*
  Similar to the baseball widget, the football widget fetches data from a json file.
  This data on the other hand is not live and is hardcoded to a json file.
  Currently the json file is football.json which is the boxscore for umaine last football game vs Penn State.
  The data is formatted on its own from football.css and then displayed in the widget.tsx file.

  As i said in baseball.tsx, if you want to add a widget for individual player for example,
  you should be able to do a new function and export it but again idk for sure -Matt
*/

const data = jsonData;
console.log(data.meta.title);

interface footballTeam {
  teamId: number;
  playerStats: PlayerStat[];
  playerTotals: Totals;
  totalStats: Totals;
}

interface PlayerStat {
  firstName: string;
  lastName: string;
  name: string;
  position: string;
  goals: string;
  assists: string;
}

interface TeamData {
  shortName: string
  id: string;
}

interface Totals {
  goals: string;
  assists: string;
  shots: string;
}

interface Meta {
  title: string;
  description: string;
  teams: TeamData[];
}

interface GameData {
  meta: Meta;
  teams: footballTeam[];
}

// Use the interface
const gameData: GameData = jsonData;// Holds all the data from the json, accessed using the interfaces
function football(){
  //Have to use this to get the team names from the json as only team id and state name are given
  const teamIdToShortName = gameData.meta.teams.reduce((map, team) => {
    map[team.id] = team.shortName;
    return map;
  }, {} as Record<string, string>);
  return (
    // Formatting the data to be displayed in the widget
    <div className="football-container">
      <h3>{gameData.meta.description}</h3>
      <div className="teams">
        <p>{teamIdToShortName[gameData.teams[0].teamId.toString()]} | {teamIdToShortName[gameData.teams[1].teamId.toString()]}</p>
        <p>{gameData.teams[0].totalStats.goals} - {gameData.teams[1].totalStats.goals}</p>
      </div>
    </div>
  );
}

export default football;