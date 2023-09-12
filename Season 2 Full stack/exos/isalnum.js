function my_isalnum(character) { 

        if (character.charCodeAt(0) == 32 || character.length == 0) { 
            return 0;
        }
        if((character >= "a" && character <= "z") || (character >= "A" && character <= "Z")  || (character >= 0 && character <= 9)){
            return 1
        }
        else{
            return 0
        }

}

console.log(my_isalnum('0'))