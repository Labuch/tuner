class DataFeed {

  _interval = null;

  onFrequencyFound = null;

  start()  {
    this._interval = setInterval(this.foundFrequency.bind(this), 50);
  }

  stop() {
    this._interval.clear();
  }

  foundFrequency() {
    this.onFrequencyFound(Math.random() > .5 ?
    {
      frequency: 440,
      note: 'A4',
      cents: 0
    } : {
      frequency: 444,
      note: 'A4',
      cents: 10
    });
  }
}

export default DataFeed;
