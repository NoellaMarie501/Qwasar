#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    int digits[4];
    int i, n;
    char buffer[5];

    while (1) {
        printf("Enter 4 digits: ");
        n = read(STDIN_FILENO, buffer, 5);

        // Remove newline character from input
        if (buffer[n-1] == '\n') {
            buffer[n-1] = '\0';
            n--;
        }

        // Check if input has exactly 4 characters
        if (n != 4) {
            printf("Invalid input. Please enter 4 digits.\n");
            continue;
        }

        // Check if all characters are digits
        int valid = 1;
        for (i = 0; i < 4; i++) {
            if (buffer[i] < '0' || buffer[i] > '9') {
                valid = 0;
                break;
            }
            digits[i] = buffer[i] - '0';
        }

        if (valid) {
            break;
        } else {
            printf("Invalid input. Please enter 4 digits.\n");
        }
    }

    printf("Digits entered: ");
    for (i = 0; i < 4; i++) {
        printf("%d ", digits[i]);
    }
    printf("\n");

    return 0;
}
