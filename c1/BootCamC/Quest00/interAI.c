#include <stdio.h>

int main() {
  int num = 42;
  char str[] = "world";

  char result[50];
  sprintf(result, "Hello %s! The answer is %d.", str, num);

  printf("%s\n", result);

 
  return 0;
}
