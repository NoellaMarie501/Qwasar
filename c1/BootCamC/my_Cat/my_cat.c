#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
int main(int argc,char** argv){
    FILE *open;
    char line;
    for (int i = 1; i < argc; i++){
        //since is file name is an argument open file in the for loop and put in a pointer variable
         open = fopen(argv[i], "r");

        //check if file exists means open should not be null if null then file does not exist
         if (open == NULL){
            continue;
         }
         //while the variable line has a value print it
         while (fscanf(open, "%c", &line) == 1) {
                if (isspace(line)) {
                    printf("\n");
                    continue;
                }
                printf("%c", line);
        }
        //check if there was an error reading the file
        if(ferror(open)) {
             printf("Error in reading from file \n");
        }

         //check if the file has ended successfully
        if(feof(open)){
            printf("file %s reading ended\n ", argv[i]);
         }

        
        //close the file
        fclose(open);
    }
    return 0;

}