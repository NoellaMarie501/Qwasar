#include <string.h>
#include <stdio.h>

char* my_strchr(char* str1, char character){
    char *value = "";
    for(int i=0; i < strlen(str1); i++){
        if(str1[i] == character){
           value = &str1[i];
            return value;
        }
    }
   // return value;
}

int main(){
     char str[] = "hello";
     char character = 'o';
    printf("%s\n", my_strchr(str, character));
}