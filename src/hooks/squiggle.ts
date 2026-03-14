import { useQuery } from "@tanstack/react-query";
import { getCurrentRound, getGames } from "../api/squiggle";
import type { Game } from "../types/squiggle";

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
