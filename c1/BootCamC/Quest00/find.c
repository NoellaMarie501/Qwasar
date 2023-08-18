// #include <stdio.h>
// #include <string.h>

// int 

// int main()
// {
//    char *result;
//    const char jfstring[] = "A Blue Danube";
//    const char chars = 'c';
 
//    result = strchr(jfstring, chars);
//    printf("%s", result);
//    return 0;
// }


    #include <stdio.h>  
    #include <string.h>  

   int my_string_index(const char string[], const char character){
         if(strchr(string, character) == NULL) {
                        printf("%d", -1);
                        return -1;
                     }
          else{
               for(int i = 0; i < strlen(string); i++){  
                  if(string[i] == character){
                           
                      printf("Found at index %d\n", i);
                      break;
                      return i;
                  }
                }
             }
   }

    int main ()  
    {  
           const char string[] = "Use strchr() function in C.";  
           const char character = 's'; // it is searched in str[] array  
           my_string_index(string,character);
 
    }  