import express from 'express';
import { opportunities } from '../data';

const router = express.Router();

// GET all opportunities
router.get("/", (_req, res) => {
  res.json(opportunities);
});

// GET a single opportunity by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const opportunity = opportunities.find((opp) => opp.id === id);
  if (opportunity) res.json(opportunity);
  else res.status(404).json({ error: "Opportunity not found" });
});

// POST a new opportunity
router.post("/", (req, res) => {
  const { title, description, date, location, category } = req.body;
  if (!title || !description || !date || !location) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const newOpportunity = { id: Date.now(), title, description, date, location, category: category || "General" };
  opportunities.push(newOpportunity);
  res.status(201).json(newOpportunity);
});

// PUT (update) an opportunity by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty." });
  }
  const index = opportunities.findIndex((opp) => opp.id === id);
  if (index !== -1) {
    const updatedOpportunity = { ...opportunities[index], ...req.body, id: opportunities[index].id };
    opportunities[index] = updatedOpportunity;
    res.json(updatedOpportunity);
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});

// DELETE an opportunity by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = opportunities.findIndex((opp) => opp.id === id);
  if (index !== -1) {
    opportunities.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});

export default router;