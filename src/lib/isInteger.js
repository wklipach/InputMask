function isInteger(num) {

    if (num === '0') {
      return true;
    }
  
    if (Number(num)) {
      return true;
    }
  
    return false;
  }

  export default isInteger;