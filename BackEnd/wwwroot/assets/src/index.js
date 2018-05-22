import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Template from './template';

import './index.css';


ReactDOM.render(
    <Provider >
      <Template />
    </Provider>,
      document.getElementById('root')
)

