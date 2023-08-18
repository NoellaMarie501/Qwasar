#include <stdio.h>

void my_putstr(char* param_1) {
  while (*param_1) {
    putchar(*param_1++);
    
  }
}

int main() {
  char str[] = "Hello, world!";
  my_putstr(str);
  return 0;
}
