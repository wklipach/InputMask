import setCharAt from './setCharAt';
import isInteger from './isInteger';

function checkMask(result, mask, mask_symbol) {

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

export {checkMask};