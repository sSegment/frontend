import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({ users: [], recipes: [] });

  useEffect(() => {
    fetch("http://localhost:3000/api/test")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>

      <h1>Recipes</h1>
      <ul>
        {data.recipes.map((r) => (
          <li key={r.id}>
            {r.title} (by {r.author})
          </li>
        ))}
      </ul>
    </div>
  );
}
