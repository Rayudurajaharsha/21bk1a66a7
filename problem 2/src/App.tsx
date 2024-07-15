import React, { useState } from "react";
import axios from "axios";
import NumberTypeSelector from "./components/NumberTypeSelector";
import ResponseDisplay from "./components/ResponseDisplay";
import "./App.css";

interface ResponseData {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

const App: React.FC = () => {
  const [numbersType, setNumbersType] = useState<string>("");
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string>("");
  const [numbers, setNumbers] = useState<number[]>([]);

  const baseUrl = "http://localhost:5173/number";

  const fetchNumbers = async () => {
    setError("");
    try {
      const res = await axios.get<{ numbers: number[] }>(
        `${baseUrl}/${numbersType}`,
        { timeout: 500 }
      );
      const fetchedNumbers = res.data.numbers;

      const prevState = [...numbers];
      const newNumbers = [...new Set([...numbers, ...fetchedNumbers])].slice(
        -10
      );
      const avg = (
        newNumbers.reduce((acc, num) => acc + num, 0) / newNumbers.length
      ).toFixed(2);

      const newResponse: ResponseData = {
        windowPrevState: prevState,
        windowCurrState: newNumbers,
        numbers: fetchedNumbers,
        avg: parseFloat(avg),
      };

      setResponse(newResponse);
      setNumbers(newNumbers);
    } catch (err) {
      setError("Error fetching numbers. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <NumberTypeSelector
        numbersType={numbersType}
        setNumbersType={setNumbersType}
        fetchNumbers={fetchNumbers}
      />
      {error && <p className="error">{error}</p>}
      <ResponseDisplay response={response} />
    </div>
  );
};

export default App;
