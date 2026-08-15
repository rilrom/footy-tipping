import { Button, Group, Paper, Stack, Switch, Text, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePreferences } from "../hooks/preferences";
import { useCurrentRound } from "../hooks/squiggle";

export default function Home() {
  const [year] = useState(new Date().getFullYear());

  const { preferences, setAllowLateTipping, setHideResults } = usePreferences();

  const { data: currentRound, isPending } = useCurrentRound(year);

  return (
    <Stack gap="lg">
      <Title order={1}>Welcome, Riley & Charlotte! 👋</Title>

      <Text size="lg" c="dimmed">
        {isPending
          ? "Loading current round..."
          : `Round ${currentRound} is underway`}
      </Text>

      <Paper withBorder p="md" radius="md">
        <Stack gap="sm">
          <div>
            <Text fw={600}>Quick toggles</Text>
            <Text size="sm" c="dimmed">
              Saved in this browser and applied across the app.
            </Text>
          </div>

          <Switch
            checked={preferences.allowLateTipping}
            onChange={(event) => {
              setAllowLateTipping(event.currentTarget.checked);
            }}
            label="Allow late tipping"
            description="Keep the tipping page editable even after the round has started."
          />

          <Switch
            checked={preferences.hideResults}
            onChange={(event) => {
              setHideResults(event.currentTarget.checked);
            }}
            label="Hide results"
            description="Mask winners, scores, and tip correctness across the app."
          />
        </Stack>
      </Paper>

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
