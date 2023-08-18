#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>

int main(int argc, char **argv) {
    int defined_attempts; // number of attemps for user default is 10 if no attenp is entered
    char options;// the flags from the terminal -c and -t
    int guess[4];//array to contain the various guesses from the user
    int wellplaced;// number of well-placed numbers of the array
    int misplaced;//number of misplaced numbers of the array
    int rounds = 0;// Contains the number of rounds the player has done indication the round he is at
    int code[4];// The code that the users guess has to match
    char character[4]; // created this array to store each character from the code inputed at start as cmd arguemet whcich will taler be converted to intergers and stored in the code array
    int input;// Input is the return value from scanf which is the number of succesfuly scanned values. i used it to check if user entered an interger.


    //Checking if no cmd arguments are passed(EOF) means we initialize attempts to 10 and generate code
    if(argc == 1){
            defined_attempts = 5;
            srand(time(0));// indicating that we want the code to change with time(as the code is executetd) not 
            //generatting code from random number and stroringin an array each time
            for(long unsigned int i = 0; i < 4; i++){     
                code[i] =rand()%10;
                printf("code i %d\n", code[i]); 
            }  
    }
    else if(argc == 3 && ((strcmp(argv[1], "-c")  == 0))){
        defined_attempts = 5;
    }
    else if(argc == 3 && ((strcmp(argv[1], "-t")  == 0))){
            srand(time(0));// indicating that we want the code to change with time(as the code is executetd) not 
            //generatting code from random number and stroringin an array each time
            for(int i = 0; i < 4; i++){     
                code[i] =rand()%10;
                printf("code i %d\n", code[i]); 
            }    
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

    printf("Will you find the secret code?\n Please enter a valid guess\n");
    
    do{
        wellplaced = 0;
        misplaced = 0;

        printf("Round : %d\n", rounds);
        int incr = 0;
        
    do {
        // %1d reads a single digit
        input = scanf(" %1d", &guess[incr]);
        for(int i = 0; i < 4; i++){
            printf(" %d", guess[i]);
        }
            
        
        // checking if value from user is not an integer meaning scanf will return 0 since it expecting an int no value apart from int will be scanned 
        if (input == 0){
            printf("Wrong input!\n");
            // reset the loop counter to 0 and continue scanning from the first number
            incr = 0;
            // discard any invalid input until the user enters a valid integer
                scanf("%*[^\n]");
                scanf("%*c");
            continue;
        }

        incr++;
    } while (incr < 4);

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
            printf("Congratz! You did it!");
            break;
        }
        else{
            printf("wellplaced = %d\n Misedplaced = %d\n", wellplaced, misplaced);
        }

        rounds++;

        
    }while(rounds < defined_attempts);


    if(rounds == defined_attempts){
        printf("Sorry You lost All chances Game Over!");
    }
    
    return 0;
}

















