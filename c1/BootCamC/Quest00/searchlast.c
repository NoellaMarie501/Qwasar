#include <string.h>
#include <stdio.h>

char* my_strchr(char* str1, char character){
    char *value = "";
    for(int i = (strlen(str1) -1 ); i > -1; i--){
        if(str1[i] == character){
           value = &str1[i];
            return value;
        }
    }
    
    return 0;
}

int main(){
     char str[] = "hello";
     char character = 'l';
    printf("%s\n", my_strchr(str, character));
}