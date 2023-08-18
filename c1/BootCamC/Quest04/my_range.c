#include <string.h>
#include <stdio.h>
#include <stdlib.h>

int* my_range(int start, int end){
    if(start >= end){
        return 0;
    }
    int range = end - start;
    int* array = malloc(range*sizeof(int));//size of int = 4 we multiply by range is the amount of space(elements) kept by malloc since one element will occupy 4bytes
    
    int count = 0;
    for(int i = start; i < end; i++){
        array[count] = i;
        count ++;
    }
    return array;

}

int main(){
    int* i = my_range(3,8);

    for(int j = 0; j < 5; j++){
        printf("value in array = %d\n", i[j]);
    }
    return 0;
}