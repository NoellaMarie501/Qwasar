#include <stdbool.h>

typedef struct s_integer_array {
  int size;
  int* array;
} integer_array;

bool my_is_sort(integer_array* param_1) {
  int n = param_1->size;
  int* arr = param_1->array;
  bool is_ascending = true;
  bool is_descending = true;

  for (int i = 1; i < n; i++) {
    if (arr[i] < arr[i-1]) {
      is_ascending = false;
    }
    if (arr[i] > arr[i-1]) {
      is_descending = false;
    }
  }

  return is_ascending || is_descending;
}
