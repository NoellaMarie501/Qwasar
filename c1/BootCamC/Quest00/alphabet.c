#include<unistd.h>
void my_print_alphabet()
{
  
    for(char c = 'a'; c <= 'z'; c++){
     write(STDOUT_FILENO, &c, 1);
    }
     write(STDOUT_FILENO, "\n", 1);
}

int main() {
  print_alphabet();
  return 0;
}
