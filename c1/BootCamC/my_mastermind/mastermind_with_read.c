#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>
#include <stdbool.h>

int main(int argc, char **argv) {
    int defined_attempts; // number of attemps for user default is 10 if no attenp is entered
    char options;// the flags from the terminal -c and -t
    int guess[4];//array to contain the various guesses from the user
    int wellplaced;// number of well-placed numbers of the array
    int misplaced;//number of misplaced numbers of the array
    int rounds = 0;// Contains the number of rounds the player has done indication the round he is at
    int code[4];// The code that the users guess has to match
    char character[4]; // created this array to store each character from the code inputed at start as cmd arguemet whcich will taler be converted to intergers and stored in the code array
   
    //Checking if no cmd arguments are passed(EOF) means we initialize attempts to 10 and generate code
    if(argc == 1){//if no arguments are passed
            defined_attempts = 10;
            srand(time(0));// indicating that we want the code to change with time(as the code is executetd) not 
            //generatting code from random number and stroringin an array each time
            for (int i = 0; i < 4; i++) {
                int new_num;
                int is_duplicate;
                do {
                    is_duplicate = 0;
                    new_num = rand() % 10;
                    for (int j = 0; j < i; j++) {
                        if (code[j] == new_num) {
                            is_duplicate = 1;
                            break;
                        }
                    }
                } while (is_duplicate);
                code[i] = new_num;
                printf("code[%d]: %d\n", i, code[i]);
            }
    }
    else if(argc == 3 && ((strcmp(argv[1], "-c")  == 0))){//if only one argument is passed that is -c
        defined_attempts = 10;
    }
    else if(argc == 3 && ((strcmp(argv[1], "-t")  == 0))){// if only one argument is passed that is -t
            srand(time(0));// indicating that we want the code to change with time(as the code is executetd) not 
            //generatting code from random number and stroring in an array each time
            for (int i = 0; i < 4; i++) {
                int new_num;
                int is_duplicate;
                do {
                    is_duplicate = 0;
                    new_num = rand() % 10;
                    for (int j = 0; j < i; j++) {
                        if (code[j] == new_num) {
                            is_duplicate = 1;
                            break;
                        }
                    }
                } while (is_duplicate);
                code[i] = new_num;
                printf("code[%d]: %d\n", i, code[i]);
            }  
    }

    //Getting the options from the cmd arguments if the arguements are passed
     while ((options = getopt(argc, argv, "c:t:")) != -1) {
        switch (options) {
            case 'c':
                // Process option -c
                for (long unsigned int i = 0; i < strlen(optarg); i++) {
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
                 printf("Invalid Input");
                break;
        }
    }

    printf("defined attemps = %d\n", defined_attempts);

    printf("Will you find the secret code?\nPlease enter a valid guess\n");
    
    do{
        // Read input from stdin into a buffer
        int incr; 
        char buffer[4096];
        char noel[4096];
        ssize_t n = read(0, buffer, sizeof(buffer));
        if (n <= 0) {
            printf("No input!\n");
            return 0;
        }
        for(int i = 0; i < n-1 ; i++) {
            if(!(atoi(&buffer[i]))){
                noel[i] = '-';
                continue;
            }
            noel[i] = buffer[i]; 
        }
        // Split the buffer into individual lines
        char *line = strtok(noel, "-");

        while (line != NULL) {
            printf("---\n");
            printf("Round : %d\n", rounds);
            wellplaced = 0;
            misplaced = 0;
            
            int valid = 1;
            for (incr = 0; incr < 4; incr++) {
                if (line[incr] == '\0') {
                    valid = 0;
                    break;
                }
                if (line[incr] < '0' || line[incr] > '9') {
                    valid = 0;
                    break;
                }
                guess[incr] = line[incr] - '0';
            }

            if (!valid) {
                printf("Wrong input! Please enter 4 digits.\n");
                line = strtok(NULL, " ");
                continue;
            }

       
        //comparing between the users guess and the code if same to return number of well placed and misplaced
        for (int i = 0; i < 4; i++) {
                for (int j = 0; j < 4; j++) { 
                        //printf("wellplaced\n i = %d\n j = %d\n code[i] = %d\n guess[j] = %d\n", i, j, code[i], guess[j]);
                        if((code[i] == guess[j]) && i == j){
                            wellplaced++;
                            //printf("wellplaced\n i = %d\n j = %d\n code[i] = %d\n guess[j] = %d\n", i, j, code[i], guess[j]);
                        } 
                        if((code[i] == guess[j]) && i != j){
                            misplaced++;
                            
                        }   
                } 
        }
        if(wellplaced == 4){
            printf("wellplaced = %d\nMisedplaced = %d\n", wellplaced, misplaced);
            printf("Congratz! You did it!");
            goto retrn;
        }
        else{
            printf("wellplaced = %d\nMisedplaced = %d\n", wellplaced, misplaced);
        }
        rounds++;
        line = strtok(NULL, "-");
        
        }
          

        
    }while(rounds < defined_attempts);

  if(rounds == defined_attempts) {
        printf("Sorry, you lost all chances. Game over!\n");
    }
    retrn:
    return 0;
}