function duplicate(string1, len1, string2, len2){
    let outer 
    let inner
    let longer
    let shorter 
    if(len1 == len2){
        outer = string1;
        inner = string2;
        shorter = longer = len1
    }
    else{
        let array1 = [string1, string2];
        let array2 = [len1, len2];
        longer = len1 >= len2 ? len1 : len2;
        shorter = len1 <= len2 ? len1 : len2;
        outer = array1[array2.indexOf(longer)];
        inner = array1[array2.indexOf(shorter)];
    }
   
    let dup = [];

    for(let i = 0; i < longer; i++){
        for(let j = 0; j < shorter; j++){
            if(outer[i] == inner[j]){
                dup.push(outer[i]);
            }
        }
    }

    console.log(dup);
}


duplicate( [1, 2, 10, 15] ,4,[2, 20, 40, 70],4)