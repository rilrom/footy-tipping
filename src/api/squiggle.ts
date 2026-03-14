import type { Game, Team } from "../types/squiggle";

const BASE_URL = "https://api.squiggle.com.au/";

const HEADERS: HeadersInit = {
  "User-Agent": "footy-tipping-app (personal)",
};

async function squiggleFetch<T>(query: string): Promise<T> {
  const response = await fetch(`${BASE_URL}?${query}`, { headers: HEADERS });

  if (!response.ok) {
    throw new Error(`Squiggle API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getGames(year: number, round?: number): Promise<Game[]> {
  const query = round !== undefined
    ? `q=games;year=${year};round=${round}`
    : `q=games;year=${year}`;

  const data = await squiggleFetch<{ games: Game[] }>(query);

  return data.games;
}

export async function getTeams(): Promise<Team[]> {
  const data = await squiggleFetch<{ teams: Team[] }>("q=teams");

  return data.teams;
}

export async function getCurrentRound(year: number): Promise<number> {
  const games = await getGames(year);

  const incomplete = games.filter((g) => g.complete < 100);

  if (incomplete.length === 0) {
    return Math.max(...games.map((g) => g.round));
  }
  
  return Math.min(...incomplete.map((g) => g.round));
}
