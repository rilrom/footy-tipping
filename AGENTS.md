# Code Style

## TypeScript

Prefer `interface` over `type` aliases. Only use inline types when there is no reasonable alternative.

```ts
// Good
interface User {
  id: number;
  name: string;
}

// Avoid
type User = {
  id: number;
  name: string;
};
```

Name interfaces for React component props with a `Props` suffix. Accept props as a single typed parameter and destructure inside the function body:

```ts
interface GameCardProps {
  game: Game;
  tip: string | null;
  onTip: (teamName: string) => void;
  disabled?: boolean;
}

export default function GameCard(props: GameCardProps) {
  const { game, tip, onTip, disabled = false } = props;
```

Name interfaces for function parameters with an `Args` suffix. Accept args as a single typed parameter and destructure inside the function body:

```ts
interface SaveTipsArgs {
  year: string;
  round: string;
  player: string;
  tips: Record<string, string>;
}

function saveTips(args: SaveTipsArgs) {
  const { year, round, player, tips } = args;
```

## Control Flow

No inline `if` statements. Always use a block body.

```ts
// Good
if (!tip) {
  return "none";
}

// Avoid
if (!tip) return "none";
```

## Spacing

Use empty lines liberally to separate logical sections — between imports and constants, between functions, between distinct blocks within a function, and between interface properties when a comment is helpful.

```ts
import { useMutation, useQuery } from "@tanstack/react-query";

const STALE_TIME = 60 * 1000;

interface FetchGamesArgs {
  year: number;
  round: number;
}

function fetchGames(args: FetchGamesArgs) {
  const { year, round } = args;


  return fetch(`/api/games?year=${year}&round=${round}`).then((r) => {
    if (!r.ok) {
      throw new Error(r.statusText);
    }

    return r.json();
  });
}

function calcScore(games: Game[], playerTips: Record<string, string>) {
  const completed = games.filter((g) => g.complete === 100);

  const correct = completed.filter(
    (g) => playerTips[g.id.toString()] === g.winner,
  ).length;

  return { correct, total: completed.length };
}
```
