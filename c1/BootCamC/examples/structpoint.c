#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct students{
    int name;
    int description;
}students;

int main(){

    students student = {2, 8};
    students *pointer = &student;

printf("des: %d\n", *((int *)pointer+1));
    return 0;
}
