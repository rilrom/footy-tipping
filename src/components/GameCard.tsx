import { Button, Card, Group, Text } from "@mantine/core";
import type { Game } from "../types/squiggle";

interface GameCardProps {
  game: Game;
  tip: string | null;
  onTip: (teamName: string) => void;
  disabled?: boolean;
  locked?: boolean;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  return date.toLocaleString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function GameCard(props: GameCardProps) {
  const { game, tip, onTip, disabled = false, locked = false } = props;

  return (
    <Card shadow="xs" withBorder padding="md">
      <Text size="xs" c="dimmed" mb="xs">
        {game.date ? formatDate(game.date) : "TBC"}
        {game.venue ? ` · ${game.venue}` : ""}
      </Text>

      <Group justify="space-between">
        <Button
          variant={tip === game.hteam ? "filled" : "default"}
          onClick={() => {
            if (!disabled && !locked) {
              onTip(game.hteam);
            }
          }}
          disabled={disabled}
          style={{ width: "44%", cursor: locked ? "not-allowed" : undefined }}
        >
          {game.hteam}
          <Text span size="xs" c="dimmed" ml={4}>
            (H)
          </Text>
        </Button>

        <Text c="dimmed" size="sm">
          vs
        </Text>

        <Button
          variant={tip === game.ateam ? "filled" : "default"}
          onClick={() => {
            if (!disabled && !locked) {
              onTip(game.ateam);
            }
          }}
          disabled={disabled}
          style={{ width: "44%", cursor: locked ? "not-allowed" : undefined }}
        >
          {game.ateam}
          <Text span size="xs" c="dimmed" ml={4}>
            (A)
          </Text>
        </Button>
      </Group>

      {disabled && game.winner && (
        <Text size="sm" c="dimmed" ta="center" mt="xs">
          {game.winner} won · {game.hteam} {game.hscore ?? "—"} – {game.ateam}{" "}
          {game.ascore ?? "—"}
        </Text>
      )}
    </Card>
  );
}
