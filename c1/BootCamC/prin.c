#include <stdio.h>
#include <stdarg.h>

void my_putchar(char ch) {
    // Implement your own character output function here
    // For simplicity, I'll use putchar provided by the standard library
    putchar(ch);
}

int print_hex_address(void *ptr) { 
    
    int printed_chars = 0;
    unsigned long long int address = (unsigned long long int)ptr;
    char buffer[20]; // Sufficiently large buffer to store hexadecimal address
    int index = 0;

    if (address == 0) {
        my_putchar('0');
        return 0;
    }

    while (address > 0) {
        int rem = address % 16;
        buffer[index++] = (rem < 10) ? (rem + '0') : (rem - 10 + 'a');
        address /= 16;
    }

    // Print the hexadecimal address in reverse order
    putchar('0');
    printed_chars++;
    putchar('x');
    printed_chars++;
    for (int i = index - 1; i >= 0; i--) {
        my_putchar(buffer[i]);
        printed_chars++;
    }
    return printed_chars;
}

void my_printf(const char *format, ...) {
    va_list args;
    va_start(args, format);

    while (*format) {
        if (*format == '%') {
            format++; // Move to the next character after '%'

            // Handle format specifiers
            switch (*format) {
                case 'd': {
                    int num = va_arg(args, int);

                    // Convert the integer to a string for printing
                    // Implementing this conversion is another topic in itself
                    // For simplicity, I'll use sprintf provided by the standard library
                    char buffer[20]; // Sufficiently large buffer
                    sprintf(buffer, "%d", num);

                    // Print the converted string character by character
                    for (int i = 0; buffer[i] != '\0'; i++) {
                        my_putchar(buffer[i]);
                    }

                    break;
                }
                case 's': {
                    char *str = va_arg(args, char *);

                    // Print the string character by character
                    for (int i = 0; str[i] != '\0'; i++) {
                        my_putchar(str[i]);
                    }

                    break;
                }
                case 'c': {
                    char ch = (char) va_arg(args, int); // Characters are promoted to int in variadic functions
                    my_putchar(ch);
                    break;
                }
                case 'p': {
                    void *ptr = va_arg(args, void *);
                    print_hex_address(ptr);
                    break;
                }
                // Add more format specifiers as needed...
                default:
                    my_putchar(*format);
            }
        } else {
            my_putchar(*format);
        }

        format++; // Move to the next character in the format string
    }

    va_end(args);
}

int main() {
    int num = 42;
    char ch = 'A';
    char str[] = "Hello";
    int *ptr = &num;

   // my_printf("Number: %d, Character: %c, String: %s, Pointer: %p\n", num, ch, str, ptr);
   int mine = my_printf("mine: %p\n", ptr);
    int print = printf("printf %p\n", ptr);
    printf("mine = %d print %d", mine,print);
    
    return 0;
}