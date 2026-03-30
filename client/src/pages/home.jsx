import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/users/me", {
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        // backend returns { status, data }
        setUser(data.data);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log("USER OBJECT:", user);

  return (
    <div>
      <h1>Home</h1>

      {user ? (
        <div>
          <h2>Logged in user:</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
