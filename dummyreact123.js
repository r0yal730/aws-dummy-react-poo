import React, { useState } from "react";
import { API } from "aws-amplify";
import awsconfig from "./aws-exports";

API.configure(awsconfig);

function App() {
  const [inputValue, setInputValue] = useState("");
  const [rankValue, setRankValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await API.post("myAPI", "/items", {
        body: { input: inputValue, rank: rankValue },
      });
      setLoading(false);
      setInputValue("");
      setRankValue("");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("An error occurred while submitting the form.");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setRankValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add an Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Rank:
          <select value={rankValue} onChange={handleSelectChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <br />
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
