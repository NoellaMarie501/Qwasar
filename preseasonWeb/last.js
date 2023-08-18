function lastWord(str) {
    const match = str.trim().match(/(\w+)\s*$/);
    return match ? match[1] : '';
  }
  
  
  // Test cases
  console.log(lastWord("FOR PONIES")); // Output: "PONIES"
  console.log(lastWord("this        ...       is sparta")); // Output: "sparta"
  console.log(lastWord("  lorem,ipsum  ")); // Output: "ipsum"
  console.log(lastWord("")); // Output: ""
  

//console.log(last_word("word and parameter"))