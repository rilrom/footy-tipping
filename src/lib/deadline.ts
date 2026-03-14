import type { Game } from "../types/squiggle";

export function isRoundLocked(games: Game[]): boolean {
  const datedGames = games.filter((g) => Boolean(g.date));

  if (datedGames.length === 0) {
    return false;
  }

  const earliest = Math.min(
    ...datedGames.map((g) => new Date(g.date).getTime()),
  );

  return earliest <= Date.now();
}
