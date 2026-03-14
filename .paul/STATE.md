# Project State

## Project Reference

See: .paul/PROJECT.md (updated 2026-03-14)

**Core value:** Riley and Charlotte can tip AFL games each week and track their results against each other.
**Current focus:** v0.4 Round Locking — In Progress

## Current Position

Milestone: v0.4 Round Locking — ✅ COMPLETE
Phase: 9 of 9 (UI Locking) — Complete
Plan: All plans complete
Status: Milestone shipped
Last activity: 2026-03-14 — Phase 9 complete, v0.4.0 done

Progress:
- v0.4 Round Locking: [██████████] 100%
- Phase 9: [██████████] 100%

## Loop Position

Current loop state:
```
PLAN ──▶ APPLY ──▶ UNIFY
  ✓        ✓        ✓     [All loops complete — v0.4.0 done]
```

## Accumulated Context

### Decisions

| Decision | Phase | Impact |
|----------|-------|--------|
| Mantine v8, no custom theme | Phase 4 | Out-of-the-box Mantine defaults only |
| Stack gap on parent for list spacing | Phase 4 | Never use mb on child items |
| Button component={Link} for navigation | Phase 5 | Declarative routing, no useNavigate |
| Static labels shown during loading | Phase 6 | Only dynamic values skeletonised |
| allByRound alongside byRound | Phase 7 | Total vs completed game counts per round |
| Client-side deadline detection | Phase 8 | No backend endpoint needed; time comparison from game dates |
| Empty games → unlocked (false) | Phase 8 | Safe default: don't block tipping if data not loaded yet |
| locked prop separate from disabled | Phase 9 | Preserves filled/default variant so selected tip is visible when locked |
| cursor not-allowed via inline style | Phase 9 | pointerEvents: none suppresses cursor — inline style needed for UX signal |

### Deferred Issues
None.

### Blockers/Concerns
None.

## Session Continuity

Last session: 2026-03-14
Stopped at: v0.4.0 Round Locking complete — all features shipped
Next action: Use the app! Or run /paul:milestone to plan v0.5
Resume file: .paul/PROJECT.md

---
*STATE.md — Updated after every significant action*
