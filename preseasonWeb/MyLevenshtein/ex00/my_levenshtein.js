function my_levenshtein(string1, string2){
    if(string1.length != string2.length){
        return -1;
    }
    const first = string1.split("");
    const second = string2.split("");
    var count = 0
    first.forEach((i, index) => {
            const j = second[index];
            if(i != j){
                count +=1;
               }
        
    });
   
    return count;

}

console.log(my_levenshtein("", ""));

