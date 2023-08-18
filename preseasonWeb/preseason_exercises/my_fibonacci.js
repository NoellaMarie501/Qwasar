function my_fibonacci(value) {
    if(value <0) return -1;
    var final;
    var a = 0;
    var b = 1;
    var c = 1;
    const table =[a,b];
    while (c < value) {
        c = a + b;
        a = b;
        b = c;
       // console.log(c);
        table.push(c);
    }
    console.log(table);
    var contains = table.includes(value);
    if(contains){
        table.forEach((i, index) =>{
        
         var j = table[index + 1];
        //   if(!j){
        //      j = i;
        //   }
         if(i <= value && j >= value){
            final = i;
           //console.log(final);
            
         } 
       
    })
    }
   
    return final;
}
//my_fibonacci(4)
console.log(my_fibonacci(5));