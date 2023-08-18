#include <string.h>
#include <stdio.h>
#include <stdlib.h>


char* my_spaceship(char* direction){
    char *current_direction = "up";
    int x = 0;
    int y = 0;

    for(int i = 0; i < strlen(direction); i++){
        switch(direction[i]){
            case 'L':
                if(current_direction == "up"){
                    current_direction = "left";
                }
                else if(current_direction == "left"){
                    current_direction = "down";
                }
                else if(current_direction == "down"){
                    current_direction = "right";
                }
                else if(current_direction == "right"){
                    current_direction = "up";
                }
            break;

            case 'R':
                if(current_direction == "up"){
                    current_direction = "right";
                }
                else if(current_direction == "right"){
                    current_direction = "down";
                }
                else if(current_direction == "down"){
                    current_direction = "left";
                }
                else if(current_direction == "left"){
                    current_direction = "up";
                }
            break;
            case 'A':
                if(current_direction == "up"){
                    y--;
                }
                else if(current_direction == "down"){
                    y++;
                }
                else if(current_direction == "left"){
                    x--;
                }
                else if(current_direction == "right"){
                    x++;
                }
            break;

        }
    }
  static  char result[50];
  snprintf(result, sizeof(result), "{x: %d, y: %d, direction: '%s'}", x, y, current_direction);
  return result;
}

int main(){
    char direction[] = "RAARA";
    printf("%s\n",my_spaceship(direction));
    return 0;
}