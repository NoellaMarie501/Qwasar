#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct students{
    int mat;
    int age;
    
}students;

int main(){
    students student[3];

    for(int i=0; i < 3; i++){
        printf("Entering student %d\n details\n", i);
        printf("Enter student %d mat\n", i);
        scanf("%d", &student[i].mat);
        printf("Enter student %d age\n", i);
        scanf("%d", &student[i].age);
        
    }
    for(int i=0; i < 3; i++){
        printf("student %d\n details\n", i);
        printf("Student %d mat: %d\n",i, student[i].mat);
        printf("Student %d age: %d\n",i, student[i].age);
        }
    
return 0;
   
    
}