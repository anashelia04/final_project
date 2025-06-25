import express from "express";
import cors from "cors";
app.use(express.json()); 
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

// POST a new opportunity 
app.post("/opportunities", (req, res) => {
  const { title, description, date, location, category } = req.body;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ 
      error: "Missing required fields. Required: title, description, date, location." 
    });
  }

  const newOpportunity = {
    id: Date.now(),
    title,
    description,
    date,
    location,
    category: category || "General",
  };

  opportunities.push(newOpportunity);
  res.status(201).json(newOpportunity);
});

// PUT (update) an opportunity by ID 
app.put("/opportunities/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = opportunities.findIndex((opp) => opp.id === id);

  if (index !== -1) {
    const originalOpportunity = opportunities[index];
    const updatedOpportunity = {
      ...originalOpportunity,
      ...req.body,
      id: originalOpportunity.id,
    };
    opportunities[index] = updatedOpportunity;
    res.json(updatedOpportunity);
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});

// DELETE an opportunity by ID 
app.delete("/opportunities/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = opportunities.findIndex((opp) => opp.id === id);

  if (index !== -1) {
    opportunities.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});