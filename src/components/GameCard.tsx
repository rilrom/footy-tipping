import { Button, Card, Group, Text } from "@mantine/core";
import type { Game, Standing } from "../types/squiggle";

interface GameCardProps {
  game: Game;
  tip: string | null;
  onTip: (teamName: string) => void;
  disabled?: boolean;
  locked?: boolean;
  standings?: Record<number, Standing>;
}

// Squiggle returns datetimes in Australia/Sydney time without a timezone offset.
// Parse by treating the string as UTC, computing the Sydney offset at that
// instant, then applying it to get the true UTC timestamp.
function parseSydneyDate(dateStr: string): Date {
  const asUtc = new Date(`${dateStr.replace(" ", "T")}Z`);

  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(asUtc);

  const get = (type: string) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? "0", 10);

  const sydneyAsUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );

  return new Date(asUtc.getTime() + (asUtc.getTime() - sydneyAsUtc));
}

function formatDate(dateStr: string): string {
  const date = parseSydneyDate(dateStr);

  return date.toLocaleString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatRank(rank: number): string {
  const lastTwoDigits = rank % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${rank}th`;
  }

  const lastDigit = rank % 10;

  if (lastDigit === 1) {
    return `${rank}st`;
  }

  if (lastDigit === 2) {
    return `${rank}nd`;
  }

  if (lastDigit === 3) {
    return `${rank}rd`;
  }

  return `${rank}th`;
}

export default function GameCard(props: GameCardProps) {
  const {
    game,
    tip,
    onTip,
    disabled = false,
    locked = false,
    standings,
  } = props;

  const hstanding = standings?.[game.hteamid];
  const astanding = standings?.[game.ateamid];

  function handleTeamClick(teamName: string) {
    if (disabled || locked) {
      return;
    }

    onTip(teamName);
  }

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
            handleTeamClick(game.hteam);
          }}
          disabled={disabled}
          style={{ width: "44%", cursor: locked ? "not-allowed" : undefined }}
        >
          {game.hteam}
          <Text
            span
            size="xs"
            c={tip === game.hteam ? undefined : "dimmed"}
            ml={4}
          >
            (H)
          </Text>
          {hstanding && (
            <Text
              span
              size="xs"
              c={tip === game.hteam ? undefined : "dimmed"}
              ml={4}
            >
              {formatRank(hstanding.rank)}
            </Text>
          )}
        </Button>

        <Text c="dimmed" size="sm">
          vs
        </Text>

        <Button
          variant={tip === game.ateam ? "filled" : "default"}
          onClick={() => {
            handleTeamClick(game.ateam);
          }}
          disabled={disabled}
          style={{ width: "44%", cursor: locked ? "not-allowed" : undefined }}
        >
          {game.ateam}
          <Text
            span
            size="xs"
            c={tip === game.ateam ? undefined : "dimmed"}
            ml={4}
          >
            (A)
          </Text>
          {astanding && (
            <Text
              span
              size="xs"
              c={tip === game.ateam ? undefined : "dimmed"}
              ml={4}
            >
              {formatRank(astanding.rank)}
            </Text>
          )}
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
