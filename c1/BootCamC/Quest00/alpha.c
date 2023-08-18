#include <stdio.h>
#include <ctype.h>

int my_isalpha(char c){
    if((c >= 'a' & c <= 'z') || (c >= 'A' & c <= 'Z')) return 1;
    else return 0;
}
int main()
{
    char c = "d";
  printf("%c\n", my_isalpha(c));
    return 0;
}
