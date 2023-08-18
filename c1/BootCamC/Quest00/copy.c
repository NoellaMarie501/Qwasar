#include <stdio.h>
#include <string.h>

//----------------------------------------------------------------strcpy----------------------------------------------------------------
char* my_strcpy(char* str1, char* str2){
    int i = 0;
    while(str2[i] != '\0'){
        str1[i] = str2[i];
        i++;
    }
    str1[i] = '\0';
    return str1;
}
//----------------------------------------------------------------strncpy----------------------------------------------------------------
char* my_strncpy(char* str1, char* str2, int len){
    int i = 0;

  if(len !=0 && len  <= (strlen(str2))){
    while(i < len){
            str1[i] = str2[i];
            i++;
        }
    }
    str1[i] = '\0';
    return str1;
}




int main(){

    char str1[] = "";
    char str2[] = "abc";
    int len = 2;
    printf("%s", my_strncpy(str1,str2,len));
}