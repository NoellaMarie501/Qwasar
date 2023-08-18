#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
//----------------------------------------------------------------To Upper--------------------
char* my_upcase(char c[]){
    
    for(int i=0; i < strlen(c); i++){
        if(c[i] >= 'a' && c[i] <= 'z'){
            c[i] = c[i] - 32;
        }
     
    }
    return c;

}

//----------------------------------------------------------------To Lower--------------------


char* my_lowcase(char c[]){

   for(int i=0; i < strlen(c); i++){
        if(c[i] >= 'A' && c[i] <= 'Z'){
            c[i] = c[i] + 32;
        }
     
    }
    return c;
}

int main() {
  char str[] = "Hello, World!";
  printf("%s\n", my_upcase(str));
  printf("%s\n", my_lowcase(str));

  return 0;
}