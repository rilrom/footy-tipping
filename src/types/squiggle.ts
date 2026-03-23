export interface Game {
  id: number;
  hteam: string;
  ateam: string;
  hteamid: number;
  ateamid: number;
  date: string;
  round: number;
  year: number;
  complete: number; // 0–100
  winner: string; // team name, or empty string if not yet complete
  hscore: number | null;
  ascore: number | null;
  roundname: string;
  venue: string;
}

export interface Team {
  id: number;
  name: string;
  abbrev: string;
  logo: string;
}

export interface Standing {
  id: number;
  rank: number;
  name: string;
  abbrev: string;
  wins: number;
  losses: number;
  draws: number;
  played: number;
  for: number;
  against: number;
}
