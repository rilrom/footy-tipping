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
  total: number;
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

  const { data: allGames = [], isPending: gamesLoading } = useGames(year);

  const { data: yearTips = {} } = useAllTips(year);

  const completedGames = allGames.filter((g) => g.complete === 100);

  const byRound = completedGames.reduce<Record<number, Game[]>>((acc, g) => {
    if (!acc[g.round]) {
      acc[g.round] = [];
    }

    acc[g.round].push(g);

    return acc;
  }, {});

  const roundResults: RoundResult[] = Object.entries(yearTips as YearTips)
    .map(([roundStr, players]) => {
      const roundNum = parseInt(roundStr, 10);

      const gamesInRound = byRound[roundNum] ?? [];

      return {
        round: roundNum,
        riley: calcRoundScore(gamesInRound, players.riley),
        charlotte: calcRoundScore(gamesInRound, players.charlotte),
        total: gamesInRound.length,
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

  const leaderColor = (mine: number, theirs: number): string =>
    mine > theirs ? "#16a34a" : "#1a1a1a";

  const cellHighlight = (
    mine: number | null,
    theirs: number | null,
  ): React.CSSProperties => {
    if (mine === null || theirs === null || mine === theirs) {
      return {};
    }

    return mine > theirs ? { color: "#16a34a", fontWeight: "700" } : {};
  };

  return (
    <div>
      <h1 style={{ marginBottom: "1.25rem", color: "#1a1a1a" }}>
        Leaderboard — {year}
      </h1>

      {gamesLoading ? (
        <p style={{ color: "#999" }}>Loading...</p>
      ) : roundsPlayed === 0 ? (
        <p style={{ color: "#999" }}>No completed rounds with tips yet.</p>
      ) : (
        <>
          {/* Season totals card */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#fff",
              border: "1px solid #e5e5e5",
              borderRadius: "10px",
              padding: "1.5rem 1.25rem",
              marginBottom: "1.75rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "1rem",
                  marginBottom: "0.25rem",
                }}
              >
                Riley
              </div>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: leaderColor(rileyTotal, charlotteTotal),
                  lineHeight: 1,
                }}
              >
                {rileyTotal}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#666",
                  marginTop: "0.25rem",
                }}
              >
                correct tips
              </div>
            </div>

            <div style={{ textAlign: "center", color: "#bbb" }}>
              <div style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                after
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#999",
                }}
              >
                {roundsPlayed}
              </div>
              <div style={{ fontSize: "0.75rem" }}>rounds</div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "1rem",
                  marginBottom: "0.25rem",
                }}
              >
                Charlotte
              </div>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: leaderColor(charlotteTotal, rileyTotal),
                  lineHeight: 1,
                }}
              >
                {charlotteTotal}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#666",
                  marginTop: "0.25rem",
                }}
              >
                correct tips
              </div>
            </div>
          </div>

          {/* Round breakdown table */}
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#1a1a1a",
            }}
          >
            Round by Round
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th
                  style={{
                    padding: "0.6rem 1rem",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#555",
                  }}
                >
                  Round
                </th>
                <th
                  style={{
                    padding: "0.6rem 1rem",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#555",
                  }}
                >
                  Riley
                </th>
                <th
                  style={{
                    padding: "0.6rem 1rem",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#555",
                  }}
                >
                  Charlotte
                </th>
                <th
                  style={{
                    padding: "0.6rem 1rem",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#555",
                  }}
                >
                  Games
                </th>
              </tr>
            </thead>
            <tbody>
              {roundResults.map((r, i) => (
                <tr
                  key={r.round}
                  style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}
                >
                  <td style={{ padding: "0.6rem 1rem", color: "#555" }}>
                    Round {r.round}
                  </td>
                  <td
                    style={{
                      padding: "0.6rem 1rem",
                      textAlign: "center",
                      ...cellHighlight(r.riley, r.charlotte),
                    }}
                  >
                    {r.riley !== null ? `${r.riley}/${r.total}` : "—"}
                  </td>
                  <td
                    style={{
                      padding: "0.6rem 1rem",
                      textAlign: "center",
                      ...cellHighlight(r.charlotte, r.riley),
                    }}
                  >
                    {r.charlotte !== null ? `${r.charlotte}/${r.total}` : "—"}
                  </td>
                  <td
                    style={{
                      padding: "0.6rem 1rem",
                      textAlign: "center",
                      color: "#999",
                    }}
                  >
                    {r.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
