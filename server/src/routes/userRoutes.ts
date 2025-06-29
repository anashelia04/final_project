import express, { Request, Response } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import * as UserService from '../services/userService';

const router = express.Router();

router.get('/me/dashboard', requireAuth, (req: Request, res: Response) => {
    const username = req.cookies.user;
    const dashboardData = UserService.getDashboardData(username);
    res.json(dashboardData);
});

router.delete('/me/joined/:opportunityId', requireAuth, (req: Request, res: Response) => {
    const username = req.cookies.user;
    const opportunityId = parseInt(req.params.opportunityId, 10);

    if (isNaN(opportunityId)) {
        res.status(400).json({ error: "Invalid opportunity ID." });
        return;
    }

    const result = UserService.leaveOpportunity(username, opportunityId);

    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(404).json({ error: result.message });
    }
});

export default router;