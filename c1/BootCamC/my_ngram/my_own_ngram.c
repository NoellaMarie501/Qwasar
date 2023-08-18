#include <string.h>
#include <stdio.h>
#include <stdlib.h>
char* removeDuplicate(char str[])
{
    // Used as an index in the modified string
    int index = 0;
 
    // Traverse through all characters
    for (int i = 0; i < strlen(str); i++) {
        // Check if str[i] is present before it
        int j;
        for (j = 0; j < i; j++) {
            if (str[i] == str[j])
                break;
        }
 
        // If not present, then add it to the result.
        if (j == i)
            str[index++] = str[i];

    }
 
    // Add null character at the end to terminate the string
    str[index] = '\0';
 
    return str;
}

int main(int argc, char* argv[]){

    char string[256];
   
    for(int i = 1; i < argc; i++){
      strcat(string,argv[i]);
    }
    
    char* result = removeDuplicate(string); 
    // printf("%s\n", result);
     int number;
    for(int j = 0; j < strlen(result); j++){
        number = 0;
         //printf("%c : %d\n", result[j], number);
        for(int i = 0; i < strlen(string); i++){
            if(result[i] == string[j]) number++;
        }
       printf("%c : %d\n", result[j], number);
    }
     printf("result = %s, string = %s\n", result, string);
    return 0;
}