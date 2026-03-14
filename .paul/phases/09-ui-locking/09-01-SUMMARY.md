---
phase: 09-ui-locking
plan: 01
subsystem: ui
tags: [react, typescript, locking, mantine, gamecard]

requires:
  - phase: 08-deadline-detection
    provides: useRoundLocked hook and isRoundLocked utility
provides:
  - Tips page locks when round starts — alert shown, buttons non-interactive but visually clear
  - GameCard locked prop — preserves tip selection visibility while blocking interaction
affects: []

tech-stack:
  added: []
  patterns:
    - Separate locked vs disabled states on GameCard — locked preserves visual variant, disabled grays out
    - cursor not-allowed via inline style on buttons (Mantine disabled prop overrides cursor)

key-files:
  created: []
  modified:
    - src/pages/Tips.tsx
    - src/components/GameCard.tsx

key-decisions:
  - "locked prop separate from disabled: preserves filled/default button variant so selected tip is visible"
  - "cursor not-allowed via inline style: pointerEvents none suppresses cursor, so inline style needed"
  - "Context-aware lock message: complete round shows 'This round is complete', in-progress shows 'This round has started'"

patterns-established:
  - "GameCard locked prop: pointerEvents blocked in onClick, cursor not-allowed via style, variant unchanged"

duration: 10min
started: 2026-03-14T00:00:00Z
completed: 2026-03-14T00:10:00Z
---

# Phase 9 Plan 01: UI Locking Summary

**Tips page locks on round start — yellow alert shown, tip selections remain visible, buttons show not-allowed cursor and block interaction.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~10 min |
| Started | 2026-03-14 |
| Completed | 2026-03-14 |
| Tasks | 1 completed |
| Files modified | 2 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Tips locked when round has started | Pass | isLocked disables interaction, alert shown |
| AC-2: Tips open when round has not started | Pass | useRoundLocked returns false, normal interaction |
| AC-3: Locked alert is informative | Pass | Context-aware message: started vs complete |
| AC-4: Past rounds are locked | Pass | roundOffset < 0 forces isLocked = true |

## Accomplishments

- Wired `useRoundLocked` into Tips.tsx with `isLocked` combining round lock + past-round guard
- Added `locked` prop to GameCard — preserves button variant so selected tip stays clearly visible
- `cursor: not-allowed` on locked buttons via inline style (pointerEvents: none suppressed cursor)
- Context-aware alert: "This round is complete" vs "This round has started" depending on game completion

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `src/pages/Tips.tsx` | Modified | useRoundLocked, isLocked, locked alert, pass locked to GameCard |
| `src/components/GameCard.tsx` | Modified | locked prop, cursor not-allowed, onClick guard |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| locked prop separate from disabled | Mantine disabled grays out variant — can't tell which team was picked | GameCard now has two distinct non-interactive states |
| cursor via inline style, not pointerEvents | pointerEvents: none also suppresses cursor change | User sees not-allowed cursor as clear UX signal |
| Context-aware lock message | "This round has started" is inaccurate once round is over | Message reflects actual round state |

## Deviations from Plan

### Auto-fixed Issues

**1. Lock message context-awareness**
- **Found during:** User review after Task 1
- **Issue:** "This round has started" is inaccurate for completed rounds
- **Fix:** Added `roundComplete` check — shows "complete" vs "started" message accordingly
- **Files:** src/pages/Tips.tsx

**2. Locked vs disabled visual distinction**
- **Found during:** User review after Task 1
- **Issue:** Passing `isLocked` as `disabled` made selected tip indistinguishable from unselected
- **Fix:** Added `locked` prop to GameCard; only `game.complete === 100` uses `disabled`
- **Files:** src/components/GameCard.tsx, src/pages/Tips.tsx

**3. Cursor feedback on locked buttons**
- **Found during:** User review after deviation 2 fix
- **Issue:** pointerEvents: none suppresses not-allowed cursor — confusing UX
- **Fix:** Removed pointerEvents: none, added `cursor: not-allowed` inline style on buttons
- **Files:** src/components/GameCard.tsx

## Issues Encountered

None beyond the user-identified UX issues above (all fixed).

## Next Phase Readiness

**Ready:**
- v0.4 Round Locking milestone complete — both phases shipped
- No deferred issues

**Concerns:**
- None

**Blockers:**
- None

---
*Phase: 09-ui-locking, Plan: 01*
*Completed: 2026-03-14*
