#include <stdio.h>
#include <string.h>
#include <ctype.h>

char* last_word(char* param_1) {
    char* last = NULL;
    char* current = strtok(param_1, " \t");
    while (current != NULL) {
        last = current;
        current = strtok(NULL, " \t");
    }
    if (last != NULL) {
        printf("%s\n", last);
    }
    return last;
}

int main() {
    char str1[] = "FOR PONIES";
    last_word(str1);  // Output: "PONIES\n"

    char str2[] = "this        ...       is sparta";
    last_word(str2);  // Output: "sparta\n"

    char str3[] = "  lorem,ipsum  ";
    last_word(str3);  // Output: "ipsum\n"

    char str4[] = "";
    last_word(str4);  // Output: "\n"

    return 0;
}
