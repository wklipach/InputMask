import setCharAt from './setCharAt';

function insertpastevalue(pastestring, valuestring, selstart, mask) {
    let j = 0;
    for (let i = selstart; i < valuestring.length; i++) {
  
      if (pastestring.length<=j) {
        return valuestring;
      }
  
      if (mask[i] === 'd') {
        valuestring = setCharAt(valuestring,i,pastestring[j]);
        j++; 
      }
       
    }
    return valuestring;
  } 
  
  export  default insertpastevalue;