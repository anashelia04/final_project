import { useEffect, useState } from "react";

function App() {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/opportunities")
      .then((res) => res.json())
      .then((data) => setOpportunities(data));
  }, []);

  return (
    <div>
      <h1>Volunteer Opportunities</h1>
      <ul>
        {opportunities.map((opp) => (
          <li key={opp.id}>
            <strong>{opp.title}</strong> - {opp.location} ({opp.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
