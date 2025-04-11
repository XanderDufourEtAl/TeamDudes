import jsonData from 'C:/Users/frizz/Documents/Github/TeamDudes/test.json';
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

interface Totals {
  goals: string;
  assists: string;
  shots: string;
}

interface Meta {
  title: string;
  description: string;
}

interface GameData {
  meta: Meta;
  teams: HockeyTeam[];
}

// Use the interface
const gameData: GameData = jsonData;
console.log(gameData.meta.title);