import express, { Request, Response } from 'express';
import * as OpportunityService from '../services/opportunityService';

const router = express.Router();

/**
 * @description Get all volunteer opportunities, with optional filtering.
 * @route GET /opportunities
 * @param {string} [req.query.category] - Optional: Filter by category (e.g., "Environment").
 * @param {string} [req.query.search] - Optional: Search by keyword in title or description.
 * @returns {Array<VolunteerOpportunity>} A list of opportunities.
 */
router.get("/", (req: Request, res: Response) => {
  const { category, search } = req.query;
  const filteredOpportunities = OpportunityService.getAllOpportunities({
    category: category as string,
    search: search as string,
  });
  res.json(filteredOpportunities);
});

/**
 * @description Get a single volunteer opportunity by its ID.
 * @route GET /opportunities/:id
 * @param {number} req.params.id - The unique ID of the opportunity.
 * @returns {VolunteerOpportunity} The opportunity object if found.
 * @returns {404} If the opportunity is not found.
 */
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format. ID must be a number." });
    return;
  }
  const opportunity = OpportunityService.getOpportunityById(id);
  if (opportunity) res.json(opportunity);
  else res.status(404).json({ error: "Opportunity not found" });
});


/**
 * @description Create a new volunteer opportunity.
 * @route POST /opportunities
 * @body {Omit<VolunteerOpportunity, 'id'>} The opportunity data to create.
 * @returns {VolunteerOpportunity} The newly created opportunity, including its new ID.
 * @returns {400} If required fields are missing.
 */
router.post("/", (req: Request, res: Response) => {
  const { title, description, date, location, category } = req.body;
  if (!title || !title.trim() || !description || !description.trim() || !date || !location || !location.trim()) {
    res.status(400).json({ error: "Missing or empty required fields. Required: title, description, date, location." });
    return;
  }

  const newOpportunity = OpportunityService.createOpportunity({ title, description, date, location, category: category || "General" });
  res.status(201).json(newOpportunity);
});

/**
 * @description Update an existing volunteer opportunity by its ID.
 * @route PUT /opportunities/:id
 * @param {number} req.params.id - The ID of the opportunity to update.
 * @body {Partial<VolunteerOpportunity>} The fields to update.
 * @returns {VolunteerOpportunity} The fully updated opportunity object.
 * @returns {404} If the opportunity is not found.
 * @returns {400} If the request body is empty.
 */
router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format. ID must be a number." });
    return;
  }

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Request body cannot be empty." });
    return;
  }
  const updatedOpportunity = OpportunityService.updateOpportunity(id, req.body);
  if (updatedOpportunity) res.json(updatedOpportunity);
  else res.status(404).json({ error: "Opportunity not found" });
});

/**
 * @description Delete a volunteer opportunity by its ID.
 * @route DELETE /opportunities/:id
 * @param {number} req.params.id - The ID of the opportunity to delete.
 * @returns {204} No Content on successful deletion.
 * @returns {404} If the opportunity is not found.
 */
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format. ID must be a number." });
    return;
  }
  
  const success = OpportunityService.deleteOpportunity(id);
  if (success) res.status(204).send();
  else res.status(404).json({ error: "Opportunity not found" });
});
  

export default router;