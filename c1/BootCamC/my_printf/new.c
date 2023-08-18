char hexaDeciNum[100];
    int i = 0;

    while (decNum != 0) {
        int temp = 0;
        temp = decNum % 16;

        if (temp < 10) {
            hexaDeciNum[i] = temp + 48;
            i++;
        } else {
            hexaDeciNum[i] = temp + 55;
            i++;
        }

        decNum = decNum / 16;
    }

    printf("Hexadecimal: ");
    for (int j = i - 1; j >= 0; j--) {
        printf("%c", hexaDeciNum[j]);
    }
    printf("\n");