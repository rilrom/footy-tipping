# Roadmap: footy-tipping

## Overview

Build a local React app where Riley and Charlotte can tip AFL games each week and track their results against each other. Data sourced from the Squiggle API. Runs on localhost only.

## Current Milestone

**v0.1 Initial Release** (v0.1.0)
Status: ✅ Complete
Phases: 3 of 3 complete

## Phases

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 1 | Foundation | 2 | ✅ Complete | 2026-03-14 |
| 2 | Tipping | 2 | ✅ Complete | 2026-03-14 |
| 3 | Results & Leaderboard | 2 | ✅ Complete | 2026-03-14 |

## Phase Details

### Phase 1: Foundation

**Goal:** Working React app with Squiggle API client and typed data layer
**Depends on:** Nothing (first phase)
**Research:** Unlikely (Squiggle API is simple REST)

**Scope:**
- Vite + React + TypeScript project scaffold
- Squiggle API client with typed responses
- TypeScript types for games, teams, results
- Basic app shell with navigation

**Plans:**
- [x] 01-01: Scaffold app, API client, types, app shell
- [x] 01-02: Express backend with JSON file persistence

### Phase 2: Tipping

**Goal:** Riley and Charlotte can view the current round's fixtures and enter their tips
**Depends on:** Phase 1 (Squiggle API client, types)
**Research:** Unlikely

**Scope:**
- Current round fixtures view from Squiggle API
- Tip selection UI per game for each player
- Tips persisted to localStorage

**Plans:**
- [x] 02-01: Round fixtures view and tip selection UI
- [x] 02-02: Tip persistence and tips summary view

### Phase 3: Results & Leaderboard

**Goal:** See round results and a running season leaderboard between Riley and Charlotte
**Depends on:** Phase 2 (tips data structure)
**Research:** Unlikely

**Scope:**
- Round results view (pull completed game results from Squiggle)
- Per-round scoring (who tipped correctly)
- Season leaderboard (cumulative correct tips)

**Plans:**
- [x] 03-01: Round results and per-round scoring
- [x] 03-02: Season leaderboard

---
*Roadmap created: 2026-03-14*
*Last updated: 2026-03-14*
