import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getCurrentRound, getGames, getStandings } from "../api/squiggle";
import { isRoundLocked } from "../lib/deadline";
import type { Game, Standing } from "../types/squiggle";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

interface UseGamesOptions {
  enabled?: boolean;
}

export function useGames(
  year: number,
  round?: number,
  options?: UseGamesOptions,
) {
  return useQuery<Game[]>({
    queryKey: ["squiggle", "games", year, round ?? null],
    queryFn: () => getGames(year, round),
    staleTime: STALE_TIME,
    ...options,
  });
}

export function useCurrentRound(year: number) {
  return useQuery<number>({
    queryKey: ["squiggle", "currentRound", year],
    queryFn: () => getCurrentRound(year),
    staleTime: STALE_TIME,
  });
}

export function useStandings(year: number) {
  return useQuery<Standing[]>({
    queryKey: ["squiggle", "standings", year],
    queryFn: () => getStandings(year),
    staleTime: STALE_TIME,
  });
}

export function useRoundLocked(games: Game[]): boolean {
  const [locked, setLocked] = useState(() => isRoundLocked(games));

  useEffect(() => {
    setLocked(isRoundLocked(games));

    const interval = setInterval(() => {
      setLocked(isRoundLocked(games));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [games]);

  return locked;
}
