function reverse(string){
    var newstring = string.split("");
    for (let i = 0, j = string.length - 1; i < j; i++, j--) {
       let temp = newstring[i];
        newstring[i] = newstring[j];
        newstring[j] = temp;
    }
    return newstring.join();
}

console.log(reverse("noella"));