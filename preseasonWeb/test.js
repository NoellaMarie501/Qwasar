function reverse(string){
    var value = string.split("");
    console.log(value.reverse());
    console.log(value);
    if(value == value.reverse()) return true;
    else return false;
   
}

console.log(reverse("car"));

