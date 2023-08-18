#include <stdarg.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>







int my_printf(const char* format, ...) {
    va_list arg_list;
    va_start(arg_list, format);
    int printed_chars = 0;
    while (*format != '\0') {
        if (*format == '%') {
            format++;
            if (*format == 'c') {
                char val = va_arg(arg_list, int);
                putchar(val);
                printed_chars++;
            } else if (*format == 's') {
                char* val = va_arg(arg_list, char*);
                while (*val != '\0') {
                    putchar(*val);
                    val++;
                    printed_chars++;
                }
            } else if (*format == 'd') {
                int val = va_arg(arg_list, int);
                int divisor = 1;
                if (val < 0) {
                    putchar('-');
                    val = -val;
                    printed_chars++;
                }
                while (val / divisor >= 10) {
                    divisor *= 10;
                }
                while (divisor > 0) {
                    int digit = val / divisor;
                    putchar(digit + '0');
                    val %= divisor;
                    divisor /= 10;
                    printed_chars++;
                }
            } else if (*format == 'u') {
                unsigned int val = va_arg(arg_list, unsigned int);
                unsigned int divisor = 1;
                while (val / divisor >= 10) {
                    divisor *= 10;
                }
                while (divisor > 0) {
                    unsigned int digit = val / divisor;
                    putchar(digit + '0');
                    val %= divisor;
                    divisor /= 10;
                    printed_chars++;
                }
            } else if (*format == 'x') {
                unsigned int val = va_arg(arg_list, unsigned int);
                unsigned int mask = 0x0f000000;
                while (mask > 0 && (val & mask) == 0) {
                    mask >>= 4;
                }
                while (mask > 0) {
                    int digit = (val & mask) >> (mask == 0 ? 0 : 4);
                    if (digit < 10) {
                        putchar(digit + '0');
                    } else {
                        putchar(digit - 10 + 'a');
                    }
                    mask >>= 4;
                    printed_chars++;
                }
            } else if (*format == 'X') {
                unsigned int val = va_arg(arg_list, unsigned int);
                unsigned int mask = 0x0f000000;
                while (mask > 0 && (val & mask) == 0) {
                    mask >>= 4;
                }
                while (mask > 0) {
                    int digit = (val & mask) >> (mask == 0 ? 0 : 4);
                    if (digit < 10) {
                        putchar(digit + '0');
                    } else {
                        putchar(digit - 10 + 'A');
                    }
                    mask >>= 4;
                    printed_chars++;
                }
            } else if (*format == 'p') {
                void* val = va_arg(arg_list, void*);
                unsigned long long int_val = (unsigned long long)val;
                unsigned long long mask = 0xf000000000000000;
                putchar('0');
                putchar('x');
                printed_chars += 2;
                while (mask > 0) {
                    int digit = (int_val & mask) >> (mask == 0 ? 0 : 4);
                    if (digit < 10) {
                        putchar(digit + '0');
                    } else {
                        putchar(digit - 10 + 'A');
                    }
                    mask >>= 4;
                    printed_chars++;
                }
            } else if (*format == 'o') {
                unsigned int val = va_arg(arg_list, unsigned int);
                unsigned int divisor = 1;
                while (val / divisor >= 8) {
                    divisor *= 8;
                }
                while (divisor > 0) {
                    unsigned int digit = val / divisor;
                    putchar(digit + '0');
                    val %= divisor;
                    divisor /= 8;
                    printed_chars++;
                }
            }
            format++;
        } else {
            putchar(*format);
            format++;
            printed_chars++;
        }
    }
    va_end(arg_list);
    return printed_chars;
}


int main(){
    char  x[] = "!$&--123";
    char v[] = "fff";
    char e[] = "fff";
    char f[] = "fff";
    char g[] = "fff";
    char r[] = "fff";
    char d = 'n';
   int c =  my_printf("%c",d);
   my_printf("%d",c);
}