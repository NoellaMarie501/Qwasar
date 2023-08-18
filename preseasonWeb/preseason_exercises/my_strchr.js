function my_strchr(char, string) {
    
    index = string.indexOf(char);
    console.log(index);
   if(index > 0){
    return string.slice(index+1);
   }
    else{
        return null;
    }
}
console.log(my_strchr("h","fratdddd"));