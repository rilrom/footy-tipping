import type { Game } from "../types/squiggle";

interface GameCardProps {
  game: Game;
  tip: string | null;
  onTip: (teamName: string) => void;
  disabled?: boolean;
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
  const { game, tip, onTip, disabled = false } = props;

  const teamButtonBase: React.CSSProperties = {
    width: "44%",
    padding: "0.6rem 0.5rem",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: disabled ? "default" : "pointer",
    transition: "border-color 0.15s",
    border: "2px solid #ccc",
    backgroundColor: "#fff",
    color: "#1a1a1a",
    opacity: disabled ? 0.7 : 1,
  };

  const selectedStyle: React.CSSProperties = {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderColor: "#1a1a1a",
  };

  const buildTeamStyle = (teamName: string): React.CSSProperties => ({
    ...teamButtonBase,
    ...(tip === teamName ? selectedStyle : {}),
  });

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.75rem",
      }}
    >
      <div
        style={{ fontSize: "0.78rem", color: "#999", marginBottom: "0.6rem" }}
      >
        {game.date ? formatDate(game.date) : "TBC"}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          style={buildTeamStyle(game.hteam)}
          onClick={() => {
            if (!disabled) {
              onTip(game.hteam);
            }
          }}
          disabled={disabled}
        >
          {game.hteam}
        </button>

        <span
          style={{ color: "#999", fontSize: "0.85rem", padding: "0 0.5rem" }}
        >
          vs
        </span>

        <button
          type="button"
          style={buildTeamStyle(game.ateam)}
          onClick={() => {
            if (!disabled) {
              onTip(game.ateam);
            }
          }}
          disabled={disabled}
        >
          {game.ateam}
        </button>
      </div>

      {disabled && game.winner && (
        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.8rem",
            color: "#666",
            textAlign: "center",
          }}
        >
          {game.winner} won · {game.hteam} {game.hscore ?? "—"} – {game.ateam}{" "}
          {game.ascore ?? "—"}
        </div>
      )}
    </div>
  );
}
