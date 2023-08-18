#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>
#include <stdbool.h>

//function to print rounds
void print_round(int rounds){
            printf("---\n");
            printf("Round : %d\n", rounds);
}

//function to check for duplicates in user's guesses
int hasDuplicate_guess(int arr[4]) {
    for (int i = 0; i < 4 - 1; i++) {
        for (int j = i + 1; j < 4; j++) {
            if (arr[i] == arr[j]) {
                return 1; // Duplicate found
            }
        }
    }
    return 0; // No duplicates found
}
//function to check for duplicates in the Code 
int hasDuplicate_code(int* code) {
    for (int i = 0; i < 4 - 1; i++) {
        for (int j = i + 1; j < 4; j++) {
            if (code[i] == code[j]) {
                printf("duplicate code digits entered\n");
                return 1; // Duplicate found
            }
        }
    }
    return 0; // No duplicates found
}
//function to get Code if entered as a flag
int *getcode(char* pointer){
   int* code = malloc(sizeof(int)*4);
   char character[4]; 
   //converting code to integers
   for (long unsigned int i = 0; i < strlen(pointer); i++) {
        if(atoi(&pointer[i]) == 0) {
                return NULL;
        }
        if(pointer[i] == '9'){
            printf("Code should not contain 9!\n");
            return NULL;
        }
        character[i] = pointer[i];
        code[i] = atoi(&character[i]);    
    }
    if(hasDuplicate_code(code)) return NULL;
    return code;
 }
//function to generateCode if no code is entered as flag
int *generateCode(){
     srand(time(0));
     int *code = malloc(sizeof(int)*4);
            for (int i = 0; i < 4; i++) {
                int new_num;
                int is_duplicate;
                do {//generating code while avaoiding duplicate digits
                    is_duplicate = 0;
                    new_num = rand() % 9;
                    for (int j = 0; j < i; j++) {
                        if (code[j] == new_num) {
                            is_duplicate = 1;
                            break;
                        }
                    }
                } while (is_duplicate);
                code[i] = new_num;
            }
    return code;
}
 // function to get well placed peices in user's guess
 int get_wellplaced(int *code, int guess[]){
    int wellplaced = 0;
        for (int i = 0; i < 4; i++) {
                for (int j = 0; j < 4; j++) { 
                        if((code[i] == guess[j]) && i == j){
                            wellplaced++;
                        }    
                } 
        }
    return wellplaced;
 }
 //function to get misplaced peices in user's guess
 int get_misplaced(int *code, int guess[]){
    int misplaced = 0;
        for (int i = 0; i < 4; i++) {
                for (int j = 0; j < 4; j++) { 
                         if((code[i] == guess[j]) && i != j){
                            misplaced++; 
                        }   
                } 
        }
    return misplaced;
 }

