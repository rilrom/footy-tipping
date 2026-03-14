# Project: footy-tipping

## What This Is

A local React app for tracking AFL footy tipping between Riley and Charlotte. Runs on localhost only, pulling game data from the Squiggle API (https://api.squiggle.com.au/). Each week, both users tip their predicted winners, results are tracked, and a season leaderboard shows who's winning.

## Core Value

Riley and Charlotte can tip AFL games each week and track their results against each other.

## Current State

| Attribute | Value |
|-----------|-------|
| Version | 0.5.0 |
| Status | Complete |
| Last Updated | 2026-03-15 |

## Requirements

### Validated (Shipped)

- [x] React + Vite app scaffold running on localhost — Phase 1
- [x] Squiggle API client with typed Game, Team data — Phase 1
- [x] Tips persisted to disk (JSON file, survives browser clears) — Phase 1
- [x] Single `npm run dev` command starts full stack — Phase 1
- [x] Round fixtures view with tip selection per game — Phase 2
- [x] Player selector (Riley / Charlotte) with per-player tip loading — Phase 2
- [x] Side-by-side summary view with agreement highlighting — Phase 2
- [x] Round results with correct/incorrect tip highlighting — Phase 3
- [x] Season leaderboard with cumulative scores and round breakdown — Phase 3
- [x] Mantine UI library with consistent components throughout — Phase 4
- [x] Home page with current round display and quick-action navigation — Phase 5
- [x] Skeleton loading states and error alerts across all pages — Phase 6
- [x] Leaderboard shows X/Y for in-progress rounds, clean totals when complete — Phase 7
- [x] Tips page locks when round starts — alert shown, selected tip visible, cursor signals no interaction — Phase 8–9
- [x] Round 0 (AFL Opening Round) supported — navigate, tip, and view results for round 0 — Phase 10

### Active (In Progress)

None.

### Planned (Next)

- [ ] (Future) Push notifications when results are in

### Out of Scope

- Multi-user / public deployment
- Authentication / accounts (localhost only, two known users)
- Database (JSON file persistence is sufficient)

## Target Users

**Primary:** Riley and Charlotte
- Two players tipping against each other
- Casual AFL fans
- Want a simple, fun way to compete each round

## Context

**Business Context:**
Personal project for household use only. No monetisation, no public access.

**Technical Context:**
React 19 + Vite 8 frontend with Mantine v8 UI library. Express backend on port 3001 with JSON file persistence. Squiggle API for fixture and results data. Vite proxies /api to backend.

## Constraints

### Technical Constraints
- Must run on localhost (no deployment required)
- Data sourced from Squiggle API only
- React 19 + Vite 8 frontend
- Express backend for persistence (no database)

### Business Constraints
- Two players only (Riley and Charlotte)
- Player identity is string literal ("riley" | "charlotte") — no auth needed

## Key Decisions

| Decision | Rationale | Date | Status |
|----------|-----------|------|--------|
| Squiggle API for data | Free, covers AFL fixtures and results | 2026-03-14 | Active |
| Localhost only | Personal household use, no hosting needed | 2026-03-14 | Active |
| Express + JSON file for persistence | localStorage too easily lost; disk file survives browser clears | 2026-03-14 | Active |
| React 19 + Vite 8 + Router v7 | Latest stable versions | 2026-03-14 | Active |
| tsx for server execution | Simpler than ts-node, no tsconfig workarounds needed | 2026-03-14 | Active |
| Mantine v8 UI library | Replaces inline styles; out-of-the-box components, no custom theme | 2026-03-14 | Active |
| Auto-save tips on click | No explicit save button reduces friction | 2026-03-14 | Active |
| Stack gap on parent for list spacing | Avoids unwanted trailing margin on last child | 2026-03-14 | Active |
| Client-side deadline detection | Localhost app — no server authority needed; time comparison from game dates sufficient | 2026-03-14 | Active |
| locked prop separate from disabled on GameCard | Mantine disabled grays out variant — need locked to preserve tip selection visibility | 2026-03-14 | Active |
| `round !== undefined` for Squiggle API query | `0` is falsy in JS — truthy check silently drops round filter for Round 0 | 2026-03-15 | Active |

## Success Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Both users can tip each round | 100% rounds covered | ✓ | Achieved |
| Results tracked and compared | Leaderboard visible | ✓ | Achieved |

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | React 19 + Vite 8 | localhost:5173 |
| UI Library | Mantine v8 | @mantine/core + @mantine/hooks |
| Routing | React Router v7 | BrowserRouter |
| Backend | Express 4 | localhost:3001 |
| Runtime | tsx | Server TypeScript execution |
| Data | Squiggle API | https://api.squiggle.com.au/ |
| Persistence | JSON file | server/data/tips.json |
| Dev tooling | concurrently | Single npm run dev for full stack |

## Pages

| Route | Purpose |
|-------|---------|
| / | Welcome page |
| /tips | Enter tips for current/any round |
| /results | View round results with correct/incorrect highlighting |
| /leaderboard | Season totals and round-by-round breakdown |

## Links

| Resource | URL |
|----------|-----|
| Squiggle API | https://api.squiggle.com.au/ |

---
*PROJECT.md — Updated when requirements or context change*
*Last updated: 2026-03-15 after Phase 10 — v0.5.0 Round 0 Support complete*
