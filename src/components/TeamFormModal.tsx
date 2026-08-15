import {
  Badge,
  Modal,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import {
  formatMatchDate,
  formatRank,
  getMatchResult,
  getResultColor,
  getTeamGames,
} from "../lib/teamForm";
import type { Game, Standing } from "../types/squiggle";

export interface TeamFormTeam {
  id: number;
  name: string;
}

interface TeamFormModalProps {
  team: TeamFormTeam | null;
  games: Game[];
  standing?: Standing;
  onClose: () => void;
}

export default function TeamFormModal(props: TeamFormModalProps) {
  const { team, games, standing, onClose } = props;

  const recentGames = team ? getTeamGames(games, team.id).slice(0, 5) : [];

  return (
    <Modal
      opened={team !== null}
      onClose={onClose}
      centered
      title={team ? `${team.name} form` : "Team form"}
    >
      {team && (
        <Stack gap="md">
          {standing && (
            <SimpleGrid cols={3} spacing="sm">
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Ladder
                </Text>
                <Text fw={600}>{formatRank(standing.rank)}</Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Season record
                </Text>
                <Text fw={600}>
                  {standing.wins}W · {standing.draws}D · {standing.losses}L
                </Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Points diff
                </Text>
                <Text fw={600}>{standing.for - standing.against}</Text>
              </Stack>
            </SimpleGrid>
          )}

          <Text fw={600} size="sm">
            Last five matches
          </Text>

          <Table
            striped
            withTableBorder
            withColumnBorders={false}
            verticalSpacing="xs"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Opponent</Table.Th>
                <Table.Th>Result</Table.Th>
                <Table.Th>Score</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recentGames.map((game) => {
                const teamIsHome = game.hteamid === team.id;
                const result = getMatchResult(game, team.id);
                const teamScore = teamIsHome ? game.hscore : game.ascore;
                const opponentScore = teamIsHome ? game.ascore : game.hscore;

                return (
                  <Table.Tr key={game.id}>
                    <Table.Td>{formatMatchDate(game.date)}</Table.Td>
                    <Table.Td>{teamIsHome ? game.ateam : game.hteam}</Table.Td>
                    <Table.Td>
                      <Badge color={getResultColor(result)} size="sm">
                        {result}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {teamScore ?? "—"}–{opponentScore ?? "—"}
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Stack>
      )}
    </Modal>
  );
}
