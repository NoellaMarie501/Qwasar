#include <unistd.h> // for read()
#include <stdio.h> // for write()
#include <string.h>
int main() {
    char buffer[1024];
    int n;

    // read from stdin (which is the pipe in this case)
    n = read(STDIN_FILENO, buffer, sizeof(buffer));

    // process each line
    char *line = strtok(buffer, "\n");
    while (line != NULL) {
        // print the line
        write(STDOUT_FILENO, line, strlen(line));
        write(STDOUT_FILENO, "\n", 1);

        // get the next line
        line = strtok(NULL, "\n");
    }

    return 0;
}
