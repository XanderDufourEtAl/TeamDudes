import jsonData from './assets/jsons/Hockey.json';
import './Hockey.css';

const data = jsonData;
console.log(data.meta.title);

interface HockeyTeam {
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
  teams: HockeyTeam[];
}

// Use the interface
const gameData: GameData = jsonData;
function Hockey(){
  const teamIdToShortName = gameData.meta.teams.reduce((map, team) => {
    map[team.id] = team.shortName;
    return map;
  }, {} as Record<string, string>);
  return (
    <div className="hockey-container">
      <h3>{gameData.meta.description}</h3>
      <div className="teams">
        <p>{teamIdToShortName[gameData.teams[0].teamId.toString()]} | {teamIdToShortName[gameData.teams[1].teamId.toString()]}</p>
        <p>{gameData.teams[0].totalStats.goals} - {gameData.teams[1].totalStats.goals}</p>
      </div>
    </div>
  );
}

export default Hockey;