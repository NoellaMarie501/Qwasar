#include <stdarg.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

void custom_printf(const char* format, ...) {
    va_list arg_list;
    va_start(arg_list, format);
    while (*format != '\0') {
        if (*format == '%') {
            format++;
            if (*format == 'c') {
                char val = va_arg(arg_list, int);
                putchar(val);
            } else if (*format == 's') {
                char* val = va_arg(arg_list, char*);
                while (*val != '\0') {
                    putchar(*val);
                    val++;
                }
            } else if (*format == 'd') {
                int val = va_arg(arg_list, int);
                int divisor = 1;
                if (val < 0) {
                    putchar('-');
                    val = -val;
                }
                while (val / divisor >= 10) {
                    divisor *= 10;
                }
                while (divisor > 0) {
                    int digit = val / divisor;
                    putchar(digit + '0');
                    val %= divisor;
                    divisor /= 10;
                }
            } else if (*format == 'f') {
                double val = va_arg(arg_list, double);
                int int_part = (int)val;
                int frac_part = (int)((val - int_part) * 1000);
                custom_printf("%d.%03d", int_part, frac_part);
            }
            format++;
        } else {
            putchar(*format);
            format++;
        }
    }
    va_end(arg_list);
}

int main() {
    int x = 100;
    double d = 23.56;
    char c = 'C';
    char* str = "Custom printf() function!";
    custom_printf("Example of C custom printf() function:\n");
    custom_printf("\nCharacter: %c\n", c);
    custom_printf("String: %s\n", str);
    custom_printf("Integer: %d\n", x);
    custom_printf("Double: %f\n", d);
    return 0;
}

