import axios from "axios";
import React from "react";

interface NumberFetcherProps {
  type: string;
}

interface NumberFetcherState {
  numbers: number[];
}

class NumberFetcher extends React.Component<
  NumberFetcherProps,
  NumberFetcherState
> {
  constructor(props: NumberFetcherProps) {
    super(props);
    this.state = {
      numbers: [],
    };
  }

  fetchNumbers() {
    axios
      .get(`http://20.244.56.144/test/${this.props.type}`)
      .then((response) => {
        this.setState({
          numbers: response.data.numbers,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchNumbers}>Fetch Numbers</button>
        <p>Numbers: {this.state.numbers.join(", ")}</p>
      </div>
    );
  }
}

export default NumberFetcher;
