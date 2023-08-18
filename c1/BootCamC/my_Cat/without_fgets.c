#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int main(int argc,char** argv){
    FILE *open;
    
    char c;
    for (int i = 1; i < argc; i++){
        //since is file name is an argument open file in the for loop and put in a pointer variable
         open = fopen(argv[i], "r");

        //check if file exists means open should not be null if null then file does not exist
         if (open == NULL){
            continue;
         }
        printf("%s\n",argv[i]);
        
        
         //while the variable line has a value print it
        while((c = fgetc(open)) != EOF){
             putchar(c);
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