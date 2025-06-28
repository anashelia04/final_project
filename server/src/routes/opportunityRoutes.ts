import express from 'express';
import * as OpportunityService from '../services/opportunityService';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

// GET all opportunities
router.get("/", (req, res) => {
  const allOpportunities = OpportunityService.getAllOpportunities();
  res.json(allOpportunities);
});

// GET a single opportunity by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }
  const opportunity = OpportunityService.getOpportunityById(id);
  if (opportunity) {
    res.json(opportunity);
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});



// POST a new opportunity (requires login)
router.post("/", requireAuth, (req, res) => {
  const { title, description, date, location, category, volunteerLimit } = req.body;
  
  // Basic validation
  if (!title || !description || !date || !location || !volunteerLimit) {
    return res.status(400).json({ error: "Missing required fields: title, description, date, location, volunteerLimit." });
  }

  // Get the logged-in user's name from the cookie
  const authorUsername = req.cookies.user;

  const newOpportunity = OpportunityService.createOpportunity(
    { title, description, date, location, category: category || "General", volunteerLimit },
    authorUsername
  );
  
  res.status(201).json(newOpportunity);
});

// NEW: POST to join an opportunity (requires login)
router.post("/:id/join", requireAuth, (req, res) => {
  const opportunityId = parseInt(req.params.id, 10);
  if (isNaN(opportunityId)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }
  
  // The user who is trying to join is the one logged in
  const username = req.cookies.user;

  const result = OpportunityService.joinOpportunity(opportunityId, username);

  if (result.success) {
    res.status(200).json(result.data);
  } else {
    // Send a 409 Conflict status for business logic errors like "already joined" or "full"
    res.status(409).json({ error: result.message });
  }
});


// PUT to update an opportunity (requires login)
router.put("/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }
  
  const updatedOpportunity = OpportunityService.updateOpportunity(id, req.body);
  if (updatedOpportunity) {
    res.json(updatedOpportunity);
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});

// DELETE an opportunity (requires login)
router.delete("/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }
  
  const success = OpportunityService.deleteOpportunity(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});

export default router;