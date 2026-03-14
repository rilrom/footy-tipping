import { Group, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";

function navLinkStyle({
  isActive,
}: {
  isActive: boolean;
}): React.CSSProperties {
  return {
    textDecoration: "none",
    fontWeight: isActive ? 600 : 400,
    color: isActive
      ? "var(--mantine-color-text)"
      : "var(--mantine-color-dimmed)",
    borderBottom: isActive
      ? "2px solid var(--mantine-color-text)"
      : "2px solid transparent",
    paddingBottom: "2px",
    fontSize: "var(--mantine-font-size-sm)",
  };
}

export default function Nav() {
  return (
    <Group h="100%" px="md" gap="lg">
      <Text fw={700} size="lg">
        Footy Tipping 🏉
      </Text>

      <Group gap="sm">
        <NavLink to="/" end style={navLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/tips" style={navLinkStyle}>
          Tips
        </NavLink>
        <NavLink to="/results" style={navLinkStyle}>
          Results
        </NavLink>
        <NavLink to="/leaderboard" style={navLinkStyle}>
          Leaderboard
        </NavLink>
      </Group>
    </Group>
  );
}
