function my_capitalize(str) {
    let leadingSpaces = str.length - str.trimStart().length;
    let firstChar = str.trimStart().charAt(0);
    if (/^[a-zA-Z0-9]+$/.test(firstChar)) {
      firstChar = firstChar.toUpperCase();
    }
    let rest = str.slice(1).toLowerCase();
    return ' '.repeat(leadingSpaces) + firstChar + rest;
  }
  

const input = "    AbcE     Fgef1    ";
const output = my_capitalize(input);
console.log(output); // 'Abce fgef1'
