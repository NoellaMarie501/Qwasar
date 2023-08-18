#include <stdio.h>
#include <string.h>

char* my_strchr(char* str, char c) {
    while (*str != '\0') {
        if (*str == c) {
            char* last_match = str;
            str++;
            while (*str != '\0') {
                if (*str == c) {
                    last_match = str;
                }
                str++;
            }
            return last_match;
        }
        str++;
    }
    return NULL;
}



int main(){
     char str[] = "hello";
     char character = 'e';
    printf("%s\n", my_strchr(str, character));
}