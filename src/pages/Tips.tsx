import {
  ActionIcon,
  Alert,
  Group,
  Loader,
  SegmentedControl,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import GameCard from "../components/GameCard";
import { config } from "../config";
import { usePreferences } from "../hooks/preferences";
import {
  useCurrentRound,
  useGames,
  useRoundLocked,
  useStandings,
} from "../hooks/squiggle";
import { useSaveTips, useTips } from "../hooks/tips";
import type { Game, Standing } from "../types/squiggle";

export default function Tips() {
  const [player, setPlayer] = useState<string>(config.players[0].id);

  const [year] = useState(new Date().getFullYear());

  const [roundOffset, setRoundOffset] = useState(0);

  const { data: currentRound } = useCurrentRound(year);

  const round = currentRound !== undefined ? currentRound + roundOffset : null;

  const { preferences } = usePreferences();

  const {
    data: games = [],
    isPending: gamesLoading,
    isError: gamesError,
  } = useGames(year, round ?? undefined, { enabled: round !== null });

  const { data: standingsData } = useStandings(year);

  const standings: Record<number, Standing> = Object.fromEntries(
    (standingsData ?? []).map((s) => [s.id, s]),
  );

  const { data: tipsData } = useTips(year, round ?? -1, {
    enabled: round !== null,
  });

  const tips: Record<string, string> = tipsData?.[player] ?? {};

  const saveTips = useSaveTips();

  const sortedGames = [...games].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const roundLocked = useRoundLocked(games);

  const isLocked = roundLocked && !preferences.allowLateTipping;

  const roundComplete =
    games.length > 0 && games.every((g) => g.complete === 100);

  const lockedMessage = roundComplete
    ? "This round is complete — tips are locked."
    : "This round has started — tips are locked.";

  function handleTip(game: Game, teamName: string) {
    if (round === null) {
      return;
    }

    if (isLocked) {
      return;
    }

    saveTips.mutate({
      year: year.toString(),
      round: round.toString(),
      player,
      tips: { ...tips, [game.id.toString()]: teamName },
    });
  }

  return (
    <Stack gap="md">
      <Group align="baseline" gap="sm">
        <Title order={1}>
          Tips{round !== null ? ` — Round ${round}` : " — Loading..."}
        </Title>
        {saveTips.isPending && <Loader size="xs" />}
      </Group>

      <SegmentedControl
        value={player}
        onChange={(v) => setPlayer(v)}
        data={config.players.map((p) => ({ value: p.id, label: p.label }))}
        w="fit-content"
      />

      <Group gap="xs" align="center">
        <ActionIcon
          variant="default"
          disabled={round === null || round <= 0}
          onClick={() => {
            if (round !== null && round > 0) {
              setRoundOffset((o) => o - 1);
            }
          }}
        >
          ‹
        </ActionIcon>
        <Text fw={600} w={80} ta="center">
          {round !== null ? `Round ${round}` : "—"}
        </Text>
        <ActionIcon
          variant="default"
          disabled={round === null}
          onClick={() => {
            if (round !== null) {
              setRoundOffset((o) => o + 1);
            }
          }}
        >
          ›
        </ActionIcon>
      </Group>

      {gamesError ? (
        <Alert color="red" title="Could not load fixtures">
          The Squiggle API may be unavailable. Try refreshing.
        </Alert>
      ) : gamesLoading ? (
        <Stack gap="sm">
          {["1", "2", "3", "4", "5"].map((n) => (
            <Skeleton key={n} height={72} radius="md" />
          ))}
        </Stack>
      ) : sortedGames.length === 0 ? (
        <Text c="dimmed">No games found for this round.</Text>
      ) : (
        <Stack gap="sm">
          {isLocked && (
            <Alert color="yellow" title="Tipping closed">
              {lockedMessage}
            </Alert>
          )}
          {sortedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              tip={tips[game.id.toString()] ?? null}
              onTip={(teamName) => handleTip(game, teamName)}
              locked={isLocked}
              hideResults={preferences.hideResults}
              disabled={game.complete === 100 && !preferences.allowLateTipping}
              standings={standings}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
