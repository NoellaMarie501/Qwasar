#include <stdarg.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

int my_printf(const char* format, ...);

 bool IsNullOrEmpty(const char* str) {
    return (str == NULL || str[0] == '\0');
}
 int print_characters(va_list arg_list){
    int printed_chars = 0;
    char val = va_arg(arg_list, int);
    putchar(val);
    printed_chars++;
    return printed_chars;
 }

 int print_strings(va_list arg_list){
    int printed_chars = 0;
    char* val = va_arg(arg_list, char*);

    if (IsNullOrEmpty(val)) {
        printed_chars += my_printf("(null)");
        return printed_chars;
    }
    while (*val != '\0') {
        putchar(*val);
        val++;
        printed_chars++;
    }
  return printed_chars;
 }

 int print_integer(va_list arg_list){
    int printed_chars = 0;
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
        //printf("d: %d", digit);
        putchar(digit + '0');
        val %= divisor;
        divisor /= 10;
        printed_chars++;
    }
    return printed_chars;
 }

 int print_unsigned_integer(va_list arg_list){
    int printed_chars = 0;
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
    return printed_chars;

 }

 int print_hexadecimal(va_list arg_list){
    int printed_chars = 0;
    unsigned int val = va_arg(arg_list, unsigned int);
    char hexaDeciNum[100];
    int i = 0;

    while (val != 0) {
        int temp = 0;
        temp = val % 16;

        if (temp < 10) {
            hexaDeciNum[i] = temp + 48;
            i++;
        } else {
            hexaDeciNum[i] = temp + 55;
            i++;
        }

        val = val / 16;
    }

    for (int j = i - 1; j >= 0; j--) {
        putchar(hexaDeciNum[j]);
        printed_chars++;
    }
    return printed_chars;
}



 int print_octal(va_list arg_list){
    int printed_chars = 0;
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
    return printed_chars;
 }

 int print_pointer(va_list arg_list) { 
    void* ptr = va_arg(arg_list, void*);
    int printed_chars = 0;
    unsigned long long int address = (unsigned long long int)ptr;
    char buffer[20]; // Sufficiently large buffer to store hexadecimal address
    int index = 0;

    if (address == 0) {
        putchar('0');
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
        putchar(buffer[i]);
        printed_chars++;
    } 
    return printed_chars;
}


int my_printf(const char* format, ...) {
    va_list arg_list;
    va_start(arg_list, format);
    int printed_chars = 0;
    while (*format != '\0') {
        if (*format == '%') {
            format++;
            if (*format == 'c') {
               printed_chars += print_characters(arg_list);
            } else if (*format == 's') {
               printed_chars += print_strings(arg_list);
            } else if (*format == 'd') {
                printed_chars += print_integer(arg_list);
            } else if (*format == 'u') {
               printed_chars += print_unsigned_integer(arg_list);
            }    
            else if (*format == 'X' || *format == 'x') {
               printed_chars += print_hexadecimal(arg_list);
            } else if (*format == 'p') {
                printed_chars += print_pointer(arg_list);
            } else if (*format == 'o') {
                printed_chars += print_octal(arg_list);
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

    char* str = NULL;
   // char d[];
    char j[] = "";
   //int c = my_printf("ssssss%s sss%s %s %s %s %s\n",d,d,d,d,d,d);
  int c = my_printf("mine %s\n",str);
  int n = printf("printf %s\n",str);
//   printf("printf %d\n mine = %d\n",n,c);
//    if(my_printf("mine %s\n",d) == printf("printf %s\n",d)) printf("true\n");
//    else printf("false\n");
  // putchar(9 + '0');
//    printf("printf %x\n",10);
}
