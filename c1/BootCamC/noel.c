#include <stdio.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>
#include <unistd.h>

#define ALL_CODE_SIZE 4

int *get_round_numbers()
{
    int *coding = malloc(ALL_CODE_SIZE * sizeof(int));
    int usedNumbers[9] = {0};

    srand(time(NULL));

for (int i = 0; i < ALL_CODE_SIZE; i++)
{
    int randomNumber = rand() % 10; 

    /*
    This while loop ensures that each integer in the array is unique.
    If the randomly generated number is already in the array, a new number is generated.
    */
    while (usedNumbers[randomNumber] == 1)
    {
        randomNumber = rand() % 10;
    }
    coding[i] = randomNumber;
    usedNumbers[randomNumber] = 1;
}
return coding;}

int get_numbers(char *string)
{
    int str_length = strlen(string); // get the length of the input string
    for (int i = 0; i < str_length; i++) // loop through each character in the string
    {
        if (!(string[i] >= '0' && string[i] <= '9')) // check if the character is not a digit
            return 1; // return 1 if the string contains non-digit characters
    }
    return 0; // return 0 if the string only contains digits
}

void stringToInt(int *param_1, char *param_2)
{
    int i;
    char charBuffer[2] = {
        0};  // create a buffer to store each character of the input string
    for (i = 0; param_2[i] != '\0'; i++) // loop through each character in the string until the null character is reached
    {
        charBuffer[0] =
            param_2[i];  // store the current character in the buffer
        param_1[i] = atoi(charBuffer);  // convert the character to an integer
                                        // and store it in the output array
    }
}

int main(int argc, char **argv)
{
    int *userCode = malloc(
        ALL_CODE_SIZE * sizeof(char));  // Allocate memory for hidden_code array
    int attemptsRemaining = 10,
        rounds = 0;  // Initialize variables for number of attempts and rounds
    int *prediction = malloc(ALL_CODE_SIZE * sizeof(int)); // Allocate memory for prediction array
    
    if (argc > 2) // Check if there are command-line arguments
    {
        if((get_numbers(argv[2]) != 0) || (strlen(argv[2]) != 4)){ // Check if the argument is a 4-digit number
            printf("Wrong input %s passed\n", argv[2]); // Print error message
            userCode = get_round_numbers();  // Generate a random 4-digit number
        }
        else
        {
            if(strcmp(argv[1], "-c") == 0)  // Check if the first argument is '-c'
                stringToInt(
                    userCode,
                    argv[2]);  // Convert the input argument to an integer array
                               // and store it in hidden_code

            else if(strcmp(argv[1], "-t") == 0){ // Check if the first argument is '-t'
                attemptsRemaining =
                    atoi(argv[2]);  // Convert the input argument to an integer
                                    // and store it in my_new_number_generate
                if (attemptsRemaining >
                    10)  // Check if the number of attempts is greater than 10
                    attemptsRemaining = 10;  // Set the number of attempts to 10
                                             // if it is greater than 10
            }
        }
    }

    else
        userCode = get_round_numbers();

    printf("Will you find the secret code?\n");
    printf("Please enter a valid guess\n");

    while (attemptsRemaining > 0)
    {
        printf("\nRound %d\n", rounds);
        rounds++;

        // Variables to track the number of well placed and misplaced numbers
        int correctPositions = 0, mismatchedNumbers = 0;

        // Allocate memory for user input
        char *buffering = malloc(5 * sizeof(char));
        if (buffering == NULL)
        {
            printf("Memory Allocation failed!\n");
            return 1;
        }// Get user input and check if it is valid
        ssize_t n = read(0, buffering, 5);
        if (n <= 4)
        {
            attemptsRemaining--;
            break;
        }
        else
            buffering[n] = '\0';

        // Convert user input to integers and check if it is valid
        int my_int_num = atoi(buffering);
        if (my_int_num == 0)
        {
            printf("Wrong input passed.\n");
            attemptsRemaining--;
            continue;
        }
        else
            stringToInt(prediction, buffering);

        // Compare user input with the hidden code and calculate the number of
        // well placed and misplaced numbers
        for (int i = 0; i < ALL_CODE_SIZE; i++)
        {
            if (userCode[i] == prediction[i])
                correctPositions++;
            else
            {
                for (int j = 0; j < ALL_CODE_SIZE; j++)
                {
                    if (userCode[i] == prediction[j] && i != j)
                    {
                        mismatchedNumbers++;
                        break;
                    }
                }
            }
        }
        // Check if the user guessed the code correctly and end the game if they
        // did
        if (correctPositions == 4)
        {
            printf("Congratz! You did it!\n");
            break;
        }
    else
        printf("Well placed pieces: %d\nMisplaced pieces: %d\n",
               correctPositions, mismatchedNumbers);
    attemptsRemaining--;

    // Free dynamically allocated memory
    free(buffering);
}
free(userCode);
free (prediction);
return 0;
}

/*
printf("Welcome to the guessing game!\n");
printf("The computer has generated a secret code consisting of 4 digits.\n");
printf("Each digit can be a number from 0 to 9.\n");
printf("You have %d attempts to guess the code.\n", attempts);
printf("After each guess, the computer will tell you how many digits are correctly placed and how many are misplaced.\n");
printf("To make a guess, enter a 4-digit code and press Enter.\n");
printf("For example, if you want to guess the code '1234', type '1234' and press Enter.\n");
     */