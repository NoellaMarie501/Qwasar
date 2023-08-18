#include <stdio.h>

int len(char string[]) {
    int i = 0;
    while (string[i] != '\0') {
        i++;
    }
    return i;
}
int main() {
    char c[] = "fine";
    printf("The length of the string is %d\n the string index %d\n" , len(c));
    return 0;
}

