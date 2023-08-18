#include <stdio.h>

int my_string_formatting(  char firstname[], char lastname[], int age){
    char* string;

    sprintf(string, "Hello, my name is %s %s, I'm %d.", firstname, lastname, age);
    printf("%s\n", string);
    return 0;
}
int main(){
    char firstname[] = "John";
    char lastname[] = "Doe";
    int age = 25;
    
    my_string_formatting(firstname, lastname, age);
   
    
    return 0;
}