#include <stdio.h>

void len(char* c){
     
     while (*c) putchar(*c++);

    }
    
// char* c = "source";
// while (*c) putchar(*c++);
int main() {
    char c[] = "source";
    len(c);
    
return 0;
}