#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int main(int argc,char** argv){
    FILE *open;
    char line[1024];
    int c;
    for (int i = 1; i < argc; i++){
        //since is file name is an argument open file in the for loop and put in a pointer variable
         open = fopen(argv[i], "r");

        //check if file exists means open should not be null if null then file does not exist
         if (open == NULL){
            continue;
         }
         int results;
         //while the variable line has a value print it
        while((results = fscanf(open, " %[^\n\r]", line)) != EOF){
            
            if (results == 0){
                printf("\n");
            }
            else
            printf("%1s\n", line);
            
        }
        //close the file
        fclose(open);
    }
    return 0;

}