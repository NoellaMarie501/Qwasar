#include <string.h>
#include <stdio.h>
#include <stdlib.h>

char* my_strdup(char *string){
    int length = strlen(string) +1;

    char *new = malloc(length);

    if(!new){
        return NULL;
    }
    strcpy(new, string);
    return new;
}

int main(){
    char *string = my_strdup("hello world");

    printf("%s\n", string);
    free(string);
}