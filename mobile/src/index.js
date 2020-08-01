import React from 'react';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Unrecongnized WebSocket']);

import Routes from './routes';

function App() {
  return <Routes />;
}

export default App;
