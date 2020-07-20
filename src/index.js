import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App';
import DataFeed from 'libs/data_feed';
import './styles.scss';

ReactDOM.render(<App dataFeed={new DataFeed()}/>, document.getElementById('root'));
