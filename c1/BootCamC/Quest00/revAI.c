#include <stdio.h>
#include <string.h>

int main() {
  char str[100], revStr[100];
  int i, j, len;

  printf("Enter a string: ");
  scanf("%[^\n]s", str);

  len = strlen(str);

  for (i = 0, j = len - 1; i < len; i++, j--) {
    revStr[i] = str[j];
  }

  revStr[len] = '\0';

  printf("Reversed string: %s\n", revStr);

  return 0;
}
