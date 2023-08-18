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

#ifndef STRUCT_INTEGER_ARRAY
#define STRUCT_INTEGER_ARRAY
typedef struct s_integer_array
{
    int size;
    int* array;
} integer_array;
#endif


integer_array* my_count_on_it(string_array* param_1)
{
    int count;
    integer_array* new_array = malloc(sizeof(integer_array));
    new_array->size = param_1->size;
    new_array->array = malloc(param_1->size * sizeof(int));
    for(int i = 0; i < param_1->size; i++){
        count = 0;
        for(int j = 0; j < strlen( param_1->array[i]); j++){
            count++;
        }

        new_array->array[i] = count;
    }
    return new_array;
}


int main() {
  char* words[] = {"abc", "def", "gh"};
  string_array arr = {3, words};
  my_count_on_it(&arr);
  return 0;
}

