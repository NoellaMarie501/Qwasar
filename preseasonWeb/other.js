function missing(array){
    var array1 = array.sort();
    var array2 = [];
    for(i = 0, j = i+1; i < array1.length, j < array1.length; i++, j++) {
        var value = (array1[i]+array[j])/2;
        if((Math.floor(value) != array1[i]) && (Math.ceil(value) !=array1[j])){
            array2.push(Math.ceil(value));
        }
      // if(value < ){}
    }
    return array2;
}
console.log(missing([0,3,1,5,7]))
