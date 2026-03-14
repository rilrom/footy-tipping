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

export default function Results() {
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

  const roundTips: RoundTips = {
    riley: tipsData?.riley ?? {},
    charlotte: tipsData?.charlotte ?? {},
  };

  const sortedGames = [...games].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const navBtn = (disabled: boolean): React.CSSProperties => ({
    padding: "0.4rem 0.8rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: disabled ? "default" : "pointer",
    fontSize: "1rem",
    color: disabled ? "#ccc" : "#1a1a1a",
  });

  const rileyScore = calcScore(sortedGames, roundTips.riley);

  const charlotteScore = calcScore(sortedGames, roundTips.charlotte);

  const hasCompleted = sortedGames.some((g) => g.complete === 100);

  const scoreColor = (mine: number, theirs: number): string => {
    if (mine > theirs) {
      return "#16a34a";
    }

    return "#1a1a1a";
  };

  function renderTip(
    tip: string | null,
    status: TipStatus,
    align: "left" | "right",
  ) {
    if (status === "pending") {
      return (
        <span
          style={{ color: "#bbb", fontSize: "0.85rem", fontStyle: "italic" }}
        >
          {tip ?? "—"}
        </span>
      );
    }

    if (status === "none") {
      return <span style={{ color: "#bbb" }}>—</span>;
    }

    const color = status === "correct" ? "#16a34a" : "#dc2626";

    const badge = status === "correct" ? " ✓" : " ✗";

    return (
      <span style={{ fontWeight: "600", color }}>
        {align === "right" ? (
          <>
            {tip}
            {badge}
          </>
        ) : (
          <>
            {badge}
            {tip}
          </>
        )}
      </span>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: "1.25rem", color: "#1a1a1a" }}>
        Results{round !== null ? ` — Round ${round}` : " — Loading..."}
      </h1>

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

      {/* Score summary */}
      {!gamesLoading && hasCompleted && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            padding: "0.75rem 1.25rem",
            marginBottom: "1.25rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#666",
                marginBottom: "0.2rem",
              }}
            >
              Riley
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: scoreColor(rileyScore.correct, charlotteScore.correct),
              }}
            >
              {rileyScore.correct}
              <span
                style={{ fontSize: "0.9rem", fontWeight: "400", color: "#666" }}
              >
                /{rileyScore.total}
              </span>
            </div>
          </div>

          <div
            style={{ color: "#999", fontSize: "0.85rem", fontWeight: "500" }}
          >
            Round {round} Scores
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#666",
                marginBottom: "0.2rem",
              }}
            >
              Charlotte
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: scoreColor(charlotteScore.correct, rileyScore.correct),
              }}
            >
              {charlotteScore.correct}
              <span
                style={{ fontSize: "0.9rem", fontWeight: "400", color: "#666" }}
              >
                /{charlotteScore.total}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Column headers */}
      {!gamesLoading && sortedGames.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "1rem",
            marginBottom: "0.5rem",
            padding: "0 1rem",
          }}
        >
          <span
            style={{
              fontWeight: "600",
              fontSize: "0.85rem",
              color: "#666",
              textAlign: "right",
            }}
          >
            Riley
          </span>
          <span />
          <span
            style={{
              fontWeight: "600",
              fontSize: "0.85rem",
              color: "#666",
              textAlign: "left",
            }}
          >
            Charlotte
          </span>
        </div>
      )}

      {/* Games */}
      {gamesLoading ? (
        <p style={{ color: "#999" }}>Loading results...</p>
      ) : sortedGames.length === 0 ? (
        <p style={{ color: "#999" }}>No games found for this round.</p>
      ) : (
        sortedGames.map((game) => {
          const id = game.id.toString();

          const rileyTip = roundTips.riley[id] ?? null;

          const charlotteTip = roundTips.charlotte[id] ?? null;

          const rileyStatus = getTipStatus(game, rileyTip);

          const charlotteStatus = getTipStatus(game, charlotteTip);
          
          const isComplete = game.complete === 100;

          return (
            <div
              key={game.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "1rem",
                alignItems: "center",
                backgroundColor: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                padding: "0.85rem 1rem",
                marginBottom: "0.5rem",
              }}
            >
              {/* Riley */}
              <div style={{ textAlign: "right" }}>
                {renderTip(rileyTip, rileyStatus, "right")}
              </div>

              {/* Centre: game + result */}
              <div style={{ textAlign: "center", minWidth: "170px" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#999",
                    marginBottom: "0.25rem",
                  }}
                >
                  {game.hteam} vs {game.ateam}
                </div>
                {isComplete ? (
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    {game.winner} won · {game.hscore}–{game.ascore}
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#bbb",
                      fontStyle: "italic",
                    }}
                  >
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
                  </div>
                )}
              </div>

              {/* Charlotte */}
              <div style={{ textAlign: "left" }}>
                {renderTip(charlotteTip, charlotteStatus, "left")}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
