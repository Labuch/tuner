import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App';
import AudioContextHandler from './service/audioApi';
import './styles.scss';

ReactDOM.render(<App audioContext = { new AudioContextHandler()}/>, document.getElementById('root'));
