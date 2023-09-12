function longestCommonSubstring(arr, n) {
  let result = "";
  for (let i = 0; i < arr[0].length; i++) {
    let candidate = "";
    for (let j = i; j < arr[0].length; j++) {
      candidate += arr[0][j];
      let appearsInAll = true;
      for (let k = 1; k < n; k++) {
        if (!arr[k].includes(candidate)) {
          appearsInAll = false;
          break;
        }
      }
      if (appearsInAll && candidate.length > result.length) {
        result = candidate;
      }
    }
  }
  return result;
}

  
  
console.log(longestCommonSubstring(["ab", "bac", "abacabccabcb"], 3)); // "a"
console.log(longestCommonSubstring(["bonjour", "salut", "bonjour", "bonjour"], 4)); // "u"
console.log(longestCommonSubstring(["xoxAoxo", "xoxAox", "oxAox"], 3)); // "oxAox"
