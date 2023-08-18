#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
    if (argc != 3) {
        printf("put in the lenght and width of square\n");
        return 1;
    }

    int length = atoi(argv[1]);
    int width = atoi(argv[2]);

    if (length <= 0 || width <= 0) {
        printf("Please input corect lenght and width\n");
        return 1;
    }
   
    //top row

        //check if values are 1 and 1 then print just a "o" and return using go to
        if(length == 1 && width == 1) {
            printf("o\n");
        goto one;
            
        }
        //if different values from one then print the top row
        printf("o");
        for (int i = 0; i < length - 2 ; i++) {
            
            printf("-");
        }
        printf("o\n");
  
    // Print middle rows
    //chacking if length > 1 so we have more columns if not just go ahead and print buttom row
    if(length > 1) {
        
        for (int i = 0; i < width - 2; i++) {
            printf("|");
            for (int j = 0; j < length - 2; j++) {
                printf(" ");
            }
            printf("|\n");
        }
    }
    // Print bottom row
    if(width > 1) {
        printf("o");
        for (int i = 0; i < length - 2 ; i++) {
            
            printf("-");
        }
        printf("o\n");
    }
     
one:
    return 0;
}
