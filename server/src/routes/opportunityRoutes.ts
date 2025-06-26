import express from 'express';
import * as OpportunityService from '../services/opportunityService'; 

const router = express.Router();

// GET all opportunities
router.get("/", (req, res) => {
  const { category, search } = req.query;

  const filteredOpportunities = OpportunityService.getAllOpportunities({
    category: category as string, 
    search: search as string,   
  });
  
  res.json(filteredOpportunities);
});

// GET a single opportunity by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const opportunity = OpportunityService.getOpportunityById(id);
  if (opportunity) res.json(opportunity);
  else res.status(404).json({ error: "Opportunity not found" });
});

// POST a new opportunity
router.post("/", (req, res) => {
  const { title, description, date, location, category } = req.body;
  if (!title || !description || !date || !location) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const newOpportunity = OpportunityService.createOpportunity({ title, description, date, location, category: category || "General" });
  res.status(201).json(newOpportunity);
});

// PUT (update) an opportunity by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty." });
  }
  const updatedOpportunity = OpportunityService.updateOpportunity(id, req.body);
  if (updatedOpportunity) res.json(updatedOpportunity);
  else res.status(404).json({ error: "Opportunity not found" });
});

// DELETE an opportunity by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const success = OpportunityService.deleteOpportunity(id);
  if (success) res.status(204).send();
  else res.status(404).json({ error: "Opportunity not found" });
});

export default router;