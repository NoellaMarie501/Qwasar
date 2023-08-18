#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) {
    int count[256] = {0}; // Initialize count array to 0
    unsigned  j;
    int i;
    // Iterate through each string passed as a command-line argument
    for (i = 1; i < argc; i++) {
        // Iterate through each character in the string
        for (j = 0; j < strlen(argv[i]); j++) {
            // Increment the count of the character
            count[(int)argv[i][j]]++;
        }
    }

    // Iterate through the count array and print the count of each character
    for (i = 0; i < 256; i++) {
        if (count[i] > 0) {
            printf("%c:%d\n", (char)i, count[i]);
        }
    }

    return 0;
}
