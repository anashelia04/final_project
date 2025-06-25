import express from 'express';
import bodyParser from 'body-parser';
import { opportunities } from './data'; 

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.get('/opportunities/:id', (req, res) => {
  const { id } = req.params;

  const opportunity = opportunities.find(op => op.id === id || op.id === parseInt(id));

  if (!opportunity) {
    return res.status(404).json({ error: 'Opportunity not found' });
  }

  res.json(opportunity);
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
