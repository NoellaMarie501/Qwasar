function transformString(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      if (charCode >= 97 && charCode <= 121) { // lowercase letters
        result += String.fromCharCode(charCode + 1);
      } else if (charCode === 122) { // 'z'
        result += 'a';
      } else if (charCode >= 65 && charCode <= 89) { // uppercase letters
        result += String.fromCharCode(charCode + 1);
      } else if (charCode === 90) { // 'Z'
        result += 'A';
      } else { // not a letter
        result += str[i];
      }
    }
    return result;
  }

  
  console.log(transformString(""));