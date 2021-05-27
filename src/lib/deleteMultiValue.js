import setCharAt from './setCharAt';

function  deleteMultiValue(result, mask, mask_symbol, startIndex, endIndex) {

    if (result.length !== mask.length) {
      return result;
    }
  
    for (let i=0; i<mask.length; i++) {
      if (mask[i] === "d") {
        if (i < endIndex && i >= startIndex) {
          result = setCharAt(result, i, mask_symbol);
        }
      }
    }
    return result;
  }

  export default deleteMultiValue;