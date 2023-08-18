function my_levenshtein(str, start, length) {
    if (str.length === 0) {
        return 0;
    }
    if (start.length === 0) {
        return str.length;
    }
    if (length === 0) {
        return Math.max(str.length, start.length);
    }
    if (length > str.length) {
        length = str.length;
    }
    if (length > start.length) {
        length = start.length;
    }
    var matrix = [];
    for (var i = 0; i <= str.length; i++) {
        matrix[i] = [];
        for (var j = 0; j <= start.length; j++) {
            matrix[i][j] = i + j;
        }
    }
}