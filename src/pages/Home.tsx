import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentRound } from "../hooks/squiggle";

export default function Home() {
  const [year] = useState(new Date().getFullYear());

  const { data: currentRound, isPending } = useCurrentRound(year);

  return (
    <Stack gap="lg">
      <Title order={1}>Welcome, Riley & Charlotte! 👋</Title>

      <Text size="lg" c="dimmed">
        {isPending
          ? "Loading current round..."
          : `Round ${currentRound} is underway`}
      </Text>

      <Group gap="sm">
        <Button component={Link} to="/tips" variant="filled">
          Enter Tips
        </Button>
        <Button component={Link} to="/results" variant="default">
          View Results
        </Button>
      </Group>
    </Stack>
  );
}
