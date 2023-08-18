#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct students{
    char *name;
}students;

char* delegate(){
    students delegates;
    delegates.name = "edwige";
    return delegates.name;
}

int main(){
    students student1;
    students student2;
    student1.name = "noella";
    student2.name = "marie";

    printf("%s\n%s\n",student1.name,student2.name);

    printf("%s\n", delegate());
    printf("size %ld\n", sizeof(long int));

    return 0;
}