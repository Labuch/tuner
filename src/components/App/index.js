import React, { Component } from 'react';

class App extends Component {

  state = {
    frequency: 0,
    note: '--',
    cents: 0
  }

  onFrequencyFound({frequency, note, cents}) {
    this.setState({
        frequency: frequency,
        note: note,
        cents: cents
    });
  }

  componentDidMount() {
    this.props.dataFeed.onFrequencyFound = this.onFrequencyFound.bind(this);
    this.props.dataFeed.start();
  }

  render() {
    return (
      <table className="table">
        <tbody>
          <tr>
            <td>Frequency</td><td>{this.state.frequency}</td>
          </tr>
          <tr>
            <td>Note</td><td>{this.state.note}</td>
          </tr>
          <tr>
            <td>Cents</td><td>{this.state.cents}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default App;
