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


app.get("/opportunities/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const opportunity = opportunities.find((opp) => opp.id === id);

  if (opportunity) {
    res.json(opportunity);
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});