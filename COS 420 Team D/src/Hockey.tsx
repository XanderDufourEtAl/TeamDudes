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
console.log(gameData.meta.title);
function Hockey(){
  const teamIdToShortName = gameData.meta.teams.reduce((map, team) => {
    map[team.id] = team.shortName;
    return map;
  }, {} as Record<string, string>);
  return (
    <div className="hockey-container">
      <h1>{gameData.meta.title}</h1>
      <h2>{gameData.meta.description}</h2>
      <h3>Game Stats:</h3>
      <div className="teams">
        {gameData.teams.map((team) => (
          <div key={team.teamId} className="team-card">
            <h2>{teamIdToShortName[team.teamId.toString()]}</h2>
            <h3>Player Stats:</h3>
            <ul>
              {team.playerStats.map((player) => (
                <li key={player.name}>
                  {player.firstName} {player.lastName} - {player.position}: {player.goals} goals, {player.assists} assists
                </li>
              ))}
            </ul>
            <h3>Total Stats:</h3>
            <p>Goals: {team.playerTotals.goals}</p>
            <p>Assists: {team.playerTotals.assists}</p>
            <p>Shots: {team.playerTotals.shots}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hockey;