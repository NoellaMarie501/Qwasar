function split(string, separator) {
    var splited = [];

    if(string.length != 0){
            var new_string = "";
        for (var i = 0; i < string.length; i++) {
            if(string[i] === separator){
                splited.push(new_string);
                new_string = "";
            }
            else{
                new_string += string[i];
            }
        }
        splited.push(new_string); // add the last substring to the array
        //console.log("splited", splited);
    }
   
    return splited;
}

console.log(split("",""));


//console.log()