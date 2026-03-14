---
phase: 03-results-leaderboard
plan: 01
subsystem: ui
tags: [react, results, scoring, squiggle-api, tips-comparison]

requires:
  - phase: 02-tipping plan 01
    provides: tips data shape (game.id.toString() → teamName), /api/tips GET endpoint
  - phase: 02-tipping plan 02
    provides: GET /api/tips returns { riley, charlotte } per round

provides:
  - Results page at /results with round results and tip correctness display
  - calcScore() helper (correct/total per player)
  - getTipStatus() helper (correct/incorrect/none/pending)
  - Round score summary bar (Riley X/Y | Charlotte X/Y)

affects: [03-02-leaderboard]

tech-stack:
  added: []
  patterns:
    - Promise.all for parallel games + tips fetch (same as Summary.tsx)
    - renderTip() function for context-aware tip display (correct/incorrect/pending/none)
    - Score colour: green for leader, default for tied/trailing

key-files:
  created:
    - src/pages/Results.tsx
  modified:
    - src/App.tsx (wired Results into /results route)

key-decisions:
  - "getTipStatus() separates pending/none/correct/incorrect — clean branching"
  - "Score summary only shows when hasCompleted — avoids 0/0 display for future rounds"
  - "renderTip() flips badge order by alignment (right: 'tip ✓', left: '✓ tip')"

patterns-established:
  - "calcScore(games, playerTips) reusable for leaderboard aggregation in 03-02"

duration: ~15min
started: 2026-03-14T01:00:00Z
completed: 2026-03-14T01:15:00Z
---

# Phase 3 Plan 01: Results Page Summary

**Round results page with correct/incorrect tip highlighting (green ✓ / red ✗), pending labels for incomplete games, and a live score summary bar.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~15 min |
| Started | 2026-03-14 |
| Completed | 2026-03-14 |
| Tasks | 2 completed |
| Files created/modified | 2 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Completed games show result and tips | Pass | Winner + score in centre, both players' tips shown |
| AC-2: Correct tips highlighted green | Pass | Green bold with ✓ badge |
| AC-3: Incorrect tips shown red | Pass | Red with ✗ badge |
| AC-4: Untipped games show "—" | Pass | Null tips render muted "—" |
| AC-5: Round score summary shown | Pass | Score bar shows Riley X/Y and Charlotte X/Y |
| AC-6: Incomplete games show Pending | Pass | Italic "Pending" label, no ✓/✗ |
| AC-7: Round navigator works | Pass | ‹ › reload games + tips |

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `src/pages/Results.tsx` | Created | Round results with scoring |
| `src/App.tsx` | Modified | Wired Results into /results route |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| `getTipStatus()` helper | Clean separation of display states | Reusable pattern if results view evolves |
| Score summary conditional on `hasCompleted` | Avoids confusing 0/0 for future rounds | Score bar only visible when results exist |

## Deviations from Plan

None — executed exactly as planned.

## Next Phase Readiness

**Ready:**
- `calcScore()` helper pattern ready to reuse in 03-02 leaderboard aggregation
- `/api/tips?year=Y&round=R` pattern established; 03-02 adds `?year=Y` (no round)

**Blockers:** None

---
*Phase: 03-results-leaderboard, Plan: 01*
*Completed: 2026-03-14*
