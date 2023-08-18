#include <string.h>
#include <stdio.h>

char* my_strstr(char* string, char* character) {
    if (*character == '\0') {
        return string;
    }
    char* pointer1 = string;
    while (*pointer1 != '\0') {
        char* pointer1_begin = pointer1;
        char* pointer2 = character;
        while (*pointer1 != '\0' && *pointer2 != '\0' && *pointer1 == *pointer2) {
            pointer1++;
            pointer2++;
        }
        if (*pointer2 == '\0') {
            return pointer1_begin;
        }
        pointer1 = pointer1_begin + 1;
    }
    return NULL;
}

int main(){
     char str[] = "helljo";
    char character[] = "j";
    
     
    printf("%s\n", my_strstr(str, character));
}


