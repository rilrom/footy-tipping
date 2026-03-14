---
phase: 01-foundation
plan: 02
subsystem: api
tags: [express, typescript, tsx, json, concurrently, cors, vite-proxy]

requires:
  - phase: 01-foundation plan 01
    provides: Vite + React project scaffold, package.json, vite.config.ts

provides:
  - Express server on port 3001 with tips GET/POST API
  - JSON file persistence at server/data/tips.json
  - Deep-merge save strategy (one player's tips never overwrite the other's)
  - Vite proxy for /api → localhost:3001 (no CORS in browser)
  - Single `npm run dev` starts both frontend and backend

affects: [02-tipping, 03-results-leaderboard]

tech-stack:
  added: [express@4, cors@2, tsx@4, concurrently@9, @types/express, @types/cors, @types/node]
  patterns:
    - tsx for running TypeScript server files (replaces ts-node)
    - path.resolve('server/data/tips.json') for data file path (CWD-relative)
    - Deep-merge on POST to preserve both players' tips

key-files:
  created:
    - server/index.ts
    - server/routes/tips.ts
    - server/data/tips.json
  modified:
    - package.json (added deps + scripts)
    - vite.config.ts (added /api proxy)

key-decisions:
  - "Used tsx instead of ts-node: simpler ESM support, no tsconfig workarounds needed"
  - "Data file at server/data/tips.json resolved from CWD (project root)"
  - "Deep-merge on POST: spread existing player tips before overwriting with new ones"

patterns-established:
  - "Phase 2 calls POST /api/tips with { year, round, player, tips } to save tips"
  - "Phase 2 calls GET /api/tips?year=Y&round=R to load tips for a round"
  - "player is always 'riley' or 'charlotte' (string literal, no auth needed)"

duration: ~10min
started: 2026-03-14T00:15:00Z
completed: 2026-03-14T00:25:00Z
---

# Phase 1 Plan 02: Express Backend Summary

**Express server on port 3001 persists tips to disk as JSON; `npm run dev` starts the full stack; Vite proxies `/api` transparently.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~10 min |
| Started | 2026-03-14 |
| Completed | 2026-03-14 |
| Tasks | 2 completed |
| Files created/modified | 5 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Backend serves tips API | Pass | GET /api/tips?year=2025&round=1 returns {} when empty |
| AC-2: Tips can be saved | Pass | POST saves to tips.json; deep-merge verified (Riley + Charlotte tips coexist) |
| AC-3: Single dev command | Pass | `npm run dev` starts both servers via concurrently |
| AC-4: Frontend proxies /api | Pass | Vite proxy configured; no CORS errors |

## Accomplishments

- Tips survive browser data clears — stored in `server/data/tips.json` on disk
- Deep-merge: saving Riley's tips never wipes Charlotte's, and vice versa
- Clean API shape (`{ year → round → player → { gameId: teamName } }`) ready for Phase 2

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `server/index.ts` | Created | Express app, CORS, mounts /api/tips router |
| `server/routes/tips.ts` | Created | GET + POST handlers with JSON read/write |
| `server/data/tips.json` | Created | Persisted tips storage (starts as `{}`) |
| `package.json` | Modified | Added express, cors, tsx, concurrently; updated scripts |
| `vite.config.ts` | Modified | Added /api proxy to localhost:3001 |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| `tsx` instead of `ts-node` | Better ESM support, no separate tsconfig needed | Server starts with `npx tsx server/index.ts` |
| `path.resolve('server/data/tips.json')` | Resolves from CWD (project root) when running via npm script | Works correctly regardless of __dirname/import.meta.url |

## Deviations from Plan

| Type | Count | Impact |
|------|-------|--------|
| Auto-fixed | 1 | Used `tsx` instead of `ts-node` — same outcome, simpler setup |
| Scope additions | 0 | — |
| Deferred | 0 | — |

**Total impact:** Minimal — tsx is a drop-in replacement, no behaviour difference.

## How Phase 2 Uses This API

```typescript
// Load tips for a round
const res = await fetch(`/api/tips?year=${year}&round=${round}`)
const tips = await res.json() // { riley: { gameId: team }, charlotte: { gameId: team } }

// Save a player's tips
await fetch('/api/tips', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ year, round, player: 'riley', tips: { '101': 'Geelong' } })
})
```

## Next Phase Readiness

**Ready:**
- `/api/tips` GET and POST endpoints operational
- Data shape defined and tested
- Vite proxy means Phase 2 React code calls `/api/tips` directly (no localhost:3001 references needed)

**Concerns:** None

**Blockers:** None

---
*Phase: 01-foundation, Plan: 02*
*Completed: 2026-03-14*
