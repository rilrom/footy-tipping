# Roadmap: footy-tipping

## Overview

Build a local React app where Riley and Charlotte can tip AFL games each week and track their results against each other. Data sourced from the Squiggle API. Runs on localhost only.

## Current Milestone

**v0.5 Round 0 Support** (v0.5.0)
Status: ✅ Complete
Phases: 1 of 1 complete

## Previous Milestones

**v0.4 Round Locking** (v0.4.0)
Status: ✅ Complete
Phases: 2 of 2 complete

**v0.3 Polish** (v0.3.0)
Status: ✅ Complete
Phases: 3 of 3 complete

## Phases

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 1 | Foundation | 2 | ✅ Complete | 2026-03-14 |
| 2 | Tipping | 2 | ✅ Complete | 2026-03-14 |
| 3 | Results & Leaderboard | 2 | ✅ Complete | 2026-03-14 |
| 4 | Mantine UI | 2 | ✅ Complete | 2026-03-14 |
| 5 | Home Page | 1 | ✅ Complete | 2026-03-14 |
| 6 | Loading & Errors | 1 | ✅ Complete | 2026-03-14 |
| 7 | Leaderboard Enhancements | 1 | ✅ Complete | 2026-03-14 |
| 8 | Deadline Detection | 1 | ✅ Complete | 2026-03-14 |
| 9 | UI Locking | 1 | ✅ Complete | 2026-03-14 |
| 10 | Round 0 Support | 1 | ✅ Complete | 2026-03-15 |

## Phase Details

### Phase 1: Foundation

**Goal:** Working React app with Squiggle API client and typed data layer
**Depends on:** Nothing (first phase)

**Plans:**
- [x] 01-01: Scaffold app, API client, types, app shell
- [x] 01-02: Express backend with JSON file persistence

### Phase 2: Tipping

**Goal:** Riley and Charlotte can view the current round's fixtures and enter their tips
**Depends on:** Phase 1

**Plans:**
- [x] 02-01: Round fixtures view and tip selection UI
- [x] 02-02: Tip persistence and tips summary view

### Phase 3: Results & Leaderboard

**Goal:** See round results and a running season leaderboard between Riley and Charlotte
**Depends on:** Phase 2

**Plans:**
- [x] 03-01: Round results and per-round scoring
- [x] 03-02: Season leaderboard

### Phase 4: Mantine UI

**Goal:** Replace all inline styles with Mantine UI components throughout the app
**Depends on:** Phase 3

**Plans:**
- [x] 04-01: Install Mantine + convert app shell (App, Nav, GameCard)
- [x] 04-02: Convert pages (Tips, Results, Leaderboard)

### Phase 5: Home Page

**Goal:** Improve the welcome page with current round context and quick navigation
**Depends on:** Phase 4 (Mantine in place)

**Scope:**
- Show current round number and status on home page
- Quick-action buttons to jump to Tips or Results for the current round
- Generally more useful than the current placeholder welcome message

**Plans:**
- TBD (defined during /paul:plan)

### Phase 6: Loading & Errors

**Goal:** Better loading states across all pages and graceful error handling for API failures
**Depends on:** Phase 4 (Mantine in place)

**Scope:**
- Replace plain text loading indicators with Mantine Skeleton or Loader components
- Handle Squiggle API errors gracefully (show user-friendly messages, not broken UI)
- Consistent empty/error states across Tips, Results, Leaderboard

**Plans:**
- TBD (defined during /paul:plan)

### Phase 7: Leaderboard Enhancements

**Goal:** Show game totals in leaderboard round breakdown in a more informative format
**Depends on:** Phase 4 (Mantine in place)

**Scope:**
- In-progress rounds: show `6/9` (correct tips / total games played)
- Completed rounds: show just `9` (total games, no fraction needed)
- Apply to both the per-player score cells and the games column

**Plans:**
- TBD (defined during /paul:plan)

### Phase 8: Deadline Detection

Focus: Detect when a round has started and tipping should be locked
Plans: TBD (defined during /paul:plan)

### Phase 9: UI Locking

Focus: Prevent tip changes in the UI once the round deadline has passed
Plans: TBD (defined during /paul:plan)

### Phase 10: Round 0 Support

Focus: Support Round 0 as a valid tipping round (AFL introduced Round 0 this season; Squiggle provides data for it)
Plans: TBD (defined during /paul:plan)

---
*Roadmap created: 2026-03-14*
*Last updated: 2026-03-15 — v0.5.0 complete*
