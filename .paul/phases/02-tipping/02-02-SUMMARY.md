---
phase: 02-tipping
plan: 02
subsystem: ui
tags: [react, summary, comparison, round-tips, squiggle-api]

requires:
  - phase: 02-tipping plan 01
    provides: tips data shape (game.id.toString() → teamName), /api/tips GET endpoint

provides:
  - Summary page at /summary — both players' picks side-by-side
  - Agreement highlighting (green row + "✓ Agree" badge)
  - Untipped games show "—"
  - Round navigator (same < Round N > pattern)
  - "Summary" nav link between Tips and Results

affects: [03-results-leaderboard]

tech-stack:
  added: []
  patterns:
    - Promise.all for parallel games + tips fetch on round change
    - Read-only page (no tip editing) — separate concern from Tips page

key-files:
  created:
    - src/pages/Summary.tsx
  modified:
    - src/components/Nav.tsx (added Summary NavLink)
    - src/App.tsx (added /summary route)

key-decisions:
  - "Separate Summary page (not a tab on Tips) — cleaner separation of concerns"
  - "Promise.all for games + tips fetch — single loading state, faster"
  - "Agreement = green row bg (#f0fdf4) + ✓ Agree badge — visually distinct"

patterns-established:
  - "GET /api/tips returns full { riley, charlotte } object — Phase 3 uses same pattern"
  - "Read-only game rows use grid layout (1fr auto 1fr) — reusable for Phase 3 results"

duration: ~15min
started: 2026-03-14T00:45:00Z
completed: 2026-03-14T01:00:00Z
---

# Phase 2 Plan 02: Summary View Summary

**Side-by-side tips comparison at /summary — both players' picks, agreement highlighted, round navigable.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~15 min |
| Started | 2026-03-14 |
| Completed | 2026-03-14 |
| Tasks | 2 completed |
| Files created/modified | 3 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Both players' picks shown | Pass | Riley left, Charlotte right per game row |
| AC-2: Agreement visually distinct | Pass | Green row + "✓ Agree" badge when both picked same team |
| AC-3: Untipped games show "—" | Pass | Null picks render muted "—" not blank |
| AC-4: Round navigator works | Pass | ‹ › arrows reload games + tips for new round |
| AC-5: Accessible from nav | Pass | "Summary" NavLink added between Tips and Results |

## Accomplishments

- Both players can see each other's picks without switching player view
- Agreement/disagreement immediately visible at a glance
- Clean grid layout ready to extend for Phase 3 (show correct tip after results)

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `src/pages/Summary.tsx` | Created | Comparison view with both players' tips |
| `src/components/Nav.tsx` | Modified | Added Summary NavLink |
| `src/App.tsx` | Modified | Added /summary route |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Promise.all for games + tips | Single loading spinner, faster parallel fetch | Phase 3 should follow same pattern |
| Separate page not a tab | Cleaner than toggling Tips page mode | /summary is independently linkable |

## Deviations from Plan

None — executed exactly as planned.

## Next Phase Readiness

**Ready:**
- `/api/tips` GET already returns `{ riley, charlotte }` — Phase 3 results page can reuse
- Grid row layout (1fr auto 1fr) can be extended with a "result" column in Phase 3
- Nav has Home | Tips | Summary | Results — Results placeholder ready to replace

**Concerns:** None

**Blockers:** None

---
*Phase: 02-tipping, Plan: 02*
*Completed: 2026-03-14*
