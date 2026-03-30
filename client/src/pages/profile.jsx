import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/users";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  const handleSave = async () => {
    await updateProfile(user);
    alert("Profile updated");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>

      <input
        value={user.firstname || ""}
        onChange={e => setUser({ ...user, firstname: e.target.value })}
      />

      <input
        value={user.surname || ""}
        onChange={e => setUser({ ...user, surname: e.target.value })}
      />

      <button onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
