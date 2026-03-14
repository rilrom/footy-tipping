import {
  Alert,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useGames } from "../hooks/squiggle";
import { useAllTips } from "../hooks/tips";
import type { Game } from "../types/squiggle";

type YearTips = Record<
  string,
  { riley?: Record<string, string>; charlotte?: Record<string, string> }
>;

interface RoundResult {
  round: number;
  riley: number | null;
  charlotte: number | null;
  completedGames: number;
  totalGames: number;
  isComplete: boolean;
}

function calcRoundScore(
  games: Game[],
  playerTips: Record<string, string> | undefined,
): number | null {
  if (!playerTips || Object.keys(playerTips).length === 0) {
    return null;
  }

  const completed = games.filter((g) => g.complete === 100);

  if (completed.length === 0) {
    return null;
  }

  return completed.filter((g) => playerTips[g.id.toString()] === g.winner)
    .length;
}

export default function Leaderboard() {
  const [year] = useState(new Date().getFullYear());

  const { data: allGames = [], isPending: gamesLoading, isError: gamesError } = useGames(year);

  const { data: yearTips = {} } = useAllTips(year);

  const completedGames = allGames.filter((g) => g.complete === 100);

  const byRound = completedGames.reduce<Record<number, Game[]>>((acc, g) => {
    if (!acc[g.round]) {
      acc[g.round] = [];
    }

    acc[g.round].push(g);

    return acc;
  }, {});

  const allByRound = allGames.reduce<Record<number, Game[]>>((acc, g) => {
    if (!acc[g.round]) {
      acc[g.round] = [];
    }

    acc[g.round].push(g);

    return acc;
  }, {});

  const roundResults: RoundResult[] = Object.entries(yearTips as YearTips)
    .map(([roundStr, players]) => {
      const roundNum = parseInt(roundStr, 10);

      const completedInRound = byRound[roundNum] ?? [];

      const allInRound = allByRound[roundNum] ?? [];

      return {
        round: roundNum,
        riley: calcRoundScore(completedInRound, players.riley),
        charlotte: calcRoundScore(completedInRound, players.charlotte),
        completedGames: completedInRound.length,
        totalGames: allInRound.length,
        isComplete:
          allInRound.length > 0 &&
          completedInRound.length === allInRound.length,
      };
    })
    .filter((r) => r.riley !== null || r.charlotte !== null)
    .sort((a, b) => a.round - b.round);

  const rileyTotal = roundResults.reduce((sum, r) => sum + (r.riley ?? 0), 0);

  const charlotteTotal = roundResults.reduce(
    (sum, r) => sum + (r.charlotte ?? 0),
    0,
  );

  const roundsPlayed = roundResults.length;

  return (
    <Stack gap="md">
      <Title order={1}>Leaderboard — {year}</Title>

      {gamesError ? (
        <Alert color="red" title="Could not load leaderboard">
          The Squiggle API may be unavailable. Try refreshing.
        </Alert>
      ) : gamesLoading ? (
        <>
          <Paper withBorder p="xl">
            <SimpleGrid cols={3}>
              <Stack align="center" gap={4}>
                <Text fw={700}>Riley</Text>
                <Skeleton height={34} width={50} />
                <Text size="sm" c="dimmed">
                  correct tips
                </Text>
              </Stack>

              <Stack align="center" gap={4}>
                <Text size="xs" c="dimmed">
                  after
                </Text>
                <Skeleton height={22} width={30} />
                <Text size="xs" c="dimmed">
                  rounds
                </Text>
              </Stack>

              <Stack align="center" gap={4}>
                <Text fw={700}>Charlotte</Text>
                <Skeleton height={34} width={50} />
                <Text size="sm" c="dimmed">
                  correct tips
                </Text>
              </Stack>
            </SimpleGrid>
          </Paper>

          <Title order={2} fz="md">
            Round by Round
          </Title>

          <Table striped withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Round</Table.Th>
                <Table.Th ta="center">Riley</Table.Th>
                <Table.Th ta="center">Charlotte</Table.Th>
                <Table.Th ta="center">Games</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <Table.Tr key={i}>
                  <Table.Td>
                    <Skeleton height={14} width={60} />
                  </Table.Td>
                  <Table.Td>
                    <Group justify="center">
                      <Skeleton height={14} width={30} />
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group justify="center">
                      <Skeleton height={14} width={30} />
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group justify="center">
                      <Skeleton height={14} width={30} />
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      ) : roundsPlayed === 0 ? (
        <Text c="dimmed">No completed rounds with tips yet.</Text>
      ) : (
        <>
          <Paper withBorder p="xl">
            <SimpleGrid cols={3}>
              <Stack align="center" gap={4}>
                <Text fw={700}>Riley</Text>
                <Title
                  order={1}
                  c={rileyTotal > charlotteTotal ? "green" : undefined}
                >
                  {rileyTotal}
                </Title>
                <Text size="sm" c="dimmed">
                  correct tips
                </Text>
              </Stack>

              <Stack align="center" gap={4}>
                <Text size="xs" c="dimmed">
                  after
                </Text>
                <Title order={3} c="dimmed">
                  {roundsPlayed}
                </Title>
                <Text size="xs" c="dimmed">
                  {roundsPlayed === 1 ? "round" : "rounds"}
                </Text>
              </Stack>

              <Stack align="center" gap={4}>
                <Text fw={700}>Charlotte</Text>
                <Title
                  order={1}
                  c={charlotteTotal > rileyTotal ? "green" : undefined}
                >
                  {charlotteTotal}
                </Title>
                <Text size="sm" c="dimmed">
                  correct tips
                </Text>
              </Stack>
            </SimpleGrid>
          </Paper>

          <Title order={2} fz="md">
            Round by Round
          </Title>

          <Table striped withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Round</Table.Th>
                <Table.Th ta="center">Riley</Table.Th>
                <Table.Th ta="center">Charlotte</Table.Th>
                <Table.Th ta="center">Games</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {roundResults.map((r) => (
                <Table.Tr key={r.round}>
                  <Table.Td>Round {r.round}</Table.Td>
                  <Table.Td ta="center">
                    <Text
                      fw={
                        r.riley !== null &&
                        r.charlotte !== null &&
                        r.riley > r.charlotte
                          ? 700
                          : undefined
                      }
                      c={
                        r.riley !== null &&
                        r.charlotte !== null &&
                        r.riley > r.charlotte
                          ? "green"
                          : undefined
                      }
                    >
                      {r.riley !== null
                        ? r.isComplete
                          ? `${r.riley}`
                          : `${r.riley}/${r.completedGames}`
                        : "—"}
                    </Text>
                  </Table.Td>
                  <Table.Td ta="center">
                    <Text
                      fw={
                        r.charlotte !== null &&
                        r.riley !== null &&
                        r.charlotte > r.riley
                          ? 700
                          : undefined
                      }
                      c={
                        r.charlotte !== null &&
                        r.riley !== null &&
                        r.charlotte > r.riley
                          ? "green"
                          : undefined
                      }
                    >
                      {r.charlotte !== null
                        ? r.isComplete
                          ? `${r.charlotte}`
                          : `${r.charlotte}/${r.completedGames}`
                        : "—"}
                    </Text>
                  </Table.Td>
                  <Table.Td ta="center">
                    <Text c="dimmed">
                      {r.isComplete
                        ? `${r.totalGames}`
                        : `${r.completedGames}/${r.totalGames}`}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      )}
    </Stack>
  );
}
