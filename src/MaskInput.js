import './MaskInput.css';
import  React, { useState } from 'react';

// Creating a custom hook
const mask="+7 (911)-ddd-dd-dd";
const mask_symbol = "_";

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}

function isInteger(num) {

  if (num === '0') {
    return true;
  }

  if (Number(num)) {
    return true;
  }

  return false;
}

function checkMask(result) {

  while (mask.length > result.length) {
    result = result + "_";
  }

  while (result.length > mask.length) {
    result = result.substring(0, result.length - 1);
  }


  for (let i=0; i<mask.length; i++) {

    if (mask[i] !== "d") {
      result = setCharAt(result, i, mask[i]);
    } else {
      if (!isInteger(result[i])) {
        result = setCharAt(result, i, mask_symbol);
      }
    }
  }

   return result;
}


function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [newletter, setNewLetter] = useState(defaultValue);

  function onChange(e) {

    let result = setCharAt(value , newletter.sel, newletter.key);
    result = checkMask(result);
    setValue(result);
    
    window.requestAnimationFrame(() => {
      e.target.selectionStart = newletter.sel+1;
      e.target.selectionEnd = newletter.sel+1;
    });

  }

  function onKeyPress(e){
    
    if (mask.length > e.target.selectionStart) {

      const maskLetter = mask[e.target.selectionStart];
      if (maskLetter === "d") {
        if (isInteger(e.key)) {
           setNewLetter({key: e.key, sel: e.target.selectionStart});
        } else {
          setNewLetter({key: "_", sel: e.target.selectionStart});
        }
      }
      if (maskLetter !== "d") {
        //setNewLetter({key: maskLetter, sel: e.target.selectionStart});
        e.preventDefault();
      }

    } else {
      setNewLetter({key: "", sel: e.target.selectionStart});
    }

  }

  return {
    value,
    onChange,
    onKeyPress
  };
}

function MaskInput() {
  
  const inputProps = useInput(mask.replace(/d/gi, mask_symbol));

  return (<div>
    <label className="Input-date">Ввод данных:</label>
    <input  {...inputProps} className="Label-date"></input>
    <span>Value: {inputProps.value} </span>
    </div>
  );
}

export default MaskInput;
