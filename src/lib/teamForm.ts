import type { Game } from "../types/squiggle";

export function formatRank(rank: number): string {
  const lastTwoDigits = rank % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${rank}th`;
  }

  const lastDigit = rank % 10;

  if (lastDigit === 1) {
    return `${rank}st`;
  }

  if (lastDigit === 2) {
    return `${rank}nd`;
  }

  if (lastDigit === 3) {
    return `${rank}rd`;
  }

  return `${rank}th`;
}

export function formatMatchDate(dateStr: string): string {
  return new Date(`${dateStr.replace(" ", "T")}Z`).toLocaleDateString(
    "en-AU",
    {
      day: "numeric",
      month: "short",
    },
  );
}

export function getTeamGames(games: Game[], teamId: number): Game[] {
  return games
    .filter(
      (game) =>
        game.complete === 100 &&
        (game.hteamid === teamId || game.ateamid === teamId),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMatchResult(game: Game, teamId: number): "W" | "L" | "D" {
  const teamIsHome = game.hteamid === teamId;
  const teamScore = teamIsHome ? game.hscore : game.ascore;
  const opponentScore = teamIsHome ? game.ascore : game.hscore;

  if (teamScore !== null && opponentScore !== null) {
    if (teamScore > opponentScore) {
      return "W";
    }

    if (teamScore < opponentScore) {
      return "L";
    }

    return "D";
  }

  return game.winner === (teamIsHome ? game.hteam : game.ateam) ? "W" : "L";
}

export function getResultColor(result: "W" | "L" | "D"): string {
  if (result === "W") {
    return "green";
  }

  if (result === "L") {
    return "red";
  }

  return "gray";
}
