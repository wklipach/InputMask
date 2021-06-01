import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MaskInput from './MaskInput';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <MaskInput mask="+7 (911)-ddd-dd-dd" mask_symbol = "_" />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
