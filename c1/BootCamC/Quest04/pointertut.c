#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(){

    int numbers[] = {0,1,2,3,4,5,6,7};
    char letters[] = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w'};
    char arrays[3][8] = {"noel","noella","no"};
    char character = 'C';
    char string[] = "this is a string"



    int* p = &numbers[0];

    printf("Number[2] %d\n", *((p+2)-1));
}