import * as fs from 'fs';

import jsonData from './test.json' ;

const data = JSON.parse(jsonData);
console.log(data.meta.title);

interface Team {
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
  teams: Team[];
}

// Use the interface
const gameData: GameData = JSON.parse(jsonData);
console.log(gameData.meta.title);