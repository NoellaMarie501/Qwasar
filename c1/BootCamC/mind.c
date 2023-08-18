#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>
#include <stdbool.h>


int main () {
  char buffer[4096];
  char noel[4096];
  ssize_t n = read(0, buffer, sizeof(buffer));

  if (n <= 0) {
      printf("No input!\n");
      return 0;
  }

  for(int i = 0; i <= strlen(buffer)-2; i++) {
      if(!(atoi(&buffer[i]))){
          noel[i] = '-';
          continue;
      }
      noel[i] = buffer[i]; 
  }
// for(int i = 0; i <= strlen(noel);i++){
//      printf("noeli : %c\n", noel[i]);
// }
 printf("noel : %s\n", noel);
 char *line = strtok(noel, "-");
 while (line != NULL) {
    // Do something with the line
    printf("line %s\n", line);

    line = strtok(NULL, "-");//4562\n4562
 }
   return(0);
}