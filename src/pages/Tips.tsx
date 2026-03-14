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
import { useCurrentRound, useGames } from "../hooks/squiggle";
import { useSaveTips, useTips } from "../hooks/tips";
import type { Game } from "../types/squiggle";

type Player = "riley" | "charlotte";

export default function Tips() {
  const [player, setPlayer] = useState<Player>("riley");

  const [year] = useState(new Date().getFullYear());

  const [roundOffset, setRoundOffset] = useState(0);

  const { data: currentRound } = useCurrentRound(year);

  const round = currentRound !== undefined ? currentRound + roundOffset : null;

  const { data: games = [], isPending: gamesLoading, isError: gamesError } = useGames(
    year,
    round ?? undefined,
    { enabled: round !== null },
  );

  const { data: tipsData } = useTips(year, round ?? -1, {
    enabled: round !== null,
  });

  const tips: Record<string, string> = tipsData?.[player] ?? {};

  const saveTips = useSaveTips();

  const sortedGames = [...games].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  function handleTip(game: Game, teamName: string) {
    if (round === null) {
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
        onChange={(v) => setPlayer(v as Player)}
        data={[
          { value: "riley", label: "Riley" },
          { value: "charlotte", label: "Charlotte" },
        ]}
        w="fit-content"
      />

      <Group gap="xs" align="center">
        <ActionIcon
          variant="default"
          disabled={round === null || round <= 1}
          onClick={() => {
            if (round !== null && round > 1) {
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
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={72} radius="md" />
          ))}
        </Stack>
      ) : sortedGames.length === 0 ? (
        <Text c="dimmed">No games found for this round.</Text>
      ) : (
        <Stack gap="sm">
          {sortedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              tip={tips[game.id.toString()] ?? null}
              onTip={(teamName) => handleTip(game, teamName)}
              disabled={game.complete === 100}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
