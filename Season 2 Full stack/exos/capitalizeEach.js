function capitalizeWords(str) {
    // Split the string into an array of words
    const words = str.split(' ');
  
    // Loop through each word and capitalize the first letter
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length > 0) {
        words[i] = word[0].toUpperCase() + word.slice(1).toLowerCase();
      }
    }
  
    // Join the words back together into a string and return it
    return words.join(' ');
  }


console.log(capitalizeWords("a FiRSt LiTTlE TESt")); // "A First Little Test"
console.log(capitalizeWords("__second Test A Little Bit   Moar Complex")); // "__second Test A Little Bit   Moar Complex"
console.log(capitalizeWords("   But... This iS not THAT COMPLEX")); // "   But... This Is Not That Complex"
console.log(capitalizeWords("     Okay, this is the last 1239809147801 but not    the least    t")); // "     Okay, This Is The Last 1239809147801 But Not    The Least    T"
console.log(capitalizeWords("")); // ""
