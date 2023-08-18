#include <stdio.h>
int my_abs(int x) {
    if (x < 0) {
        x *= -1;
        printf("%d ", x);
            return x;
    }
    else {
            return x;
    }
}
int main(){
    printf("%d ", my_abs(-560));
}