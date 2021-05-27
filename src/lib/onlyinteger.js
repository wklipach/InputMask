import isInteger from './isInteger';

function onlyinteger(value) {
    let returnStr = '';  
    for (let i=0; i<value.length; i++) {
      if (isInteger(value[i])) {
        returnStr = returnStr + value[i];
      }
    }
    return returnStr;
}

export default onlyinteger;