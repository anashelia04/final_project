import express from "express";
import cors from "cors";
import opportunityRoutes from './routes/opportunityRoutes'; 
import { errorHandler } from './middleware/errorHandler'; 

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes 
app.use('/opportunities', opportunityRoutes);

// Global Error Handler 
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});