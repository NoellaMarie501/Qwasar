#include <string.h>
#include <stdio.h>
#include <stdlib.h>

int main(int noel, char **me){
    printf("argc = %d\n", noel);
    if(noel > 3 || noel < 3){
        printf("enter correct number of arguments\n");
        return 1;
    }
    
    char x = 'o';
    char y = '|';
    char z = '-';
    int argv;
    
    int columns = atoi(me[1]);
    int rows = atoi(me[2]);
    printf("rows = %d\n", rows);
   
    return 0;
}
    
   
    