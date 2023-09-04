
//Functions to rotate a peice
    //function ton calculate the transpose of the matrix
    function transposeMatrix(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const transposedMatrix = [];
        for (let j = 0; j < cols; j++) {
          transposedMatrix[j] = [];
          for (let i = 0; i < rows; i++) {
            transposedMatrix[j][i] = matrix[i][j];
          }
        }
        return transposedMatrix;
      }
     
    function reverseMatrix(matrix) {
        matrix = transposeMatrix(matrix)
        for(let i = 0; i < matrix.length; i++) {
            matrix[i] = matrix[i].reverse();
        }
        return matrix;
    } 
    
    var matrix = [
        [0,1,0],
        [0,1,0],
        [1,1,0]]

    console.log(reverseMatrix(matrix));