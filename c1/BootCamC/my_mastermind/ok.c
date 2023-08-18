#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>



int main(int argc, char **argv) {
    int defined_attempts = 3;
    int code[4];
    char options;
    char character[4];
    int input;
    int guess[4];
    int wellplaced;
    int misplaced;
    int rounds = 0;

    

    // Combine options -c and -t into a single getopt loop
    while ((options = getopt(argc, argv, "c:t:")) != -1) {
        printf("option i %c\n", options); 
        switch (options) {
            
            case 'c':
                // Process option -c
                for (int i = 0; i < strlen(optarg); i++) {
                    character[i] = optarg[i];
                    code[i] = atoi(&character[i]);
                    printf("code i: %d\n", code[i]);
                }
                break;
            case 't':
                // Process option -t
                defined_attempts = atoi(optarg);
                break;
            default:
                // Handle unrecognized option
                break;
        }
    }

    printf("defined attempts = %d\n", defined_attempts);

    // Generate code if -c option is not provided
    if (optind == argc) {
        srand(time(0));
        for (int i = 0; i < 4; i++) {
            code[i] = rand() % 10;
            printf("code i: %d\n", code[i]);
        }
    }

    printf("Will you find the secret code?\nPlease enter a valid guess\n");

    // ...
}
