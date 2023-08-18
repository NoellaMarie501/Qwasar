#include <string.h>
#include <stdio.h>

char* my_strchr(char* str1, char* character){
    
        if(strlen(character) == 0){
            return str1;
        }
        int length = strlen(str1);
        char value[length];
        int index; 
        for(int i = 0; i < strlen(str1); i++){
            for(int j = 0; j < strlen(character); j++){
                if((str1[i] == character[j]) && character[j] != '\0'){
                        value[j] = str1[i]; 
                         i++;
                } 
               
            }

            index = i;
            break;
        } 
       printf("value1 : %s\n", value); 
        while(str1[index] != '\0'){
            value[strlen(value)] = str1[index];
            printf("str[index] : %c\n", str1[index]); 
                index++;
        }
   
    printf("value : %s\n", value); 
    //return 0;
}
int main(){
     char str[] = "helljo";
    char character[] = "el";
    
     
    printf("%s\n", my_strchr(str, character));
}