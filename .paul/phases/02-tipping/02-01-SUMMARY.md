---
phase: 02-tipping
plan: 01
subsystem: ui
tags: [react, tipping, squiggle-api, gamecard, tips-api]

requires:
  - phase: 01-foundation plan 01
    provides: Squiggle API client, Game types, app shell
  - phase: 01-foundation plan 02
    provides: POST/GET /api/tips backend endpoints

provides:
  - Tips page with player selector (Riley / Charlotte)
  - Round navigator (< Round N >)
  - GameCard component with click-to-tip and selected state
  - Auto-save tips on click via POST /api/tips
  - Load existing tips on mount and player switch
  - Disabled + score display for completed games

affects: [02-02-summary, 03-results-leaderboard]

tech-stack:
  added: []
  patterns:
    - Optimistic state update on tip click (state first, then POST)
    - Three separate useEffects for round init, games load, tips load
    - Tips keyed by game.id.toString() in Record<string, string>

key-files:
  created:
    - src/pages/Tips.tsx
    - src/components/GameCard.tsx
  modified:
    - src/App.tsx (wired Tips page into /tips route)

key-decisions:
  - "Auto-save on each tip click (no explicit save button) — better UX"
  - "Optimistic UI: setTips before fetch so button highlights instantly"
  - "Tips keyed by game.id.toString() to match backend Record<string,string>"

patterns-established:
  - "Fetch /api/tips?year=Y&round=R → extract data[player] ?? {} for current player"
  - "POST /api/tips with full tips record (not just the changed game)"
  - "Round nav: setRound(r => r - 1) triggers games + tips reload via useEffect deps"

duration: ~20min
started: 2026-03-14T00:25:00Z
completed: 2026-03-14T00:45:00Z
---

# Phase 2 Plan 01: Tipping UI Summary

**Player-switching tip entry with round navigation, auto-save to backend, and live tip highlights — verified working with real Squiggle API data.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~20 min |
| Started | 2026-03-14 |
| Completed | 2026-03-14 |
| Tasks | 2 completed |
| Files created/modified | 3 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Player selector switches active player | Pass | Switching loads that player's tips from backend |
| AC-2: Round navigator changes round | Pass | < › arrows trigger games + tips reload |
| AC-3: Games display for selected round | Pass | Real Squiggle API data renders correctly |
| AC-4: Clicking a team tips that game | Pass | Optimistic highlight + auto-save to tips.json confirmed |
| AC-5: Existing tips load on mount/switch | Pass | Riley's tips persist across Charlotte switch and back |
| AC-6: Completed games are locked | Pass | disabled buttons + score display for complete=100 games |

## Accomplishments

- Full tipping loop works end-to-end: load fixtures → select tips → persist to disk → reload on return
- Real tip confirmed in server/data/tips.json: Riley tipped GWS for Round 1 2026 during verification
- Optimistic UI means zero perceived latency on tip selection

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `src/pages/Tips.tsx` | Created | Player selector, round nav, tips load/save logic |
| `src/components/GameCard.tsx` | Created | Game display with team buttons and result view |
| `src/App.tsx` | Modified | Wired Tips page into /tips route |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Auto-save on click | No explicit save button reduces friction | POST fires immediately on each tip selection |
| Optimistic state update | Instant button highlight feels responsive | State set before fetch; no rollback on error (acceptable for personal app) |

## Deviations from Plan

None — executed exactly as planned.

## Next Phase Readiness

**Ready:**
- `tips[game.id.toString()]` pattern established for Plan 02-02's summary view
- Both players' tips coexist in tips.json — Plan 02-02 can read both in one GET /api/tips call
- GameCard component ready to be reused in summary view (read-only mode via disabled prop)

**Concerns:** None

**Blockers:** None

---
*Phase: 02-tipping, Plan: 01*
*Completed: 2026-03-14*
