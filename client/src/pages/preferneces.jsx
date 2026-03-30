import { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import {
  getAllergens,
  getDietaryPreferences
} from "../api/diet";

import {
  addAllergen,
  addDiet
} from "../api/users";

export default function SetupPreferences() {
  const navigate = useNavigate();

  const [allergenOptions, setAllergenOptions] = useState([]);
  const [dietOptions, setDietOptions] = useState([]);

  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allergens = await getAllergens();
        const diets = await getDietaryPreferences();

        console.log("ALLERGENS RESPONSE:", allergens);
        console.log("DIETS RESPONSE:", diets);


        setAllergenOptions(
          allergens.map(a => ({ label: a.name, value: a.name }))
        );

        setDietOptions(
          diets.map(d => ({ label: d.name, value: d.name }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await Promise.all([
        ...selectedAllergens.map(a => addAllergen(a.value)),
        ...selectedDiet.map(d => addDiet(d.value))
      ]);

      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Failed to save preferences");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Set Your Preferences</h1>

      <h3>Allergens</h3>
      <Select
        options={allergenOptions}
        isMulti
        onChange={setSelectedAllergens}
      />

      <h3>Dietary Preferences</h3>
      <Select
        options={dietOptions}
        isMulti
        onChange={setSelectedDiet}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Preferences"}
      </button>

      <button onClick={() => navigate("/")}>
        Skip
      </button>
    </div>
  );
}
