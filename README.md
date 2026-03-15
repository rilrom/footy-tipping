# Footy Tipping

A 2-player AFL tipping app for household use. Track your weekly tips, compare results, and follow the season leaderboard. Fixtures and results are pulled from the public [Squiggle API](https://api.squiggle.com.au/).

## Configuring players

Copy `.env.example` to `.env.local` and fill in your details:

```bash
cp .env.example .env.local
```

```ini
VITE_PLAYERS=Alice,Bob
VITE_CONTACT_EMAIL=you@example.com
```

`VITE_CONTACT_EMAIL` is sent as the [Squiggle API](https://api.squiggle.com.au/) `User-Agent` so they can contact you if there are issues.

## Data

Tips are saved to `server/data/tips.json`.

## Roadmap

- [ ] Unlimited players
- [ ] Multiple years
