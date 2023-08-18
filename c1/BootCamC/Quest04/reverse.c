#include <stdio.h>
#include <string.h>

void inverseChaine(char *chaine) {
    int longueur = strlen(chaine);
    int debut = 0;
    int fin = longueur - 1;

    while (debut < fin) {
        char temp = chaine[debut];
        chaine[debut] = chaine[fin];
        chaine[fin] = temp;

        debut++;
        fin--;
    }
}

int main() {
    char chaine[] = "Bonjour";
    printf("Chaine avant inversion : %s\n", chaine);

    inverseChaine(chaine);

    printf("Chaine apres inversion : %s\n", chaine);

    return 0;
}