import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { type Request, type Response, Router } from "express";

const router = Router();

const DATA_FILE = resolve("server/data/tips.json");

type TipsData = Record<
  string,
  Record<string, Record<string, Record<string, string>>>
>;

function readTips(): TipsData {
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8")) as TipsData;
  } catch {
    return {};
  }
}

function writeTips(data: TipsData): void {
  mkdirSync(dirname(DATA_FILE), { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

router.get("/", (req: Request, res: Response) => {
  const { year, round } = req.query as { year?: string; round?: string };

  const tips = readTips();

  if (year && round) {
    res.json(tips[year]?.[round] ?? {});
  } else if (year) {
    res.json(tips[year] ?? {});
  } else {
    res.json(tips);
  }
});

router.post("/", (req: Request, res: Response) => {
  const { year, round, player, tips } = req.body as {
    year: string;
    round: string;
    player: string;
    tips: Record<string, string>;
  };

  const data = readTips();

  if (!data[year]) {
    data[year] = {};
  }

  if (!data[year][round]) {
    data[year][round] = {};
  }

  // Deep-merge: preserve other player's tips
  data[year][round][player] = { ...data[year][round][player], ...tips };

  writeTips(data);

  res.json({ success: true });
});

export default router;
