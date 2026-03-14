import cors from "cors";
import express from "express";
import tipsRouter from "./routes/tips";

const app = express();

const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/api/tips", tipsRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
