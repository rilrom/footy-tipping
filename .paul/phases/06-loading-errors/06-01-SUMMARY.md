---
phase: 06-loading-errors
plan: 01
subsystem: ui
tags: [mantine, skeleton, alert, loading, error-handling, react-query]

requires:
  - phase: 04-mantine-ui
    provides: MantineProvider, Mantine components

provides:
  - Skeleton loading states across Tips, Results, Leaderboard
  - Error Alert on Squiggle API failure across all three pages

affects: []

tech-stack:
  added: []
  patterns:
    - "Skeleton mirrors actual content structure — static labels shown, only dynamic values skeletonised"
    - "gamesError check before gamesLoading in conditionals to show error over loading state"

key-files:
  created: []
  modified: [src/pages/Tips.tsx, src/pages/Results.tsx, src/pages/Leaderboard.tsx]

key-decisions:
  - "Static text (Riley, Charlotte, correct tips, column headers) shown during loading — only data values skeletonised"
  - "Score card skeleton shown on Results even before we know if hasCompleted — matches shape of loaded card"

patterns-established:
  - "Always render static labels during loading; skeleton only the dynamic values"
  - "Error alert rendered before loading check — error takes priority over loading state"

duration: ~20min
started: 2026-03-14T00:00:00Z
completed: 2026-03-14T00:00:00Z
---

# Phase 6 Plan 01: Loading & Errors Summary

**Skeleton loading states and error alerts added across Tips, Results, and Leaderboard — static labels shown immediately, only data values skeletonised.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~20 min (including iterative refinement at checkpoint) |
| Tasks | 2 auto + iterative checkpoint refinement |
| Files modified | 3 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Skeleton Loading States | Pass | Structured skeletons on all three pages |
| AC-2: Error Alert on API Failure | Pass | `isError` handled, red Alert shown |
| AC-3: Normal Flow Unchanged | Pass | Build clean, no regressions |

## Accomplishments

- Tips: 5 skeleton cards (72px) while loading; red Alert on error
- Results: Score summary card skeleton (names static, scores skeletonised) + 5 structured row skeletons matching 3-col Paper layout + red Alert
- Leaderboard: Full structure skeleton — totals card with static labels, "Round by Round" heading, table with real headers and 5 skeleton rows; red Alert on error

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `src/pages/Tips.tsx` | Modified | Skeleton ×5 for game list, Alert on error |
| `src/pages/Results.tsx` | Modified | Score card skeleton, row skeletons matching Grid layout, Alert on error |
| `src/pages/Leaderboard.tsx` | Modified | Structured skeleton with static labels, table skeleton, Alert on error |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Static labels shown during loading | Names/headings are always known — no need to skeleton them | Better perceived performance, less visual shift on load |
| Score card shown during Results loading | Matches shape of loaded content; user sees layout immediately | Consistent structure between loading and loaded states |

## Deviations from Plan

### Summary

| Type | Count | Impact |
|------|-------|--------|
| Iterative refinement | 3 | Checkpoint feedback: better row structure, height accuracy, static labels |
| Scope additions | 0 | — |

**Total impact:** All refinements improved quality, no scope creep.

## Next Phase Readiness

**Ready:** Phase 7 (Leaderboard Enhancements) can proceed.

**Concerns:** None

**Blockers:** None

---
*Phase: 06-loading-errors, Plan: 01*
*Completed: 2026-03-14*
