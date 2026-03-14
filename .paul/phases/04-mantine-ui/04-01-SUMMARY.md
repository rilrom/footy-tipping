---
phase: 04-mantine-ui
plan: 01
subsystem: ui
tags: [mantine, postcss, react, vite, appshell]

requires:
  - phase: 03-results-leaderboard
    provides: complete app to migrate

provides:
  - Mantine v8 installed and configured
  - MantineProvider wrapping the full app
  - AppShell layout with constrained content width
  - Nav component with active link state
  - GameCard using Mantine Card + Button

affects: 04-02 (pages conversion builds on this foundation)

tech-stack:
  added: ["@mantine/core 8.3.16", "@mantine/hooks 8.3.16", "postcss-preset-mantine", "autoprefixer", "postcss"]
  patterns: ["gap on parent container (Stack) for list spacing, not mb on child"]

key-files:
  created: [postcss.config.cjs]
  modified: [src/main.tsx, src/App.tsx, src/components/Nav.tsx, src/components/GameCard.tsx, src/pages/Tips.tsx]

key-decisions:
  - "Nav active state: react-router NavLink with Mantine CSS variable inline styles (var(--mantine-color-text) etc) — Mantine Anchor doesn't receive react-router isActive"
  - "Content width: Container size=md in AppShell.Main to prevent full-width stretch"
  - "List spacing: Stack gap=sm wrapper on parent, not mb on GameCard"

patterns-established:
  - "Use Stack with gap prop to space repeated items, never mb on the item itself"
  - "Mantine CSS variables (var(--mantine-color-*)) are acceptable for bridging third-party active states"

duration: ~30min
started: 2026-03-14T00:00:00Z
completed: 2026-03-14T00:00:00Z
---

# Phase 4 Plan 01: Mantine Setup + App Shell Summary

**Mantine v8 installed with PostCSS; AppShell layout, Nav with active state, and GameCard converted to Mantine components.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~30 min |
| Tasks | 3 auto + 1 checkpoint completed |
| Files modified | 7 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Mantine Installed | Pass | v8.3.16, PostCSS configured, build clean |
| AC-2: App Shell Uses Mantine Layout | Pass | AppShell + Container size="md" |
| AC-3: Nav Uses Mantine NavLink | Pass | Active state working via Mantine CSS vars |
| AC-4: GameCard Uses Mantine Card + Buttons | Pass | Card, Button (filled/default), Text |

## Accomplishments

- Mantine v8 + PostCSS fully configured; `pnpm run build` passes with no errors
- AppShell header + constrained content width (`Container size="md"`) replacing raw div layout
- GameCard converted to Mantine Card with `variant="filled"` / `variant="default"` team buttons

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `postcss.config.cjs` | Created | PostCSS config for postcss-preset-mantine |
| `src/main.tsx` | Modified | Added MantineProvider + `@mantine/core/styles.css` import |
| `src/App.tsx` | Modified | AppShell layout with AppShell.Header + AppShell.Main + Container |
| `src/components/Nav.tsx` | Modified | Group layout, NavLink with Mantine CSS variable active styles |
| `src/components/GameCard.tsx` | Modified | Card, Button, Text — no inline styles |
| `src/pages/Tips.tsx` | Modified | Added Stack gap="sm" wrapper around game cards list |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| NavLink active state via Mantine CSS vars | Mantine `Anchor` component doesn't receive react-router's `isActive` — bridging required | Minimal inline style (uses design tokens, not arbitrary values) |
| `Container size="md"` in AppShell.Main | Content was spanning full viewport width without constraint | All pages get consistent max-width |
| `Stack gap="sm"` in Tips.tsx | User feedback: gap on parent is correct pattern vs mb on child | Applied pattern to Tips.tsx early; Plan 02 will follow same pattern |

## Deviations from Plan

### Summary

| Type | Count | Impact |
|------|-------|--------|
| Auto-fixed | 2 | Active nav styling + content width — both caught at checkpoint |
| Scope additions | 1 | Tips.tsx Stack wrapper added (minor, in-scope fix) |
| Deferred | 0 | — |

**Total impact:** Essential fixes identified at checkpoint, no scope creep.

### Auto-fixed Issues

**1. Nav active link not styled**
- **Found during:** Checkpoint human-verify
- **Issue:** Mantine `Anchor component={NavLink}` doesn't pass `isActive` through, so active links looked identical to inactive
- **Fix:** Switched to react-router `NavLink` with `style` callback using Mantine CSS variables
- **Files:** `src/components/Nav.tsx`

**2. Content spanning full viewport width**
- **Found during:** Checkpoint human-verify
- **Issue:** `AppShell.Main` renders full-width by default
- **Fix:** Added `Container size="md"` wrapper inside `AppShell.Main`
- **Files:** `src/App.tsx`

## Next Phase Readiness

**Ready:**
- Mantine provider + styles in place for all page components
- Pattern established: Stack/Group for layout, gap for spacing, Mantine CSS vars for theme tokens
- Build passes clean

**Concerns:** None

**Blockers:** None

---
*Phase: 04-mantine-ui, Plan: 01*
*Completed: 2026-03-14*
