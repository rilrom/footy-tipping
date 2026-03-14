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

  const { data: games = [], isPending: gamesLoading } = useGames(
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

  const playerBtn = (p: Player): React.CSSProperties => ({
    padding: "0.5rem 1.5rem",
    borderRadius: "6px",
    border: "2px solid #ccc",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "0.95rem",
    backgroundColor: player === p ? "#1a1a1a" : "#fff",
    color: player === p ? "#fff" : "#1a1a1a",
    borderColor: player === p ? "#1a1a1a" : "#ccc",
    marginRight: "0.5rem",
  });

  const navBtn = (disabled: boolean): React.CSSProperties => ({
    padding: "0.4rem 0.8rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: disabled ? "default" : "pointer",
    fontSize: "1rem",
    color: disabled ? "#ccc" : "#1a1a1a",
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.25rem",
          gap: "1rem",
        }}
      >
        <h1 style={{ margin: 0, color: "#1a1a1a" }}>
          Tips{round !== null ? ` — Round ${round}` : " — Loading..."}
        </h1>
        {saveTips.isPending && (
          <span style={{ fontSize: "0.8rem", color: "#999" }}>Saving...</span>
        )}
      </div>

      {/* Player selector */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          type="button"
          style={playerBtn("riley")}
          onClick={() => setPlayer("riley")}
        >
          Riley
        </button>
        <button
          type="button"
          style={playerBtn("charlotte")}
          onClick={() => setPlayer("charlotte")}
        >
          Charlotte
        </button>
      </div>

      {/* Round navigator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.25rem",
          gap: "0.75rem",
        }}
      >
        <button
          type="button"
          style={navBtn(round === null || round <= 1)}
          onClick={() => {
            if (round !== null && round > 1) {
              setRoundOffset((o) => o - 1);
            }
          }}
          disabled={round === null || round <= 1}
        >
          ‹
        </button>
        <span
          style={{ fontWeight: "600", minWidth: "80px", textAlign: "center" }}
        >
          {round !== null ? `Round ${round}` : "—"}
        </span>
        <button
          type="button"
          style={navBtn(round === null)}
          onClick={() => {
            if (round !== null) {
              setRoundOffset((o) => o + 1);
            }
          }}
          disabled={round === null}
        >
          ›
        </button>
      </div>

      {/* Games */}
      {gamesLoading ? (
        <p style={{ color: "#999" }}>Loading fixtures...</p>
      ) : sortedGames.length === 0 ? (
        <p style={{ color: "#999" }}>No games found for this round.</p>
      ) : (
        sortedGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            tip={tips[game.id.toString()] ?? null}
            onTip={(teamName) => handleTip(game, teamName)}
            disabled={game.complete === 100}
          />
        ))
      )}
    </div>
  );
}
