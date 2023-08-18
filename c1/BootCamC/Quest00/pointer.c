#include <stdio.h>
int my_swap(int* first, int* second){
    int c;
    c = *first;
    *first = *second;
    *second = c;
}

int main(){
    int one = 1;
    int two = 2;
     my_swap(&one, &two);    
     printf("one - %d ** two - %d\n", one, two);
}