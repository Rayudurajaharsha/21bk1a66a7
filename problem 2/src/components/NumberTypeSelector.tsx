import React from "react";

interface Props {
  numbersType: string;
  setNumbersType: (type: string) => void;
  fetchNumbers: () => void;
}

const NumberTypeSelector: React.FC<Props> = ({
  numbersType,
  setNumbersType,
  fetchNumbers,
}) => {
  return (
    <div>
      <label>
        Select number type:
        <select
          value={numbersType}
          onChange={(e) => setNumbersType(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="primes">Prime</option>
          <option value="fibo">Fibonacci</option>
          <option value="even">Even</option>
          <option value="rand">Random</option>
        </select>
      </label>
      <button onClick={fetchNumbers} disabled={!numbersType}>
        Fetch Numbers
      </button>
    </div>
  );
};

export default NumberTypeSelector;
