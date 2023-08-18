#include <string.h>
#include <stdio.h>

//  char* reverse_string(char *string){

//         int length = strlen(string);
//         char reverse[100];
            
//         int i = (length -1);
//         while(i > -1){
//              for(int j = 0; j < length; j++){
//                     reverse[j] = string[i];
//                     i--;
//                 } 
                
//              } 
//       int len = strlen(reverse);
//      reverse[len] = '\0';
        
//       // printf("%s\n", reverse);
//        string = reverse;
//        printf("length: %d\n ", len);
//         return string;
//      }

char* reverseString(char* param_1) {
    int length = strlen(param_1);
    int i, j;
    char temp;

    for (i = 0, j = length - 1; i < j; i++, j--) {
        temp = param_1[i];
        param_1[i] = param_1[j];
        param_1[j] = temp;
    }

    return param_1;
}
 
 int main(){
    char string[] = "Nothing else really matter";
    printf("%s", reverseString(string));
    return 0;
  
 }