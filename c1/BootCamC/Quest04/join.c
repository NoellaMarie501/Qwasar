#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#ifndef STRUCT_STRING_ARRAY
#define STRUCT_STRING_ARRAY
typedef struct s_string_array
{
    int size;
    char** array;
} string_array;
#endif


char* my_join(string_array* param_1, char* param_2)
{
  if (param_1->array == NULL){
    return 0;
  }

  char* result = (char*)malloc(sizeof(char));
 
   for(int i = 0; i < param_1->size; i++){
      strcat(result, param_1->array[i]);
     //result += param_1->array[i];
     if(i < (param_1->size -1)){
       strcat(result, param_2);
       //result += param_2;
     }
    }
    return result;
}

int main() {
  char* words[] = {};
  string_array arr = {3, words};
  printf("%s\n ",(my_join(&arr," ")));
  //printf("%ld\n ",sizeof(words));
  return 0;
}

