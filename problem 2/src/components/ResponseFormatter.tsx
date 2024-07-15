import React from "react";

interface ResponseFormatterProps {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

class ResponseFormatter extends React.Component<ResponseFormatterProps, {}> {
  render() {
    return (
      <div>
        <p>Window Prev State: {this.props.windowPrevState.join(", ")}</p>
        <p>Window Curr State: {this.props.windowCurrState.join(", ")}</p>
        <p>Numbers: {this.props.numbers.join(", ")}</p>
        <p>Average: {this.props.avg.toFixed(2)}</p>
      </div>
    );
  }
}

export default ResponseFormatter;
