---
phase: 03-results-leaderboard
plan: 02
subsystem: api
tags: [react, leaderboard, express, season-totals, tips-aggregation]

requires:
  - phase: 03-results-leaderboard plan 01
    provides: calcScore pattern, results page complete
  - phase: 01-foundation plan 02
    provides: /api/tips backend

provides:
  - GET /api/tips?year=Y endpoint (year-level tips query)
  - Leaderboard page at /leaderboard with season totals + round breakdown
  - "Leaderboard" nav link

affects: []

tech-stack:
  added: []
  patterns:
    - Promise.all for parallel allGames + yearTips fetch
    - Group completed games by round (reduce into Record<number, Game[]>)
    - calcRoundScore() returns null if player has no tips (omits from totals)

key-files:
  created:
    - src/pages/Leaderboard.tsx
  modified:
    - server/routes/tips.ts (added year-only query branch)
    - src/components/Nav.tsx (added Leaderboard link)
    - src/App.tsx (added /leaderboard route)

key-decisions:
  - "calcRoundScore returns null (not 0) for untipped rounds — omitted from table"
  - "Season totals sum only tipped rounds (null treated as 0 in reduce)"
  - "Round breakdown only shows rounds where at least one player has tips"

patterns-established: []

duration: ~15min
started: 2026-03-14T01:15:00Z
completed: 2026-03-14T01:30:00Z
---

# Phase 3 Plan 02: Season Leaderboard Summary

**Season leaderboard with cumulative correct tips and round-by-round breakdown; backend updated to support year-level tips queries.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~15 min |
| Started | 2026-03-14 |
| Completed | 2026-03-14 |
| Tasks | 3 completed |
| Files created/modified | 4 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Backend returns year-level tips | Pass | GET /api/tips?year=Y returns tips[year] correctly |
| AC-2: Season totals shown | Pass | Big number card with leader highlighted green |
| AC-3: Round-by-round breakdown | Pass | Table with correct/total per player per round |
| AC-4: Rounds with no tips omitted | Pass | calcRoundScore returns null → filtered out |
| AC-5: Leaderboard accessible from nav | Pass | NavLink added after Results |

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `server/routes/tips.ts` | Modified | Added `else if (year)` branch for year-level query |
| `src/pages/Leaderboard.tsx` | Created | Season totals card + round breakdown table |
| `src/components/Nav.tsx` | Modified | Added Leaderboard NavLink |
| `src/App.tsx` | Modified | Added /leaderboard route |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| `calcRoundScore` returns `null` for untipped rounds | Distinguishes "0 correct" from "not tipped" | Rows with null omitted from leaderboard |
| Season totals treat null as 0 in reduce | Player still has a total even if some rounds untipped | Fair aggregation |

## Deviations from Plan

None — executed exactly as planned.

---
*Phase: 03-results-leaderboard, Plan: 02*
*Completed: 2026-03-14*
