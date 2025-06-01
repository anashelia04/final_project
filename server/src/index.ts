import express from "express";
import cors from "cors";
import { opportunities } from "./data";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/opportunities", (_req, res) => {
  res.json(opportunities);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
