import { useEffect, useState } from "react";
//import jsonData from './assets/jsons/game.json';
interface Player {
    Team: string;
    FirstName: string;
    LastName: string;
    UniformNumber: string;
    Photo: string;
    PersonId: string;
}

interface Team {
    Id: string;
    Name: string;
    Score: number;
    CurrentRecord: string;
    NcaaSchoolCode: string;
    Color: string;
    TextColor: string;
    Logo: string;
    Url: string;
    PeriodScores: number[];
    Starters: { Player: Player; Position: string }[];
    BatOrder: { Player: Player; Position: string }[];
}

interface LastPlay {
    Player: Player | null;
    Team: string;
    Narrative: string;
    Context: string;
    Id: string;
    Type: string;
    Action: string | null;
    Period: number;
    ClockSeconds: number;
    Score: number | null
    InvolvedPlayers?: Player[];
}

interface Situation {
    PitchingTeam: string | null;
    BattingTeam: string | null;
    Pitcher: Player | null;
    PitcherPitchCount: number;
    PitcherHandedness: string | null;
    Batter: Player | null;
    BatterHandedness: string | null;
    OnDeck: Player | null;
    OnDeckHandedness: string | null;
    OnFirst: Player | null;
    OnSecond: Player | null;
    OnThird: Player | null;
    WinPitcher: Player | null;
    LossPitcher: Player | null;
    SavePitcher: Player | null;
    Balls: number;
    Strikes: number;
    Outs: number;
    Inning: number;
}

interface BaseballGame {
    Type: string;
    HasStarted: boolean;
    IsComplete: boolean;
    Source: string;
    Date: string;
    DateUTC: string | null;
    StartTime: string;
    EndTime: string;
    NcaaGameId: string;
    Notes: string[];
    Location: string;
    GlobalSportShortname: string;
    BannerMessage: string;
    StadiumImage: string | null;
    SiteImage: string | null;
    ClientHostname: string;
    Officials: string;
    Attendance: number;
    PeriodsRegulation: number;
    Period: number;
    ClockSeconds: number;
    Context: string;
    Rules: {
        PeriodMinutes: number;
        PeriodName: string;
        OTMinutes: number;
        ShowExtraPeriodsAsOT: boolean;
        ClockDirection: string;
        ClockSegmentation: string;
    };
    HomeTeam: Team;
    VisitingTeam: Team;
    LastPlays: LastPlay[];
    Situation: Situation;
}

function Baseball() {
    const [Homescore, setHomeScore] = useState<number>(0);
    const [VisitingScore, setVisitingScore] = useState<number>(0);
    const [HomeLogo, setHomeLogo] = useState<string>("");
    const [VisitingLogo, setVisitingLogo] = useState<string>("");
    const [gameData, setGameData] = useState<BaseballGame | null>(null);
    useEffect(() => {
        const fetchScore = async () => {
            try {
                const response = await fetch("https://sidearmstats.com/umaine/baseball/game.json");
                const json = await response.json();
                const data: BaseballGame = json.Game; // Access the Game property to match the BaseballGame interface
                setHomeScore(data.HomeTeam.Score);
                setVisitingScore(data.VisitingTeam.Score);
                setVisitingLogo(data.VisitingTeam.Logo);
                setHomeLogo(data.HomeTeam.Logo);
                setGameData(data); // Store the entire game data if needed
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };

        fetchScore();
    }, []);

    return (
        <div>
            <h1>Baseball Game Score</h1>
            <img src={HomeLogo} alt="Home Team Logo" style={{ width: "100px", height: "100px" }} />
            <img src={VisitingLogo} alt="Visiting Team Logo" style={{ width: "100px", height: "100px" }} />
            <h3>{gameData?.Date}</h3>
            <p>{Homescore} - {VisitingScore}</p>
        </div>
    );
};

export default Baseball;

