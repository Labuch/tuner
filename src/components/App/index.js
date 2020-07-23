import React, { Component } from 'react';
import Jauge from '../Jauge/jauge'
class App extends Component {

  state = {
    frequency: 0,
    note: '--',
    cents: 0,
    isRecording: false,
  }

  onFrequencyFound({ frequency, note, cents }) {
    if (frequency > 0) {
      this.setState({
        frequency: frequency,
        note: note,
        cents: cents
      });
    }
  }

  handleClick = () => {
    if (this.state.isRecording) {
      this.setState({ isRecording: false })
      this.props.audioContext.stop();
    }
    else {
      this.setState({ isRecording: true })
      this.props.audioContext.init();
      this.props.audioContext.start();
    }
  }

  componentDidMount() {
    this.props.audioContext.onFrequencyFound = this.onFrequencyFound.bind(this);
  }



  render() {
    return (
      <div className='tuner-container'>
        <Jauge cents={this.state.cents} />
        <div className='tuner-detail'>
          <div>{this.state.note}</div>
          <div>Frequency : {this.state.frequency}Hrz  {this.state.cents} cents </div>
        </div>
        <button className="btn btn-primary" onClick={this.handleClick}>{this.state.isRecording ? 'stop' : 'start'}</button>
      </div>
    );
  }
}

export default App;
