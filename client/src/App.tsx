import { useState, useEffect } from "react";

function App() {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/opportunities")
      .then((res) => res.json())
      .then((data) => setOpportunities(data));
  }, []);

  const filtered = opportunities.filter((opp) =>
    opp.title.toLowerCase().includes(search.toLowerCase()) ||
    opp.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Volunteer Opportunities</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map((opp) => (
          <li key={opp.id}>
            <strong>{opp.title}</strong> – {opp.location} ({opp.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
