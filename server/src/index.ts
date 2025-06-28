import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import opportunityRoutes from './routes/opportunityRoutes'; 
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler'; 

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes); 
app.use('/api/opportunities', opportunityRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});