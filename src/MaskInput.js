import './MaskInput.css';
import useInput from './hook/useInput';
import  React from 'react';



function MaskInput(props) {
  
  const mask = props.mask;
  const mask_symbol = props.mask_symbol;

  const inputProps = useInput({changeMask: mask.replace(/d/gi, mask_symbol), mask: mask, mask_symbol: mask_symbol});

  return (<div>
    <label className="Input-date">Ввод данных:</label>
    <input  {...inputProps} className="Label-date"></input>
    </div>
  );
}

export default MaskInput;
