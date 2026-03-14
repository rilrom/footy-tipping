import {
  ActionIcon,
  Alert,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useCurrentRound, useGames } from "../hooks/squiggle";
import { useTips } from "../hooks/tips";
import type { Game } from "../types/squiggle";

interface RoundTips {
  riley: Record<string, string>;
  charlotte: Record<string, string>;
}

function calcScore(games: Game[], playerTips: Record<string, string>) {
  const completed = games.filter((g) => g.complete === 100);

  const correct = completed.filter(
    (g) => playerTips[g.id.toString()] === g.winner,
  ).length;

  return { correct, total: completed.length };
}

type TipStatus = "correct" | "incorrect" | "none" | "pending";

function getTipStatus(game: Game, tip: string | null): TipStatus {
  if (game.complete !== 100) {
    return "pending";
  }

  if (!tip) {
    return "none";
  }

  return tip === game.winner ? "correct" : "incorrect";
}

function renderTip(tip: string | null, status: TipStatus) {
  if (status === "pending") {
    return (
      <Text size="sm" c="dimmed" fs="italic">
        {tip ?? "—"}
      </Text>
    );
  }

  if (status === "none") {
    return (
      <Text size="sm" c="dimmed">
        —
      </Text>
    );
  }

  const color = status === "correct" ? "green" : "red";

  const badge = status === "correct" ? " ✓" : " ✗";

  return (
    <Text size="sm" fw={600} c={color}>
      {tip}
      {badge}
    </Text>
  );
}

export default function Results() {
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

  const roundTips: RoundTips = {
    riley: tipsData?.riley ?? {},
    charlotte: tipsData?.charlotte ?? {},
  };

  const sortedGames = [...games].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const rileyScore = calcScore(sortedGames, roundTips.riley);

  const charlotteScore = calcScore(sortedGames, roundTips.charlotte);

  const hasCompleted = sortedGames.some((g) => g.complete === 100);

  return (
    <Stack gap="md">
      <Title order={1}>
        Results{round !== null ? ` — Round ${round}` : " — Loading..."}
      </Title>

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

      {gamesLoading && !gamesError && (
        <Paper withBorder p="md">
          <SimpleGrid cols={3}>
            <Stack align="center" gap={4}>
              <Text size="sm" c="dimmed">
                Riley
              </Text>
              <Skeleton height={36} width={60} />
            </Stack>
            <Stack align="center" gap={4}>
              <Skeleton height={14} width={90} />
            </Stack>
            <Stack align="center" gap={4}>
              <Text size="sm" c="dimmed">
                Charlotte
              </Text>
              <Skeleton height={36} width={60} />
            </Stack>
          </SimpleGrid>
        </Paper>
      )}

      {!gamesLoading && !gamesError && hasCompleted && (
        <Paper withBorder p="md">
          <SimpleGrid cols={3}>
            <Stack align="center" gap={4}>
              <Text size="sm" c="dimmed">
                Riley
              </Text>
              <Title
                order={2}
                c={
                  rileyScore.correct > charlotteScore.correct ? "green" : undefined
                }
              >
                {rileyScore.correct}
                <Text span size="md" fw={400} c="dimmed">
                  /{rileyScore.total}
                </Text>
              </Title>
            </Stack>

            <Stack align="center" gap={4}>
              <Text size="sm" c="dimmed">
                Round {round} Scores
              </Text>
            </Stack>

            <Stack align="center" gap={4}>
              <Text size="sm" c="dimmed">
                Charlotte
              </Text>
              <Title
                order={2}
                c={
                  charlotteScore.correct > rileyScore.correct ? "green" : undefined
                }
              >
                {charlotteScore.correct}
                <Text span size="md" fw={400} c="dimmed">
                  /{charlotteScore.total}
                </Text>
              </Title>
            </Stack>
          </SimpleGrid>
        </Paper>
      )}

      {!gamesError && (gamesLoading || sortedGames.length > 0) && (
        <Grid>
          <Grid.Col span={4}>
            <Text fw={600} size="sm" c="dimmed" ta="right">
              Riley
            </Text>
          </Grid.Col>
          <Grid.Col span={4} />
          <Grid.Col span={4}>
            <Text fw={600} size="sm" c="dimmed">
              Charlotte
            </Text>
          </Grid.Col>
        </Grid>
      )}

      {gamesError ? (
        <Alert color="red" title="Could not load results">
          The Squiggle API may be unavailable. Try refreshing.
        </Alert>
      ) : gamesLoading ? (
        <Stack gap="xs">
          {Array.from({ length: 5 }).map((_, i) => (
            <Paper key={i} withBorder p="sm">
              <Grid align="center">
                <Grid.Col span={4}>
                  <Group justify="flex-end">
                    <Skeleton height={16} width={80} />
                  </Group>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Stack align="center" gap={4}>
                    <Skeleton height={12} width={100} />
                    <Skeleton height={12} width={70} />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Skeleton height={16} width={80} />
                </Grid.Col>
              </Grid>
            </Paper>
          ))}
        </Stack>
      ) : sortedGames.length === 0 ? (
        <Text c="dimmed">No games found for this round.</Text>
      ) : (
        <Stack gap="xs">
          {sortedGames.map((game) => {
            const id = game.id.toString();

            const rileyTip = roundTips.riley[id] ?? null;

            const charlotteTip = roundTips.charlotte[id] ?? null;

            const rileyStatus = getTipStatus(game, rileyTip);

            const charlotteStatus = getTipStatus(game, charlotteTip);

            const isComplete = game.complete === 100;

            return (
              <Paper key={game.id} withBorder p="sm">
                <Grid align="center">
                  <Grid.Col span={4}>
                    <Group justify="flex-end">
                      {renderTip(rileyTip, rileyStatus)}
                    </Group>
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <Stack align="center" gap={2}>
                      <Text size="xs" c="dimmed">
                        {game.hteam} vs {game.ateam}
                      </Text>
                      {isComplete ? (
                        <Text size="xs" fw={500}>
                          {game.winner} won · {game.hscore}–{game.ascore}
                        </Text>
                      ) : (
                        <Text size="xs" c="dimmed" fs="italic">
                          {game.date
                            ? new Date(game.date).toLocaleString("en-AU", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })
                            : "Pending"}
                        </Text>
                      )}
                    </Stack>
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <Group justify="flex-start">
                      {renderTip(charlotteTip, charlotteStatus)}
                    </Group>
                  </Grid.Col>
                </Grid>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
