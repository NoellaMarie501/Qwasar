#include <stdio.h>
#include <string.h>
int my_strcmp(char string1[], char string2[]){

    if(strlen(string1) > strlen(string2)){
        return -1;
    }
    else if(strlen(string1) < strlen(string2)){
        return 1;
    }
    else{
        int counter = 0;
        for(int i=0; i < strlen(string1); i++){
            
               if(string1[i] != string2[i]){
                    counter++;
                    //printf("counter: %d", counter);
                    //printf("string 1 : %c\n string 2 : %c\n" , string1[i], string2[i]);
                }
                
            
        }
        if(counter == 0){
            return counter;
        }
        else{
            return -1;
        }
       

    }
    
}



int main(){

    char string1[] = "heolo world";
    char string2[] = "hello world";
    printf("%d\n",my_strcmp(string1,string2));
    return 0;

}