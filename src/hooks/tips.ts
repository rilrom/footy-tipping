import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const STALE_TIME = 60 * 1000; // 1 minute

// Per-round endpoint: { riley: { gameId: team }, charlotte: { gameId: team } }
interface RoundTipsResponse {
  riley?: Record<string, string>;
  charlotte?: Record<string, string>;
}

// All-rounds endpoint: { "1": { riley: {...}, charlotte: {...} }, "2": {...} }
type YearTipsResponse = Record<
  string,
  { riley?: Record<string, string>; charlotte?: Record<string, string> }
>;

interface SaveTipsArgs {
  year: string;
  round: string;
  player: string;
  tips: Record<string, string>;
}

interface UseTipsOptions {
  enabled?: boolean;
}

export function useTips(
  year: number,
  round: number,
  options?: UseTipsOptions,
) {
  return useQuery<RoundTipsResponse>({
    queryKey: ["tips", year, round],
    queryFn: () =>
      fetch(`/api/tips?year=${year}&round=${round}`).then((r) => {
        if (!r.ok) {
          throw new Error(r.statusText);
        }

        return r.json();
      }),
    staleTime: STALE_TIME,
    ...options,
  });
}

export function useAllTips(year: number) {
  return useQuery<YearTipsResponse>({
    queryKey: ["tips", year],
    queryFn: () =>
      fetch(`/api/tips?year=${year}`).then((r) => {
        if (!r.ok) {
          throw new Error(r.statusText);
        }

        return r.json();
      }),
    staleTime: STALE_TIME,
  });
}

export function useSaveTips() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, SaveTipsArgs>({
    mutationFn: (args) =>
      fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      }).then((r) => {
        if (!r.ok) {
          throw new Error(r.statusText);
        }
      }),
    onSuccess: () => {
      // Invalidate all tips cache so the UI reflects saved data.
      // Note: the original Tips.tsx did an optimistic setTips() before the POST
      // completed. That behaviour is intentionally dropped here (see spec Out of
      // Scope). The selected team will briefly appear deselected until the
      // refetch resolves. Add onMutate optimistic logic here if this becomes
      // noticeable.
      queryClient.invalidateQueries({ queryKey: ["tips"] });
    },
  });
}