//checking for appropriate code length
int code_lenght(char *argv){
    if(strlen(argv) != 4){
            printf("Wrong Code length should be 4 digits\n");
            return 0;
    }
    return 1;
}
//Getting or checking for the flag indicating entered code
int* get_c_flag(int argc, char **argv){
    int* code = malloc(sizeof(int)*4);
    if(argc == 1){// no code entered as flag
            code = generateCode();
    }
    if(argc == 3 && ((strcmp(argv[1], "-c")  == 0))){//c flag only entered for code
        if(!code_lenght(argv[2]))return 0;
        code = getcode(argv[2]);
        if(code == NULL){
            printf("Wrong Code\n");
            return 0;
        } 
    }
    else if(argc == 3 && ((strcmp(argv[1], "-t")  == 0))){
           code = generateCode();// t only flag entered for attempts so generate code
    }
    if(argc == 5 && ((strcmp(argv[1], "-c")  == 0)) && ((strcmp(argv[3], "-t")  == 0))){//both flags entered c first
        if(!code_lenght(argv[2])) return 0;
        code = getcode(argv[2]);
        if(code == NULL){
            printf("Wrong Code\n");
            return 0;
        } 
    }
    else if(argc == 5 && ((strcmp(argv[1], "-t")  == 0)) && ((strcmp(argv[3], "-c")  == 0))){//both flags entered t first
        if(!code_lenght(argv[4])) return 0;
        code = getcode(argv[4]);
        if(code == NULL){
            printf("Wrong Code\n");
            return 0;
        } 
    }
    else{
         printf("Wrong Input format\n");
         return 0;
    } 
    return code;
}
//Getting or checking for the flag indicating entered defined attempts
int get_t_flag(int argc, char **argv){
    int defined_attempts;
    if(argc == 1){// no flags
        defined_attempts = 10;
    }
    else if(argc == 3 && ((strcmp(argv[1], "-c")  == 0))){// only c flag
        defined_attempts = 10;
    }
    else if(argc == 3 && ((strcmp(argv[1], "-t")  == 0))){// only t flag
           defined_attempts = atoi(argv[2]);
    }
    if(argc == 5 && ((strcmp(argv[1], "-c")  == 0)) && ((strcmp(argv[3], "-t")  == 0))){//both flags entered but c first
        defined_attempts = atoi(argv[4]);
    }
    else if(argc == 5 && ((strcmp(argv[1], "-t")  == 0)) && ((strcmp(argv[3], "-c")  == 0))){// both flags entered but t first
        defined_attempts = atoi(argv[2]);
    }
    
    return defined_attempts;
}

int main(int argc, char **argv) {
    int defined_attempts, wellplaced, misplaced, rounds = 0, guess[4], *code;
    defined_attempts = get_t_flag(argc, argv), code = get_c_flag(argc, argv);
    if(!code || !defined_attempts) return 0;//if no code or defined attempts received 
    printf("Will you find the secret code?\nPlease enter a valid guess\n");
        int valid_in = 1;
    do {
        int valid = 1;
        if(valid_in && valid){
         print_round(rounds);
        }
        valid_in = 1;
        char *buffer = malloc(5 * sizeof(int));
        if (buffer == NULL) return 1;
        ssize_t n;
        int i = 0, incr;
        while ((n = read(0, &buffer[i], 1)) > 0) {//Reading input from user 
             if (buffer[i] == '\n') {//checking for newline character
                 buffer[i] = '\0';
                 break;
             }
             if(buffer[i-1] == '\\' && buffer[i] == 'n'){
                 buffer[i - 1] = '\0';
                 break;
             }
             i++;
        }
        if (n <= 0) {//if ctrl D detected 
             printf("No input!\n");
             return 0;
        }
        wellplaced = 0, misplaced = 0;
        if (strlen(buffer) < 4) {//if user's guess if < 4
            valid_in = 0;
            printf("Wrong input! Please enter 4 digits.\n");
            continue;
        }
        for (incr = 0; incr < 4; incr++) {// converting user's guess to integers
            if (buffer[incr] == '\0')  break;
            if ((buffer[incr] < '0' || buffer[incr] > '8')) {
                if(buffer[incr] == '9') printf("Guess should not contain 9!\n");
                valid = 0;
                printf("Wrong input!\n");
                break;
            }
            guess[incr] = buffer[incr] - '0';
            }
            if (!valid) {
                valid_in = 0;
                continue;
            }
            if (hasDuplicate_guess(guess) == 1) {// checking for duplicates in user's guess 
                printf("Please enter none duplicate digits guess.\n");
                valid_in = 0;
                continue;
            }
            misplaced = get_misplaced(code, guess);
            wellplaced = get_wellplaced(code, guess);
            if (wellplaced == 4) {
               printf("Well placed pieces: %d\nMisplaced pieces: %d\n", wellplaced, misplaced);
               printf("Congratz! You did it!");
                return 0;
            }
            printf("Well placed pieces: %d\nMisplaced pieces: %d\n", wellplaced, misplaced);
            rounds++;
        free(buffer);
} while (rounds < defined_attempts);
    if(rounds == defined_attempts) {
        printf("Sorry, you lost all chances. Game over!\n");
    }
    return 0;
}