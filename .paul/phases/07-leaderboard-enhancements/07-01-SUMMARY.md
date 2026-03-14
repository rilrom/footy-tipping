---
phase: 07-leaderboard-enhancements
plan: 01
subsystem: ui
tags: [leaderboard, data, display, react]

requires:
  - phase: 03-results-leaderboard
    provides: Leaderboard page and RoundResult data model
  - phase: 06-loading-errors
    provides: Skeleton loading states in Leaderboard

provides:
  - In-progress round display: score as X/completedGames, games as completedGames/totalGames
  - Completed round display: score as X, games as totalGames
  - Singular/plural "round"/"rounds" label

affects: []

tech-stack:
  added: []
  patterns:
    - "allByRound map alongside byRound for total vs completed game counts per round"

key-files:
  created: []
  modified: [src/pages/Leaderboard.tsx]

key-decisions:
  - "isComplete = completedGames === totalGames && totalGames > 0 — guards against empty rounds"
  - "Score cells simplified to just the score when complete — denominator implied"

patterns-established: []

duration: ~10min
started: 2026-03-14T00:00:00Z
completed: 2026-03-14T00:00:00Z
---

# Phase 7 Plan 01: Leaderboard Enhancements Summary

**Leaderboard table now shows `4/6` scores and `6/9` games for in-progress rounds, and clean `4` scores and `9` games for completed rounds. "Round"/"rounds" label is now correctly pluralised.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~10 min |
| Tasks | 1 auto + minor checkpoint refinement |
| Files modified | 1 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: In-Progress Round Shows X/Y | Pass | Score: `4/6`, Games: `6/9` |
| AC-2: Completed Round Shows Clean Totals | Pass | Score: `4`, Games: `9` |
| AC-3: No Regression on Untipped Rounds | Pass | "—" still shown for untipped players |

## Accomplishments

- Added `allByRound` map to track total games per round (not just completed)
- `RoundResult` updated with `completedGames`, `totalGames`, `isComplete`
- Score cells: clean number when round complete, fraction when in-progress
- Games column: `X/Y` when in-progress, `Y` when complete
- "round"/"rounds" correctly pluralised based on `roundsPlayed`

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `src/pages/Leaderboard.tsx` | Modified | New data fields, updated display format, pluralisation fix |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| `isComplete = completedGames === totalGames && totalGames > 0` | Guards against rounds with no games loaded | Safe for edge cases |
| Score cells show plain number when complete | Denominator is redundant when all games played | Cleaner completed rows |

## Deviations from Plan

One addition: "round"/"rounds" pluralisation fix discovered and applied during checkpoint.

## Next Phase Readiness

**Ready:** Phase 7 is the final phase of v0.3 — milestone complete.

**Concerns:** None

**Blockers:** None

---
*Phase: 07-leaderboard-enhancements, Plan: 01*
*Completed: 2026-03-14*
