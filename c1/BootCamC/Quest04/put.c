#include <stdio.h>

int main() {
  char str[] = "Hello, world!";
  int i = 0;

  while (str[i] != '\0') {
    putchar(str[i]);
    i++;
  }

  return 0;
}
