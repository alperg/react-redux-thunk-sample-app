import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import './index.css';
import App from './App';

ReactDOM.render(
  <Grommet theme={hpe}>
    <App />
  </Grommet>,
  document.getElementById('root')
);
