import React from "react";

interface Props {
  response: {
    windowPrevState: number[];
    windowCurrState: number[];
    numbers: number[];
    avg: number;
  } | null;
}

const ResponseDisplay: React.FC<Props> = ({ response }) => {
  if (!response) return null;

  return (
    <div className="response">
      <h2>Response:</h2>
      <p>
        <strong>Previous Window State:</strong>{" "}
        {response.windowPrevState.join(", ")}
      </p>
      <p>
        <strong>Current Window State:</strong>{" "}
        {response.windowCurrState.join(", ")}
      </p>
      <p>
        <strong>Fetched Numbers:</strong> {response.numbers.join(", ")}
      </p>
      <p>
        <strong>Average:</strong> {response.avg}
      </p>
    </div>
  );
};

export default ResponseDisplay;
