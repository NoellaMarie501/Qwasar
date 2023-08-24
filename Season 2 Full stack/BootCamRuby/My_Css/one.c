#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define CODE_LENGTH 4
#define NUM_COLORS 9

void generate_secret_code(char *secret) {
    srand(time(NULL));
    for (int i = 0; i < CODE_LENGTH; i++) {
        secret[i] = '0' + rand() % NUM_COLORS;
    }
    secret[CODE_LENGTH] = '\0';
}

void evaluate_guess(const char *secret, const char *guess, int *correct, int *misplaced) {
    *correct = 0;
    *misplaced = 0;
    
    int secret_counts[NUM_COLORS] = {0};
    int guess_counts[NUM_COLORS] = {0};
    
    for (int i = 0; i < CODE_LENGTH; i++) {
        if (guess[i] == secret[i]) {
            (*correct)++;
        } else {
            secret_counts[secret[i] - '0']++;
            guess_counts[guess[i] - '0']++;
        }
    }
    
    for (int i = 0; i < NUM_COLORS; i++) {
        *misplaced += (secret_counts[i] < guess_counts[i] ? secret_counts[i] : guess_counts[i]);
    }
}

int main(int argc, char *argv[]) {
    char secret[CODE_LENGTH + 1];
    int attempts = 10;
    
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-c") == 0) {
            if (i + 1 < argc) {
                strncpy(secret, argv[i + 1], CODE_LENGTH);
                secret[CODE_LENGTH] = '\0';
            }
        } else if (strcmp(argv[i], "-t") == 0) {
            if (i + 1 < argc) {
                attempts = atoi(argv[i + 1]);
            }
        }
    }
    
    if (secret[0] == '\0') {
        generate_secret_code(secret);
    }
    
    printf("Welcome to Mastermind!\n");
    printf("Guess the %d-digit secret code.\n", CODE_LENGTH);
    printf("Colors are represented by numbers from 0 to 8.\n");
    printf("You have %d attempts.\n", attempts);
    
    for (int attempt = 1; attempt <= attempts; attempt++) {
        char guess[CODE_LENGTH + 1];
        printf("Attempt %d/%d: ", attempt, attempts);
        scanf("%s", guess);
        
        if (strlen(guess) != CODE_LENGTH) {
            printf("Invalid input. Please enter a %d-digit number.\n", CODE_LENGTH);
            attempt--;
            continue;
        }
        
        int correct, misplaced;
        evaluate_guess(secret, guess, &correct, &misplaced);
        
        if (correct == CODE_LENGTH) {
            printf("Congratulations! You've guessed the secret code!\n");
            break;
        } else {
            printf("Correct positions: %d, Misplaced positions: %d\n", correct, misplaced);
        }
    }
    
    printf("The secret code was: %s\n", secret);
    
    return 0;
}