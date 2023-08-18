#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <string.h>

#define MAX_ATTEMPTS 10

int isValidGuess(int* guess) {
   if (sizeof(guess) / sizeof(int) != 4) {
        return 0;
    }

    for (int i = 0; i < 4; i++) {
        if (guess[i] < 0 || guess[i] > 9) {
            return 0;
        }
    }

    return 1;
}

int countWellPlacedPieces(char *guess, char* secretCode){
    int wellplaced = 0;
    for (int i = 0; i < 4; i++) {
                for (int j = 0; j < 4; j++) { 
                        //printf("wellplaced\n i = %d\n j = %d\n code[i] = %d\n guess[j] = %d\n", i, j, code[i], guess[j]);
                        if((secretCode[i] == guess[j]) && i == j){
                            wellplaced++;
                            //printf("wellplaced\n i = %d\n j = %d\n code[i] = %d\n guess[j] = %d\n", i, j, code[i], guess[j]);
                        }     
                } 
    }
    return wellplaced;
}
int countMisplacedPieces(char *guess, char* secretCode){
    int misplaced = 0;
    for (int i = 0; i < 4; i++) {
                for (int j = 0; j < 4; j++) { 
                        //printf("wellplaced\n i = %d\n j = %d\n code[i] = %d\n guess[j] = %d\n", i, j, code[i], guess[j]);
                        if((secretCode[i] == guess[j]) && i != j){
                            misplaced++;
                            //printf("wellplaced\n i = %d\n j = %d\n code[i] = %d\n guess[j] = %d\n", i, j, code[i], guess[j]);
                        } 
                        
                } 
    }
    return misplaced;
}
int* generateSecretCode(int argc, char** argv){
    int* secretCode = malloc(4);
            srand(time(0));// indicating that we want the code to change with time(as the code is executetd) not 
            //generatting code from random number and stroringin an array each time
            for(int i = 0; i < 4; i++){     
                secretCode[i] =rand()%10;
                printf("code i %d\n", secretCode[i]); 
            }    
    return secretCode;
}

int* input() {
    int* buffer = malloc(4);
    fflush(stdout);
    read(0, buffer, 4);
    return buffer;
}



int main(int argc, char* argv[]) {

     int (*secretCode)[4];// Implement code to generate secret code
     int *secret;
    int code[4];
    int defined_attempts;
    char character[4];
    int wellPlacedPieces = 0;
    int misplacedPieces = 0;
    int rounds = 0;
    char options;

    if(argc == 1){
            defined_attempts = MAX_ATTEMPTS;
            secret = generateSecretCode(argc, argv);    
    }
    else if(argc == 3 && ((strcmp(argv[1], "-c")  == 0))){
        defined_attempts = MAX_ATTEMPTS;
    }
    else if(argc == 3 && ((strcmp(argv[1], "-t")  == 0))){
             //generatting code from random number and stroringin an array each time
            secret = generateSecretCode(argc, argv);
    }
    //Getting the options from the cmd arguments if they are passed
     while ((options = getopt(argc, argv, "c:t:")) != -1) {
        switch (options) {
            case 'c':
                // Process option -c
                for (long unsigned int i = 0; i < strlen(optarg); i++) {
                    character[i] = optarg[i];
                    code[i] = atoi(&character[i]);
                    printf("code i: %d\n", code[i]);
                }
                secretCode = &code;
                break;
            case 't':
                // Process option -t
                defined_attempts = atoi(optarg);
                break;
            default:
                 printf("Invalid Input");
                break;
        }
    }
    
    
    printf("Will you find the secret code?\n");
    printf("Please enter a valid guess\n");
    do{
        
        printf("Round : %d\n", rounds);
       
        
        int* guess = input();
        if (!isValidGuess(guess)) {
            printf("Wrong input!\n");
            continue;
        }
        //comparing between the users guess and the code if same to return number of well placed and misplaced
         wellPlacedPieces = countWellPlacedPieces(guess, secretCode);
         misplacedPieces = countMisplacedPieces(guess, secretCode);
        if(wellPlacedPieces == 4){
            printf("Congratz! You did it!");
            break;
        }
        else{
            printf("wellPlacedPieces = %d\n misplacedPieces = %d\n", wellPlacedPieces, misplacedPieces);
        }

        rounds++;

        
    }while(rounds < defined_attempts);


    if(rounds == defined_attempts){
        printf("Sorry You lost All chances Game Over!");
    }

    free(secretCode);
    return 0;
}
