import { useState } from 'react';
import insertpastevalue from '../lib/insertpastevalue';
import setCharAt from '../lib/setCharAt';
import isInteger from '../lib/isInteger';
import isNotEmpty from '../lib/isNotEmpty';
import onlyinteger from '../lib/onlyinteger';
import deleteMultiValue from '../lib/deleteMultiValue';
import checkMask from '../lib/checkMask';


function useInput(defaultValue) {
    const [value, setValue] = useState(defaultValue.changeMask);
    const [newletter, setNewLetter] = useState('');
    const [offsetcursor, setOffsetCursor] = useState(1);
    const mask=defaultValue.mask;
    const mask_symbol = defaultValue.mask_symbol;
  
    function onChange(e) {
  
      let result = setCharAt(value , newletter.sel, newletter.key);
      result = checkMask(result, mask, mask_symbol);
      setValue(result);
      animation(e, newletter.sel + offsetcursor);
    }
  
    function animation(e, cursor) {
        window.requestAnimationFrame(() => {
            e.target.selectionStart = cursor;
            e.target.selectionEnd = cursor;
        });
    }
  
  
    function onPaste(e) {
      const pastevalue = e.clipboardData.getData('Text');
      if (!isNotEmpty(pastevalue)) {
        return;
      }
  
      const selstart = e.target.selectionStart;
      //формируем последовательность цифр из строки
      const strIntegerPasteValue = onlyinteger(pastevalue);
      const newvalue = insertpastevalue(strIntegerPasteValue, value, selstart, mask);
  
      if (!isNotEmpty(newvalue)) {
        return;
      }
      setValue(newvalue);
     }
  
  
    function onKeyDown(e) {
     if (e.code === "Backspace") {
        setOffsetCursor(0);
        setNewLetter({key: "", sel: e.target.selectionStart-1});
        return;
      }
  
      if (e.code === "Delete") {
        const selstart = e.target.selectionStart;
        const selend = e.target.selectionEnd;
  
        if (selstart !== selend) {
          // debugger;
          const res = deleteMultiValue(value, mask, mask_symbol, selstart, selend);
          setNewLetter({key: "", sel: selstart});
          setValue(res);
          return;
        }
        
        if (selstart === selend) {
          setOffsetCursor(0);
          setNewLetter({key: "", sel: e.target.selectionStart});
          return;
        }
  
      }
      
    }
  
    function onKeyPress(e){
  
      setOffsetCursor(1);
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
          setNewLetter({key: maskLetter, sel: e.target.selectionStart});
          setOffsetCursor(mask.slice(e.target.selectionStart).indexOf("d"));
        }
  
      } else {
        setNewLetter({key: "", sel: e.target.selectionStart});
      }
  
    }
  
    return {
      value,
      onChange,
      onKeyPress,
      onKeyDown,
      onPaste
    };
  }

  export default useInput;