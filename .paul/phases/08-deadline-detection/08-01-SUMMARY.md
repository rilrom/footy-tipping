---
phase: 08-deadline-detection
plan: 01
subsystem: ui
tags: [react, typescript, deadline, locking]

requires: []
provides:
  - isRoundLocked(games) utility — pure function returning bool based on earliest game kickoff
  - useRoundLocked(games) hook — reactive, re-evaluates every 60s, auto-locks when round starts
affects:
  - 09-ui-locking (consumes both exports directly)

tech-stack:
  added: []
  patterns:
    - Deadline computed client-side from game dates (no backend needed)
    - Hook wraps utility with setInterval for reactive lock detection

key-files:
  created:
    - src/lib/deadline.ts
  modified:
    - src/hooks/squiggle.ts

key-decisions:
  - "Client-side time comparison: no backend lock-status endpoint needed for localhost app"
  - "Empty games array returns false: safe default, don't block tipping if no data loaded"
  - "Filter out games with no date before finding earliest: avoids NaN from falsy dates"

patterns-established:
  - "isRoundLocked skips games with falsy date fields before comparing timestamps"
  - "useRoundLocked re-evaluates on both games change and 60s interval, clears interval on unmount"

duration: 5min
started: 2026-03-14T00:00:00Z
completed: 2026-03-14T00:05:00Z
---

# Phase 8 Plan 01: Deadline Detection Summary

**`isRoundLocked` utility and `useRoundLocked` hook — determines round lock state from earliest game kickoff time, with 60s auto-refresh.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~5 min |
| Started | 2026-03-14 |
| Completed | 2026-03-14 |
| Tasks | 2 completed |
| Files modified | 2 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Round locked when first game has started | Pass | earliest <= Date.now() returns true |
| AC-2: Round open when first game is in the future | Pass | earliest > Date.now() returns false |
| AC-3: Empty games treated as unlocked | Pass | Empty/no-date array returns false |
| AC-4: Hook re-evaluates automatically | Pass | setInterval(60s) + games dep in useEffect |

## Accomplishments

- Created `src/lib/deadline.ts` with pure `isRoundLocked(games)` — filters dateless games, finds earliest kickoff, compares to now
- Added `useRoundLocked(games)` hook to `src/hooks/squiggle.ts` — reactive state with 60s timer and cleanup
- TypeScript build passes clean with no errors or warnings

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `src/lib/deadline.ts` | Created | Pure isRoundLocked utility |
| `src/hooks/squiggle.ts` | Modified | Added useRoundLocked hook |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Client-side time comparison only | Localhost app, no auth, no need for server authority | No backend changes needed for detection |
| false when no dated games | Safe default — don't lock tipping if games haven't loaded yet | Phase 9 should handle this gracefully |

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

**Ready:**
- `isRoundLocked` and `useRoundLocked` exported and typed, ready for Phase 9 to import
- Build passes clean

**Concerns:**
- None

**Blockers:**
- None

---
*Phase: 08-deadline-detection, Plan: 01*
*Completed: 2026-03-14*
