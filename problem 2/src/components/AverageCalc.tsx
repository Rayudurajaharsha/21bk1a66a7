import React from "react";

interface AverageCalculatorProps {
  windowSize: number;
}

interface AverageCalculatorState {
  numbers: number[];
  windowPrevState: number[];
  windowCurrState: number[];
}

class AverageCalc extends React.Component<
  AverageCalculatorProps,
  AverageCalculatorState
> {
  constructor(props: AverageCalculatorProps) {
    super(props);
    this.state = {
      numbers: [],
      windowPrevState: [],
      windowCurrState: [],
    };
  }

  addNumbers(newNumbers: number[]) {
    const uniqueNumbers = [...new Set([...this.state.numbers, ...newNumbers])];
    this.setState({
      numbers: uniqueNumbers,
      windowPrevState: this.state.windowCurrState,
      windowCurrState: uniqueNumbers.slice(-this.props.windowSize),
    });
  }

  calculateAverage() {
    return (
      this.state.windowCurrState.reduce((acc, num) => acc + num, 0) /
      this.state.windowCurrState.length
    );
  }

  render() {
    return (
      <div>
        <p>Window Prev State: {this.state.windowPrevState.join(", ")}</p>
        <p>Window Curr State: {this.state.windowCurrState.join(", ")}</p>
        <p>Average: {this.calculateAverage().toFixed(2)}</p>
      </div>
    );
  }
}

export default AverageCalc;
